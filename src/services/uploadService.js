import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';
import { USE_MOCK_API, mockApi } from '../mocks/mockApi';

/**
 * Upload Service
 */
export const uploadService = {
  /**
   * Upload image from URL
   */
  async uploadFromURL(imageUrl, folder = 'posts') {
    try {
      if (USE_MOCK_API) return await mockApi.upload.uploadImage({ url: imageUrl, folder });
      
      const response = await api.post(API_ENDPOINTS.UPLOAD.URL, { imageUrl, folder });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Upload from URL error:', error);
      throw error;
    }
  },

  /**
   * Upload image from base64
   */
  async uploadFromBase64(base64, folder = 'posts') {
    try {
      if (USE_MOCK_API) return await mockApi.upload.uploadImage({ base64, folder });
      
      const response = await api.post(API_ENDPOINTS.UPLOAD.BASE64, { base64, folder });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Upload from base64 error:', error);
      throw error;
    }
  },

  /**
   * Get optimized image URL
   */
  async getOptimizedImage(publicId) {
    try {
      const response = await api.get(API_ENDPOINTS.UPLOAD.OPTIMIZE(publicId));
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get optimized image error:', error);
      throw error;
    }
  },

  /**
   * Get transformed image URL
   */
  async getTransformedImage(publicId) {
    try {
      const response = await api.get(API_ENDPOINTS.UPLOAD.TRANSFORM(publicId));
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get transformed image error:', error);
      throw error;
    }
  },

  /**
   * Get square image URL
   */
  async getSquareImage(publicId) {
    try {
      const response = await api.get(API_ENDPOINTS.UPLOAD.SQUARE(publicId));
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get square image error:', error);
      throw error;
    }
  },

  /**
   * Delete image
   */
  async deleteImage(publicId) {
    try {
      const response = await api.delete(API_ENDPOINTS.UPLOAD.DELETE(publicId));
      return response;
    } catch (error) {
      console.error('Delete image error:', error);
      throw error;
    }
  },

  /**
   * Upload file (multipart form data)
   */
  async uploadFile(file, folder = 'posts') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await api.upload(API_ENDPOINTS.UPLOAD.URL, formData);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  },
};
