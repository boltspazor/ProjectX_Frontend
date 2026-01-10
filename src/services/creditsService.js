import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';
import { USE_MOCK_API, mockApi } from '../mocks/mockApi';

/**
 * Credits/Payments Service
 */
export const creditsService = {
  /**
   * Get available credit packages
   */
  async getPackages() {
    try {
      if (USE_MOCK_API) {
        return [
          { id: 'pack_1', name: '100 Credits', amount: 100, price: 499 },
          { id: 'pack_2', name: '500 Credits', amount: 500, price: 1999 },
          { id: 'pack_3', name: '1000 Credits', amount: 1000, price: 3499 }
        ];
      }
      
      const response = await api.get(API_ENDPOINTS.CREDITS.PACKAGES);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Get credit packages error:', error);
      throw error;
    }
  },

  /**
   * Create credit order
   */
  async createOrder(packageId) {
    try {
      if (USE_MOCK_API) {
        const packages = [
          { id: 'pack_1', amount: 100, price: 499 },
          { id: 'pack_2', amount: 500, price: 1999 },
          { id: 'pack_3', amount: 1000, price: 3499 }
        ];
        const pkg = packages.find(p => p.id === packageId);
        const response = await mockApi.credits.purchaseCredits(packageId, pkg.amount);
        return response.success ? response.data : null;
      }
      
      const response = await api.post(API_ENDPOINTS.CREDITS.ORDER, { packageId });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Create credit order error:', error);
      throw error;
    }
  },

  /**
   * Verify payment
   */
  async verifyPayment(paymentData) {
    try {
      const response = await api.post(API_ENDPOINTS.CREDITS.VERIFY, paymentData);
      return response;
    } catch (error) {
      console.error('Verify payment error:', error);
      throw error;
    }
  },

  /**
   * Get purchase history
   */
  async getPurchases(page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.CREDITS.PURCHASES, { page, limit });
      return response.success ? response.data : { purchases: [], pagination: {} };
    } catch (error) {
      console.error('Get purchases error:', error);
      throw error;
    }
  },
};
