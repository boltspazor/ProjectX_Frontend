import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Admin Service
 */
export const adminService = {
  /**
   * List all users (admin only)
   */
  async listUsers(page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.ADMIN.USERS, { page, limit });
      return response.success ? response.data : { users: [], pagination: {} };
    } catch (error) {
      console.error('List users error:', error);
      throw error;
    }
  },

  /**
   * Set user role (admin only)
   */
  async setUserRole(userId, role) {
    try {
      const response = await api.post(API_ENDPOINTS.ADMIN.USER_ROLE(userId), { role });
      return response;
    } catch (error) {
      console.error('Set user role error:', error);
      throw error;
    }
  },

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId) {
    try {
      const response = await api.delete(API_ENDPOINTS.ADMIN.DELETE_USER(userId));
      return response;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },
};
