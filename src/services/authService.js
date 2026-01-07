import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';
import { tokenManager } from '../utils/httpClient';
import { USE_MOCK_API, mockApi } from '../mocks/mockApi';

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Register a new user
   */
  async register(userData) {
    try {
      // Use mock API if enabled
      if (USE_MOCK_API) {
        const response = await mockApi.auth.register(userData);
        
        if (response.success && response.data) {
          const { user, accessToken, refreshToken } = response.data;
          
          // Store tokens
          tokenManager.setAccessToken(accessToken);
          tokenManager.setRefreshToken(refreshToken);
          
          // Store user data
          localStorage.setItem('user', JSON.stringify(user));
          
          // Set token expiry (2 hours from now)
          const expiryTime = Date.now() + (2 * 60 * 60 * 1000);
          localStorage.setItem('tokenExpiry', expiryTime.toString());
          localStorage.setItem('authToken', accessToken);
          
          return { success: true, user, accessToken };
        }
        
        return response;
      }
      
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData, false);
      
      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        
        // Store tokens
        tokenManager.setAccessToken(accessToken);
        tokenManager.setRefreshToken(refreshToken);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set token expiry (2 hours from now)
        const expiryTime = Date.now() + (2 * 60 * 60 * 1000);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        localStorage.setItem('authToken', accessToken);
        
        return { success: true, user, accessToken };
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Login user
   */
  async login(credentials) {
    try {
      // Use mock API if enabled
      if (USE_MOCK_API) {
        const response = await mockApi.auth.login(credentials);
        
        if (response.success && response.data) {
          const { user, accessToken, refreshToken } = response.data;
          
          // Store tokens
          tokenManager.setAccessToken(accessToken);
          tokenManager.setRefreshToken(refreshToken);
          
          // Store user data
          localStorage.setItem('user', JSON.stringify(user));
          
          // Set token expiry (2 hours from now)
          const expiryTime = Date.now() + (2 * 60 * 60 * 1000);
          localStorage.setItem('tokenExpiry', expiryTime.toString());
          localStorage.setItem('authToken', accessToken);
          
          return { success: true, user, accessToken };
        }
        
        return response;
      }
      
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials, false);
      
      if (response.data) {
        const { user, accessToken, refreshToken } = response.data;
        
        // Store tokens
        tokenManager.setAccessToken(accessToken);
        tokenManager.setRefreshToken(refreshToken);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set token expiry (2 hours from now)
        const expiryTime = Date.now() + (2 * 60 * 60 * 1000);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        localStorage.setItem('authToken', accessToken);
        
        return { success: true, user, accessToken };
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      // Clear all tokens and user data
      tokenManager.clearTokens();
      
      // Dispatch logout event
      window.dispatchEvent(new CustomEvent('auth:logout'));
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      // Use mock API if enabled
      if (USE_MOCK_API) {
        const response = await mockApi.auth.getCurrentUser();
        
        if (response.success && response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          return response.data;
        }
        
        return null;
      }
      
      const response = await api.get(API_ENDPOINTS.AUTH.ME);
      
      if (response.success && response.data) {
        // Update stored user data
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken() {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken }, false);
      
      if (response.success && response.data) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        tokenManager.setAccessToken(accessToken);
        if (newRefreshToken) {
          tokenManager.setRefreshToken(newRefreshToken);
        }
        
        // Update expiry
        const expiryTime = Date.now() + (2 * 60 * 60 * 1000);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        localStorage.setItem('authToken', accessToken);
        
        return { success: true, accessToken };
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      throw error;
    }
  },

  /**
   * Forgot password - Step 1: Request OTP
   */
  async forgotPassword(email) {
    try {
      // Use mock API if enabled
      if (USE_MOCK_API) {
        return await mockApi.auth.forgotPassword(email);
      }
      
      const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }, false);
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  /**
   * Verify OTP - Step 2: Verify OTP code
   */
  async verifyOTP(email, otp) {
    try {
      // Use mock API if enabled
      if (USE_MOCK_API) {
        return await mockApi.auth.verifyOTP({ email, otp });
      }
      
      const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp }, false);
      return response;
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  },

  /**
   * Reset password - Step 3: Set new password
   */
  async resetPassword(email, otp, newPassword) {
    try {
      // Use mock API if enabled
      if (USE_MOCK_API) {
        return await mockApi.auth.resetPassword({ email, otp, newPassword });
      }
      
      const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { 
        email, 
        otp, 
        newPassword 
      }, false);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  /**
   * Change password
   */
  async changePassword(passwords) {
    try {
      const response = await api.put(API_ENDPOINTS.AUTH.PASSWORD, passwords);
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  /**
   * Verify email
   */
  async verifyEmail(data) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data);
      return response;
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  },

  /**
   * Delete account
   */
  async deleteAccount() {
    try {
      const response = await api.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT);
      
      if (response.success) {
        this.logout();
      }
      
      return response;
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  },

  /**
   * Google OAuth login URL
   */
  getGoogleLoginURL() {
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${API_ENDPOINTS.AUTH.GOOGLE}`;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const token = tokenManager.getAccessToken();
    const isExpired = tokenManager.isTokenExpired();
    return token && !isExpired;
  },

  /**
   * Get stored user
   */
  getStoredUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Get stored user error:', error);
      return null;
    }
  },
};
