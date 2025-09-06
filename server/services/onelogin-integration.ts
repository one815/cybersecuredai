import axios, { AxiosResponse } from 'axios';
import type { User } from '@shared/schema';
import { AuthService } from '../auth';
import { storage } from '../storage';

export interface OneLoginTokenResponse {
  access_token: string;
  created_at: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
  account_id: string;
}

export interface OneLoginUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  title?: string;
  department?: string;
  company?: string;
  phone?: string;
  status: number; // 0=Unactivated, 1=Active, 2=Suspended, 3=Locked, 4=Password expired, 5=Awaiting password reset, 7=Password pending, 8=Awaiting activation
  role_ids: number[];
  group_ids?: number[];
  custom_attributes?: Record<string, any>;
  created_at: string;
  updated_at: string;
  last_login?: string;
  activated_at?: string;
  locked_until?: string;
}

export interface OneLoginRole {
  id: number;
  name: string;
  apps: number[];
}

export interface OneLoginEvent {
  id: number;
  created_at: string;
  account_id: number;
  user_id?: number;
  user_name?: string;
  event_type_id: number;
  notes?: string;
  ipaddr?: string;
  actor_user_id?: number;
  actor_user_name?: string;
  assuming_acting_user_id?: number;
  role_id?: number;
  role_name?: string;
  app_id?: number;
  group_id?: number;
  group_name?: string;
  otp_device_id?: number;
  otp_device_name?: string;
  policy_id?: number;
  policy_name?: string;
  actor_system?: string;
  custom_message?: string;
  operation_name?: string;
  directory_sync_run_id?: number;
  directory_id?: number;
  resolution?: string;
  client_id?: number;
  resource_type_id?: number;
  error_description?: string;
}

export interface OneLoginSession {
  id: number;
  login_name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  ipaddr: string;
}

/**
 * OneLogin Enterprise Identity Management Integration Service
 * Provides comprehensive IAM capabilities including SSO, user provisioning,
 * adaptive authentication, and security policy enforcement.
 */
export class OneLoginIntegrationService {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;
  private accessToken?: string;
  private tokenExpiresAt?: number;

  constructor() {
    const subdomain = process.env.ONELOGIN_SUBDOMAIN;
    if (!subdomain) {
      throw new Error('ONELOGIN_SUBDOMAIN environment variable is required');
    }
    
    this.baseUrl = subdomain.includes('.onelogin.com') 
      ? `https://${subdomain}/api/1` 
      : `https://${subdomain}.onelogin.com/api/1`;
    
    this.clientId = process.env.ONELOGIN_CLIENT_ID || '';
    this.clientSecret = process.env.ONELOGIN_CLIENT_SECRET || '';

    if (!this.clientId || !this.clientSecret) {
      throw new Error('OneLogin Client ID and Client Secret are required');
    }
  }

