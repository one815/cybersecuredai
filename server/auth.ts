import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response, NextFunction } from 'express';
import type { User } from '@shared/schema';
import { storage } from './storage';

// Environment variables for security
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret-change-in-production';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-256-bit-encryption-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

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
 * High-level AES-256 encryption for sensitive data
 */
export class EncryptionService {
  private static key = ENCRYPTION_KEY;

  static encrypt(text: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(text, this.key).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  static decrypt(encryptedText: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, this.key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  // Secure hash generation for TOTP secrets
  static generateSecureHash(data: string): string {
    return CryptoJS.SHA256(data + this.key).toString();
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