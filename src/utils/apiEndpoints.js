// API Endpoint Configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    VERIFY_OTP: '/api/auth/verify-otp',
    RESET_PASSWORD: '/api/auth/reset-password',
    PASSWORD: '/api/auth/password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    DELETE_ACCOUNT: '/api/auth/account',
    GOOGLE: '/api/auth/google',
    GOOGLE_CALLBACK: '/api/auth/google/callback',
  },

  // User endpoints
  USERS: {
    PROFILE: (username) => `/api/users/${username}`,
    UPDATE_PROFILE: '/api/users/profile',
    FOLLOW: (username) => `/api/users/${username}/follow`,
    UNFOLLOW: (username) => `/api/users/${username}/unfollow`,
    FOLLOWERS: (username) => `/api/users/${username}/followers`,
    FOLLOWING: (username) => `/api/users/${username}/following`,
    POSTS: (username) => `/api/users/${username}/posts`,
    SUGGESTIONS: '/api/users/suggestions',
    SEARCH: '/api/users/search',
    BLOCK: (username) => `/api/users/${username}/block`,
  },

  // Post endpoints
  POSTS: {
    CREATE: '/api/posts',
    GET_ALL: '/api/posts',
    GET_ONE: (id) => `/api/posts/${id}`,
    UPDATE: (id) => `/api/posts/${id}`,
    DELETE: (id) => `/api/posts/${id}`,
    LIKE: (id) => `/api/posts/${id}/like`,
    UNLIKE: (id) => `/api/posts/${id}/unlike`,
    COMMENT: (id) => `/api/posts/${id}/comments`,
    DELETE_COMMENT: (postId, commentId) => `/api/posts/${postId}/comments/${commentId}`,
    LIKE_COMMENT: (postId, commentId) => `/api/posts/${postId}/comments/${commentId}/like`,
    SHARE: (id) => `/api/posts/${id}/share`,
    FEED: '/api/posts/feed',
    TRENDING: '/api/posts/trending',
    BOOKMARKS: '/api/posts/bookmarks',
    BOOKMARK: (id) => `/api/posts/${id}/bookmark`,
    TAG_USERS: (id) => `/api/posts/${id}/tag-users`,
  },

  // Message endpoints
  MESSAGES: {
    CONVERSATIONS: '/api/messages/conversations',
    CONVERSATION: (id) => `/api/messages/conversations/${id}`,
    SEND: '/api/messages',
    MESSAGES: (conversationId) => `/api/messages/conversations/${conversationId}/messages`,
    MARK_READ: (conversationId) => `/api/messages/conversations/${conversationId}/read`,
    UPLOAD_MEDIA: '/api/messages/upload',
  },

  // Notification endpoints
  NOTIFICATIONS: {
    GET_ALL: '/api/notifications',
    MARK_READ: (id) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/read-all',
    DELETE: (id) => `/api/notifications/${id}`,
    COUNT: '/api/notifications/count',
  },

  // Story endpoints
  STORIES: {
    CREATE: '/api/stories',
    GET_ALL: '/api/stories',
    VIEW: (id) => `/api/stories/${id}/view`,
  },

  // Community endpoints
  COMMUNITIES: {
    CREATE: '/api/communities',
    GET_ALL: '/api/communities',
    GET_ONE: (id) => `/api/communities/${id}`,
    UPDATE: (id) => `/api/communities/${id}`,
    DELETE: (id) => `/api/communities/${id}`,
    JOIN: (id) => `/api/communities/${id}/join`,
    LEAVE: (id) => `/api/communities/${id}/leave`,
    MEMBERS: (id) => `/api/communities/${id}/members`,
    POSTS: (id) => `/api/communities/${id}/posts`,
    CREATE_POST: (id) => `/api/communities/${id}/posts`,
    SEARCH: '/api/communities/search',
  },

  // Search endpoints
  SEARCH: {
    ALL: '/api/search',
    USERS: '/api/search/users',
    POSTS: '/api/search/posts',
    COMMUNITIES: '/api/search/communities',
  },

  // Analytics endpoints
  ANALYTICS: {
    OVERVIEW: '/api/analytics/overview',
    POSTS: '/api/analytics/posts',
    ENGAGEMENT: '/api/analytics/engagement',
    FOLLOWERS: '/api/analytics/followers',
    TRACK: '/api/analytics/track',
  },

  // AI endpoints
  AI: {
    GENERATE_IMAGE: '/api/ai/generate-image',
    ENHANCE_IMAGE: '/api/ai/enhance-image',
    REMOVE_BACKGROUND: '/api/ai/remove-background',
    GENERATE_CAPTION: '/api/ai/generate-caption',
    MODERATE_CONTENT: '/api/ai/moderate',
    CHAT: '/api/ai/chat',
    SUGGEST_TAGS: '/api/ai/suggest-tags',
  },

  // Credit endpoints
  CREDITS: {
    BALANCE: '/api/credits/balance',
    HISTORY: '/api/credits/history',
    PURCHASE: '/api/credits/purchase',
    VERIFY_PAYMENT: '/api/credits/verify-payment',
    DAILY_BONUS: '/api/credits/daily-bonus',
  },

  // Upload endpoints
  UPLOAD: {
    IMAGE: '/api/upload/image',
    VIDEO: '/api/upload/video',
    AVATAR: '/api/upload/avatar',
    COVER: '/api/upload/cover',
    STORY: '/api/upload/story',
    MESSAGE: '/api/upload/message',
  },

  // Admin endpoints
  ADMIN: {
    USERS: '/api/admin/users',
    POSTS: '/api/admin/posts',
    STATS: '/api/admin/stats',
  },
};

export default API_ENDPOINTS;