  /**
   * Authenticate with OneLogin API and obtain access token
   */
  private async authenticate(): Promise<string> {
    if (this.accessToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    try {
      const response: AxiosResponse<OneLoginTokenResponse> = await axios.post(
        `${this.baseUrl}/auth/oauth/token`,
        {
          grant_type: 'client_credentials'
        },
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const { access_token, expires_in } = response.data;
      this.accessToken = access_token;
      this.tokenExpiresAt = Date.now() + (expires_in * 1000) - 30000; // 30 seconds buffer

      console.log('✅ OneLogin authentication successful');
      return access_token;
    } catch (error: any) {
      console.error('❌ OneLogin authentication failed:', error.response?.data || error.message);
      throw new Error(`OneLogin authentication failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Make authenticated API request to OneLogin
   */
  private async makeRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: any): Promise<T> {
    const token = await this.authenticate();
    
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data
      });

      return response.data;
    } catch (error: any) {
      console.error(`❌ OneLogin API request failed [${method} ${endpoint}]:`, error.response?.data || error.message);
      throw new Error(`OneLogin API request failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get all users with pagination support
   */
  async getUsers(page: number = 1, limit: number = 50): Promise<{ data: OneLoginUser[]; pagination: any }> {
    return this.makeRequest('GET', `/users?page=${page}&limit=${limit}`);
  }

  /**
   * Get user by ID
   */
  async getUser(userId: number): Promise<OneLoginUser> {
    const response = await this.makeRequest<{ data: OneLoginUser[] }>('GET', `/users/${userId}`);
    return response.data[0];
  }

  /**
   * Search users by email
   */
  async getUserByEmail(email: string): Promise<OneLoginUser | null> {
    try {
      const response = await this.makeRequest<{ data: OneLoginUser[] }>('GET', `/users?email=${encodeURIComponent(email)}`);
      return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Create a new user in OneLogin
   */
  async createUser(userData: Partial<OneLoginUser>): Promise<OneLoginUser> {
    const response = await this.makeRequest<{ data: OneLoginUser[] }>('POST', '/users', userData);
    return response.data[0];
  }

  /**
   * Update user information
   */
  async updateUser(userId: number, userData: Partial<OneLoginUser>): Promise<OneLoginUser> {
    const response = await this.makeRequest<{ data: OneLoginUser[] }>('PUT', `/users/${userId}`, userData);
    return response.data[0];
  }

  /**
   * Deactivate user (suspend)
   */
  async deactivateUser(userId: number): Promise<boolean> {
    try {
      await this.updateUser(userId, { status: 2 }); // 2 = Suspended
      return true;
    } catch (error) {
      console.error('Failed to deactivate user:', error);
      return false;
    }
  }

  /**
   * Get user roles
   */
  async getUserRoles(userId: number): Promise<OneLoginRole[]> {
    const response = await this.makeRequest<{ data: OneLoginRole[] }>('GET', `/users/${userId}/roles`);
    return response.data;
  }

  /**
   * Get all available roles
   */
  async getRoles(): Promise<OneLoginRole[]> {
    const response = await this.makeRequest<{ data: OneLoginRole[] }>('GET', '/roles');
    return response.data;
  }

  /**
   * Assign role to user
   */
  async assignRoleToUser(userId: number, roleIds: number[]): Promise<boolean> {
    try {
      await this.makeRequest('PUT', `/users/${userId}/add_roles`, { role_id_array: roleIds });
      return true;
    } catch (error) {
      console.error('Failed to assign roles to user:', error);
      return false;
    }
  }

  /**
   * Remove role from user
   */
  async removeRoleFromUser(userId: number, roleIds: number[]): Promise<boolean> {
    try {
      await this.makeRequest('PUT', `/users/${userId}/remove_roles`, { role_id_array: roleIds });
      return true;
    } catch (error) {
      console.error('Failed to remove roles from user:', error);
      return false;
    }
  }

  /**
   * Get security events for audit and compliance
   */
  async getSecurityEvents(
    since?: Date,
    until?: Date,
    eventTypeId?: number,
    userId?: number,
    limit: number = 100
  ): Promise<OneLoginEvent[]> {
    const params = new URLSearchParams();
    if (since) params.append('since', since.toISOString());
    if (until) params.append('until', until.toISOString());
    if (eventTypeId) params.append('event_type_id', eventTypeId.toString());
    if (userId) params.append('user_id', userId.toString());
    params.append('limit', limit.toString());

    const response = await this.makeRequest<{ data: OneLoginEvent[] }>('GET', `/events?${params.toString()}`);
    return response.data;
  }

  /**
   * Get active user sessions for security monitoring
   */
  async getUserSessions(userId: number): Promise<OneLoginSession[]> {
    const response = await this.makeRequest<{ data: OneLoginSession[] }>('GET', `/users/${userId}/sessions`);
    return response.data;
  }

  /**
   * Generate SAML assertion for SSO
   */
  async generateSAMLAssertion(userId: number, appId: number): Promise<{ data: string }> {
    return this.makeRequest('POST', '/saml_assertion', {
      username_or_email: userId,
      password: 'sso',
      app_id: appId,
      subdomain: process.env.ONELOGIN_SUBDOMAIN
    });
  }

  /**
   * Convert OneLogin user to CyberSecured AI platform user format
   */
  convertOneLoginUserToPlatformUser(oneLoginUser: OneLoginUser): Partial<User> {
    // Map OneLogin roles to platform roles
    const roleMapping: Record<string, string> = {
      'Administrator': 'admin',
      'Security Officer': 'compliance_officer', 
      'Faculty': 'faculty',
      'Student': 'student',
      'User': 'user'
    };

    // Determine role based on OneLogin role IDs or default to 'user'
    let platformRole = 'user';
    if (oneLoginUser.role_ids && oneLoginUser.role_ids.length > 0) {
      // In a real implementation, you'd map role IDs to role names
      // For now, we'll use a simple mapping
      platformRole = 'user'; // Default, would be determined by actual role lookup
    }

    return {
      email: oneLoginUser.email,
      firstName: oneLoginUser.firstname,
      lastName: oneLoginUser.lastname,
      role: platformRole,
      organization: oneLoginUser.company,
      isActive: oneLoginUser.status === 1, // 1 = Active in OneLogin
      lastLogin: oneLoginUser.last_login ? new Date(oneLoginUser.last_login) : undefined,
      // OneLogin IAM integration
      iamProvider: 'onelogin',
      iamProviderId: oneLoginUser.id.toString(),
      createdAt: new Date(oneLoginUser.created_at),
      updatedAt: new Date(oneLoginUser.updated_at)
    };
  }

  /**
   * Sync user from OneLogin to platform database
   */
  async syncUserToPlatform(oneLoginUser: OneLoginUser): Promise<User | null> {
    try {
      const platformUserData = this.convertOneLoginUserToPlatformUser(oneLoginUser);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(oneLoginUser.email);
      
      if (existingUser) {
        // Update existing user
        const updatedUser = await storage.updateUser(existingUser.id, platformUserData);
        console.log(`✅ Updated user from OneLogin: ${oneLoginUser.email}`);
        return updatedUser;
      } else {
        // Create new user
        const newUser = await storage.createUser({
          ...platformUserData,
          id: crypto.randomUUID(),
          passwordHash: null // SSO users don't need password hashes
        } as any);
        console.log(`✅ Created new user from OneLogin: ${oneLoginUser.email}`);
        return newUser;
      }
    } catch (error) {
      console.error('Failed to sync OneLogin user to platform:', error);
      return null;
    }
  }

  /**
   * Authenticate user via OneLogin SSO
   */
  async authenticateSSO(email: string): Promise<{ user: User; token: string; refreshToken: string } | null> {
    try {
      // Get user from OneLogin
      const oneLoginUser = await this.getUserByEmail(email);
      if (!oneLoginUser || oneLoginUser.status !== 1) {
        console.log(`❌ OneLogin user not found or not active: ${email}`);
        return null;
      }

      // Sync user to platform
      const platformUser = await this.syncUserToPlatform(oneLoginUser);
      if (!platformUser) {
        console.log(`❌ Failed to sync OneLogin user to platform: ${email}`);
        return null;
      }

      // Generate platform tokens
      const token = AuthService.generateToken(platformUser);
      const refreshToken = AuthService.generateRefreshToken(platformUser.id);

      console.log(`✅ OneLogin SSO authentication successful: ${email}`);
      return { user: platformUser, token, refreshToken };
    } catch (error) {
      console.error('OneLogin SSO authentication error:', error);
      return null;
    }
  }

  /**
   * Test OneLogin API connectivity and permissions
   */
  async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      await this.authenticate();
      
      // Test basic API access
      const users = await this.getUsers(1, 1);
      const roles = await this.getRoles();
      
      return {
        success: true,
        message: 'OneLogin connection successful',
        details: {
          userCount: users.data.length,
          roleCount: roles.length,
          baseUrl: this.baseUrl
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `OneLogin connection failed: ${error.message}`,
        details: { error: error.message }
      };
    }
  }
}

// Create singleton instance
export const oneLoginIntegrationService = new OneLoginIntegrationService();

export default {
  oneLoginIntegrationService,
  OneLoginIntegrationService
};