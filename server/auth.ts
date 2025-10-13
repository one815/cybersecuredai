import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import * as crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import type { User } from '@shared/schema';
import { storage } from './storage';

// CRITICAL FIX: Remove permissive defaults for production security
const JWT_SECRET = process.env.JWT_SECRET;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Boot-time security validation
if (process.env.NODE_ENV === 'production') {
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error('SECURITY VIOLATION: JWT_SECRET must be at least 32 characters in production');
  }
  if (!process.env.FIPS_ENCRYPTION_KEY || process.env.FIPS_ENCRYPTION_KEY.length < 64) {
    throw new Error('SECURITY VIOLATION: FIPS_ENCRYPTION_KEY must be at least 64 hex characters in production');
  }
  console.log('✅ Production security validation passed');
}

// Enhanced JWT payload interface
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Authentication middleware
export interface AuthenticatedRequest extends Request {
  user?: User;
  token?: string;
}

/**
 * FIPS 140-2 Compliant Encryption Service for HIPAA compliance
 * Replaces CryptoJS with Node.js native crypto for FIPS validation
 */
export class EncryptionService {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32; // 256 bits
  private static readonly IV_LENGTH = 16;
  private static readonly TAG_LENGTH = 16;
  
  private static getKey(): Buffer {
    const key = process.env.FIPS_ENCRYPTION_KEY;
    if (!key) {
      throw new Error('FIPS_ENCRYPTION_KEY environment variable is required for HIPAA compliance');
    }
    // CRITICAL FIX: Expect key as hex (consistent with db-storage.ts)
    return Buffer.from(key, 'hex');
  }

  static encrypt(text: string, context: string = 'general'): string {
    try {
      const baseKey = this.getKey();
      const salt = crypto.randomBytes(32); // CRITICAL FIX: Use random salt per encryption
      const iv = crypto.randomBytes(this.IV_LENGTH);
      
      // CRITICAL FIX: Derive key using PBKDF2 with random salt
      const derivedKey = crypto.pbkdf2Sync(baseKey, salt, 100000, this.KEY_LENGTH, 'sha256');
      
      const cipher = crypto.createCipheriv(this.ALGORITHM, derivedKey, iv);
      cipher.setAAD(Buffer.from(`HIPAA-${context}`));
      
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const tag = cipher.getAuthTag();
      
      // CRITICAL FIX: Include salt in output for decryption
      return salt.toString('hex') + ':' + iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted;
    } catch (error) {
      console.error('❌ FIPS encryption error:', error);
      throw new Error('Failed to encrypt data with FIPS compliance');
    }
  }

  static decrypt(encryptedText: string, context: string = 'general'): string {
    try {
      const baseKey = this.getKey();
      const parts = encryptedText.split(':');
      
      if (parts.length !== 4) {
        throw new Error('Invalid encrypted data format - expected salt:iv:tag:encrypted');
      }
      
      const salt = Buffer.from(parts[0], 'hex');
      const iv = Buffer.from(parts[1], 'hex');
      const tag = Buffer.from(parts[2], 'hex');
      const encrypted = parts[3];
      
      // CRITICAL FIX: Derive key using same salt and parameters
      const derivedKey = crypto.pbkdf2Sync(baseKey, salt, 100000, this.KEY_LENGTH, 'sha256');
      
      const decipher = crypto.createDecipheriv(this.ALGORITHM, derivedKey, iv);
      decipher.setAAD(Buffer.from(`HIPAA-${context}`));
      decipher.setAuthTag(tag);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      console.error('❌ FIPS decryption error:', error);
      throw new Error('Failed to decrypt data with FIPS compliance');
    }
  }

  // FIPS 140-2 compliant secure hash generation
  static generateSecureHash(data: string, context: string = 'general'): string {
    const key = this.getKey();
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(`${context}:${data}`);
    return hmac.digest('hex');
  }

  // Cross-service compatibility test
  static testEncryptionInteroperability(): boolean {
    try {
      const testData = 'HIPAA-test-data-' + Date.now();
      const encrypted = this.encrypt(testData, 'interop-test');
      const decrypted = this.decrypt(encrypted, 'interop-test');
      return testData === decrypted;
    } catch (error) {
      console.error('❌ Encryption interoperability test failed:', error);
      return false;
    }
  }

  // Generate FIPS-compliant random bytes for cryptographic operations
  static generateSecureRandom(length: number): Buffer {
    return crypto.randomBytes(length);
  }

  // FIPS 140-2 compliant key derivation function using PBKDF2
  static deriveKey(password: string, salt: string | Buffer, keyLength: number = 32, iterations: number = 100000): Buffer {
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
  }
}

/**
 * Authentication service with comprehensive security features
 */
export class AuthService {
  /**
   * Hash password using bcrypt with salt rounds
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12; // High security salt rounds
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Verify password against hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT token with enhanced payload
   */
  static generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role || 'user'
    };

    return jwt.sign(payload, JWT_SECRET, { 
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'cybersecure-ai',
      audience: 'cybersecure-platform'
    } as jwt.SignOptions);
  }

  /**
   * Verify and decode JWT token
   */
  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, JWT_SECRET, {
        issuer: 'cybersecure-ai',
        audience: 'cybersecure-platform'
      }) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Generate secure refresh token
   */
  static generateRefreshToken(userId: string): string {
    return jwt.sign({ userId, type: 'refresh' }, JWT_SECRET, { 
      expiresIn: '7d' // Refresh tokens last 7 days
    });
  }

  /**
   * Authenticate user with email and password
   */
  static async authenticateUser(email: string, password: string): Promise<{ user: User; token: string; refreshToken: string } | null> {
    try {
      // Get user by email
      const user = await storage.getUserByEmail(email);
      if (!user || !user.isActive) {
        return null;
      }

      // Verify password hash if exists
      if (user.passwordHash) {
        const isValidPassword = await this.verifyPassword(password, user.passwordHash);
        if (!isValidPassword) {
          return null;
        }
      } else {
        // For demo purposes - accept any password if no hash exists
        // In production, all users should have password hashes
        console.log('Warning: User has no password hash, accepting any password for demo');
      }

      // Update last login
      await storage.updateUser(user.id, { lastLogin: new Date() });

      // Generate tokens
      const token = this.generateToken(user);
      const refreshToken = this.generateRefreshToken(user.id);

      return { user, token, refreshToken };
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
      if (decoded.type !== 'refresh') {
        return null;
      }

      const user = await storage.getUser(decoded.userId);
      if (!user || !user.isActive) {
        return null;
      }

      return this.generateToken(user);
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }
}

/**
 * JWT Authentication middleware
 */
export const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = AuthService.verifyToken(token);
    const user = await storage.getUser(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User not found or inactive' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('JWT Authentication error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Role-based authorization middleware
 */
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role || 'user')) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

/**
 * Rate limiting for sensitive operations
 */
export const sensitiveOperationLimiter = (maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const identifier = (req.ip || 'unknown') + (req.headers['user-agent'] || 'unknown');
    const now = Date.now();

    const userAttempts = attempts.get(identifier);
    if (!userAttempts || now > userAttempts.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (userAttempts.count >= maxAttempts) {
      return res.status(429).json({ 
        message: 'Too many attempts. Please try again later.',
        retryAfter: Math.ceil((userAttempts.resetTime - now) / 1000)
      });
    }

    userAttempts.count++;
    next();
  };
};

export default {
  AuthService,
  EncryptionService,
  authenticateJWT,
  authorizeRoles,
  sensitiveOperationLimiter
};