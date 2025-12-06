import { API_CONFIG } from '../config/api';
import { mockApi } from './mockApi';

// Enable mock mode when backend is not available
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || false;

/**
 * Custom API Error class
 */
export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Token management utilities
 */
export const tokenManager = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setAccessToken: (token) => localStorage.setItem('accessToken', token),
  setRefreshToken: (token) => localStorage.setItem('refreshToken', token),
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('user');
  },
  isTokenExpired: () => {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (!tokenExpiry) return true;
    return Date.now() >= parseInt(tokenExpiry, 10);
  },
};

/**
 * Sleep utility for retry logic
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * HTTP Client with automatic retry and token refresh
 */
class HTTPClient {
  constructor(baseURL = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Build full URL
   */
  buildURL(endpoint) {
    return `${this.baseURL}${endpoint}`;
  }

  /**
   * Build headers with auth token
   */
  buildHeaders(customHeaders = {}, requiresAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (requiresAuth) {
      const token = tokenManager.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Handle fetch with timeout
   */
  async fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408, null);
      }
      throw error;
    }
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJSON = contentType && contentType.includes('application/json');

    let data;
    if (isJSON) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const message = data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new APIError(message, response.status, data);
    }

    return data;
  }

  /**
   * Retry logic with exponential backoff
   */
  async retryRequest(fn, attempts = API_CONFIG.RETRY_ATTEMPTS) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (error) {
        const isLastAttempt = i === attempts - 1;
        const shouldRetry = error.status >= 500 || error.status === 429;

        if (isLastAttempt || !shouldRetry) {
          throw error;
        }

        // Exponential backoff: 1s, 2s, 4s
        const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, i);
        await sleep(delay);
      }
    }
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken() {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new APIError('No refresh token available', 401, null);
    }

    try {
      const response = await fetch(this.buildURL('/api/auth/refresh'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      if (data.accessToken) {
        tokenManager.setAccessToken(data.accessToken);
        if (data.refreshToken) {
          tokenManager.setRefreshToken(data.refreshToken);
        }
        return data.accessToken;
      }

      throw new Error('No access token in response');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      tokenManager.clearTokens();
      window.dispatchEvent(new CustomEvent('auth:logout'));
      throw new APIError('Session expired. Please login again.', 401, null);
    }
  }

  /**
   * Make HTTP request with auto-retry and token refresh
   */
  async request(endpoint, options = {}, requiresAuth = true) {
    const makeRequest = async () => {
      const url = this.buildURL(endpoint);
      const headers = this.buildHeaders(options.headers, requiresAuth);

      const response = await this.fetchWithTimeout(url, {
        ...options,
        headers,
      });

      return this.handleResponse(response);
    };

    try {
      return await this.retryRequest(makeRequest);
    } catch (error) {
      // If 401 and we have a refresh token, try to refresh
      if (error.status === 401 && requiresAuth && tokenManager.getRefreshToken()) {
        // eslint-disable-next-line no-useless-catch
        try {
          await this.refreshAccessToken();
          // Retry the original request with new token
          return await this.retryRequest(makeRequest);
        } catch (refreshError) {
          throw refreshError;
        }
      }

      throw error;
    }
  }

  /**
   * HTTP Methods
   */
  async get(endpoint, params = {}, requiresAuth = true) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, { method: 'GET' }, requiresAuth);
  }

  async post(endpoint, data = {}, requiresAuth = true) {
    return this.request(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      requiresAuth
    );
  }

  async put(endpoint, data = {}, requiresAuth = true) {
    return this.request(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      requiresAuth
    );
  }

  async patch(endpoint, data = {}, requiresAuth = true) {
    return this.request(
      endpoint,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      },
      requiresAuth
    );
  }

  async delete(endpoint, requiresAuth = true) {
    return this.request(
      endpoint,
      {
        method: 'DELETE',
      },
      requiresAuth
    );
  }

  /**
   * Upload file (multipart/form-data)
   */
  async upload(endpoint, formData, requiresAuth = true) {
    const url = this.buildURL(endpoint);
    const headers = {};

    if (requiresAuth) {
      const token = tokenManager.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await this.fetchWithTimeout(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse(response);
  }
}

// Create singleton instance
export const httpClient = new HTTPClient();

/**
 * Mock API Mapper - Maps API endpoints to mock functions
 */
const mockApiMapper = {
  // Auth endpoints
  '/api/auth/login': (method, data) => mockApi.login(data),
  '/api/auth/register': (method, data) => mockApi.register(data),
  
  // Posts endpoints
  '/api/posts/feed': (method, params) => mockApi.getFeed(params),
  '/api/posts/trending': () => mockApi.getTrendingPosts(),
  
  // User endpoints
  getUserByUsername: (username) => mockApi.getUserByUsername(username),
  getUserPosts: (username) => mockApi.getUserPosts(username),
  getUserFollowers: (username) => mockApi.getUserFollowers(username),
  getUserFollowing: (username) => mockApi.getUserFollowing(username),
  
  // Communities
  '/api/communities/user/communities': () => mockApi.getUserCommunities(),
  '/api/communities/public': (method, params) => mockApi.getPublicCommunities(params),
  
  // Notifications
  '/api/notifications': () => mockApi.getNotifications(),
  
  // Messages
  '/api/messages/conversations': (method, data) => 
    method === 'GET' ? mockApi.getConversations() : mockApi.createConversation(data.userId),
  
  // Search
  '/api/search': (method, params) => mockApi.search(params),
  '/api/search/ai-posts': () => mockApi.getAIPosts(),
  
  // Upload
  '/api/upload/base64': (method, data) => mockApi.uploadFromBase64(data),
};

// Export convenience methods with mock support
export const api = {
  get: async (...args) => {
    if (USE_MOCK_API) {
      const [endpoint, params] = args;
      // Try to find matching mock endpoint
      if (mockApiMapper[endpoint]) {
        return mockApiMapper[endpoint]('GET', params);
      }
      // Try dynamic endpoints
      if (endpoint.includes('/api/posts/user/')) {
        const username = endpoint.split('/').pop();
        return mockApi.getUserPosts(username);
      }
      if (endpoint.includes('/api/users/')) {
        const username = endpoint.split('/').pop();
        if (endpoint.includes('/followers')) return mockApi.getUserFollowers(username);
        if (endpoint.includes('/following')) return mockApi.getUserFollowing(username);
        return mockApi.getUserByUsername(username);
      }
      if (endpoint.includes('/api/posts/') && endpoint.includes('/comments')) {
        const postId = endpoint.split('/')[3];
        return mockApi.getPostComments(postId);
      }
      if (endpoint.includes('/api/messages/')) {
        const conversationId = endpoint.split('/')[3];
        return mockApi.getMessagesByConversation(conversationId);
      }
      console.warn(`No mock for GET ${endpoint}, returning empty data`);
      return { success: true, data: {} };
    }
    return httpClient.get(...args);
  },
  
  post: async (...args) => {
    if (USE_MOCK_API) {
      const [endpoint, data] = args;
      if (mockApiMapper[endpoint]) {
        return mockApiMapper[endpoint]('POST', data);
      }
      // Dynamic endpoints
      if (endpoint.includes('/api/posts') && !endpoint.includes('/')) {
        return mockApi.createPost(data);
      }
      if (endpoint.includes('/api/posts/') && endpoint.includes('/like')) {
        return mockApi.likePost(endpoint.split('/')[3]);
      }
      if (endpoint.includes('/api/posts/') && endpoint.includes('/comments')) {
        const postId = endpoint.split('/')[3];
        return mockApi.addComment(postId, data);
      }
      if (endpoint.includes('/api/users/') && endpoint.includes('/follow')) {
        return mockApi.followUser(endpoint.split('/')[3]);
      }
      if (endpoint.includes('/api/communities/') && endpoint.includes('/join')) {
        return mockApi.joinCommunity(endpoint.split('/')[3]);
      }
      if (endpoint.includes('/api/communities/') && endpoint.includes('/leave')) {
        return mockApi.leaveCommunity(endpoint.split('/')[3]);
      }
      if (endpoint.includes('/api/messages')) {
        const conversationId = args[0].split('/')[3];
        return mockApi.sendMessage(conversationId, data);
      }
      if (endpoint.includes('/api/notifications/') && endpoint.includes('/read')) {
        return mockApi.markNotificationAsRead(endpoint.split('/')[3]);
      }
      console.warn(`No mock for POST ${endpoint}`);
      return { success: true, data: {} };
    }
    return httpClient.post(...args);
  },
  
  put: async (...args) => {
    if (USE_MOCK_API) {
      const [endpoint, data] = args;
      if (endpoint.includes('/api/users/profile')) {
        return mockApi.updateProfile(data);
      }
      if (endpoint.includes('/api/messages/') && endpoint.includes('/read')) {
        return mockApi.markConversationAsRead(endpoint.split('/')[3]);
      }
      console.warn(`No mock for PUT ${endpoint}`);
      return { success: true, data: {} };
    }
    return httpClient.put(...args);
  },
  
  patch: async (...args) => {
    if (USE_MOCK_API) {
      console.warn(`No mock for PATCH ${args[0]}`);
      return { success: true, data: {} };
    }
    return httpClient.patch(...args);
  },
  
  delete: async (...args) => {
    if (USE_MOCK_API) {
      const [endpoint] = args;
      if (endpoint.includes('/api/posts/') && endpoint.includes('/like')) {
        return mockApi.unlikePost(endpoint.split('/')[3]);
      }
      if (endpoint.includes('/api/users/') && endpoint.includes('/follow')) {
        return mockApi.unfollowUser(endpoint.split('/')[3]);
      }
      if (endpoint.includes('/api/notifications/')) {
        return mockApi.deleteNotification(endpoint.split('/')[3]);
      }
      console.warn(`No mock for DELETE ${endpoint}`);
      return { success: true, data: {} };
    }
    return httpClient.delete(...args);
  },
  
  upload: async (...args) => {
    if (USE_MOCK_API) {
      console.warn(`Mock upload not fully implemented`);
      return { success: true, data: { url: 'https://picsum.photos/600/600' } };
    }
    return httpClient.upload(...args);
  },
};
