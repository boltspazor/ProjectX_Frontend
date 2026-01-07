import {
  mockUsers,
  allUsers,
  mockPosts,
  mockComments,
  mockCommunities,
  mockConversations,
  mockMessages,
  mockNotifications,
  mockStories,
  mockCreditTransactions,
  mockAnalytics,
} from './mockData';

// Enable/Disable mock API
export const USE_MOCK_API = true;

// Helper to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to simulate success response
const successResponse = (data) => ({
  success: true,
  data,
  message: 'Success',
});

// Helper to simulate error response
const errorResponse = (message) => ({
  success: false,
  error: message,
  message,
});

// Local state for dynamic data
let localPosts = [...mockPosts];
let localUsers = { ...mockUsers };
let localCommunities = [...mockCommunities];
let localNotifications = [...mockNotifications];
let localConversations = [...mockConversations];
let localMessages = { ...mockMessages };

/**
 * Mock API Service
 */
export const mockApi = {
  // ==================== AUTH ====================
  auth: {
    async login(credentials) {
      await delay();
      const { email, password } = credentials;

      // Check credentials
      if (mockUsers[email] && password === 'password123') {
        const user = mockUsers[email];
        const accessToken = `mock_token_${user._id}_${Date.now()}`;
        const refreshToken = `mock_refresh_${user._id}_${Date.now()}`;

        return successResponse({
          user,
          accessToken,
          refreshToken,
        });
      }

      return errorResponse('Invalid credentials');
    },

    async register(userData) {
      await delay();
      const newUser = {
        _id: `user_${Date.now()}`,
        ...userData,
        avatar: 'https://i.pravatar.cc/300',
        followers: 0,
        following: 0,
        postsCount: 0,
        credits: 100,
        verified: false,
        isPrivate: false,
        createdAt: new Date().toISOString(),
      };

      localUsers[userData.email] = newUser;
      const accessToken = `mock_token_${newUser._id}_${Date.now()}`;
      const refreshToken = `mock_refresh_${newUser._id}_${Date.now()}`;

      return successResponse({
        user: newUser,
        accessToken,
        refreshToken,
      });
    },

    async getCurrentUser() {
      await delay(200);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return successResponse(JSON.parse(storedUser));
      }
      return errorResponse('Not authenticated');
    },

    async forgotPassword(email) {
      await delay();
      if (mockUsers[email]) {
        return successResponse({ message: 'OTP sent to email' });
      }
      return errorResponse('Email not found');
    },

    async verifyOTP(data) {
      await delay();
      // Accept any 6-digit code for demo
      if (data.otp && data.otp.length === 6) {
        return successResponse({ verified: true });
      }
      return errorResponse('Invalid OTP');
    },

    async resetPassword() {
      await delay();
      return successResponse({ message: 'Password reset successfully' });
    },
  },

  // ==================== USERS ====================
  users: {
    async searchUsers(query, limit = 10) {
      await delay();
      const results = allUsers.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.displayName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, limit);
      return successResponse(results);
    },

    async updateProfile(profileData) {
      await delay();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...storedUser, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return successResponse(updatedUser);
    },

    async getCreditsBalance() {
      await delay(200);
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      return successResponse({ credits: storedUser.credits || 500 });
    },

    async getCreditTransactions(page = 1, limit = 20) {
      await delay();
      return successResponse({
        transactions: mockCreditTransactions,
        pagination: {
          page,
          limit,
          total: mockCreditTransactions.length,
          pages: 1,
        },
      });
    },

    async getUserByUsername(username) {
      await delay();
      const user = allUsers.find(u => u.username === username);
      if (user) {
        return successResponse(user);
      }
      return errorResponse('User not found');
    },

    async getUserFollowers(username, page = 1, limit = 20) {
      await delay();
      // Return random users as followers
      const followers = allUsers.slice(0, limit);
      return successResponse({
        followers,
        pagination: { page, limit, total: followers.length, pages: 1 },
      });
    },

    async getUserFollowing(username, page = 1, limit = 20) {
      await delay();
      const following = allUsers.slice(0, limit);
      return successResponse({
        following,
        pagination: { page, limit, total: following.length, pages: 1 },
      });
    },

    async getUserStats(username) {
      await delay();
      const user = allUsers.find(u => u.username === username);
      if (user) {
        return successResponse({
          followers: user.followers,
          following: user.following,
          posts: user.postsCount,
        });
      }
      return errorResponse('User not found');
    },

    async followUser() {
      await delay();
      return successResponse({ message: 'User followed successfully' });
    },

    async unfollowUser() {
      await delay();
      return successResponse({ message: 'User unfollowed successfully' });
    },
  },

  // ==================== POSTS ====================
  posts: {
    async getFeed(params = {}) {
      await delay();
      const { limit = 10, lastDocId = null } = params;
      const startIndex = lastDocId ? localPosts.findIndex(p => p._id === lastDocId) + 1 : 0;
      const posts = localPosts.slice(startIndex, startIndex + limit);
      
      return successResponse({
        posts,
        lastDocId: posts.length > 0 ? posts[posts.length - 1]._id : null,
        hasMore: startIndex + limit < localPosts.length,
      });
    },

    async getTrending(limit = 10, page = 1) {
      await delay();
      const startIndex = (page - 1) * limit;
      const trendingPosts = [...localPosts].sort((a, b) => b.likes - a.likes);
      const posts = trendingPosts.slice(startIndex, startIndex + limit);
      
      return successResponse({
        posts,
        pagination: {
          page,
          limit,
          total: trendingPosts.length,
          pages: Math.ceil(trendingPosts.length / limit),
        },
      });
    },

    async getUserPosts(username, limit = 10, page = 1) {
      await delay();
      const user = allUsers.find(u => u.username === username);
      if (!user) return errorResponse('User not found');

      const userPosts = localPosts.filter(p => p.userId === user._id);
      const startIndex = (page - 1) * limit;
      const posts = userPosts.slice(startIndex, startIndex + limit);

      return successResponse({
        posts,
        pagination: {
          page,
          limit,
          total: userPosts.length,
          pages: Math.ceil(userPosts.length / limit),
        },
      });
    },

    async getPostById(postId) {
      await delay();
      const post = localPosts.find(p => p._id === postId);
      if (post) {
        return successResponse(post);
      }
      return errorResponse('Post not found');
    },

    async getPostComments(postId, limit = 20, page = 1) {
      await delay();
      const comments = mockComments[postId] || [];
      return successResponse({
        comments,
        pagination: {
          page,
          limit,
          total: comments.length,
          pages: Math.ceil(comments.length / limit),
        },
      });
    },

    async createPost(postData) {
      await delay();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const newPost = {
        _id: `post_${Date.now()}`,
        userId: storedUser._id,
        user: storedUser,
        ...postData,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isSaved: false,
        createdAt: new Date().toISOString(),
      };
      localPosts.unshift(newPost);
      return successResponse(newPost);
    },

    async updatePost(postId, postData) {
      await delay();
      const postIndex = localPosts.findIndex(p => p._id === postId);
      if (postIndex !== -1) {
        localPosts[postIndex] = { ...localPosts[postIndex], ...postData };
        return successResponse(localPosts[postIndex]);
      }
      return errorResponse('Post not found');
    },

    async deletePost(postId) {
      await delay();
      localPosts = localPosts.filter(p => p._id !== postId);
      return successResponse({ message: 'Post deleted successfully' });
    },

    async likePost(postId) {
      await delay();
      const post = localPosts.find(p => p._id === postId);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        return successResponse(post);
      }
      return errorResponse('Post not found');
    },

    async savePost(postId) {
      await delay();
      const post = localPosts.find(p => p._id === postId);
      if (post) {
        post.isSaved = !post.isSaved;
        return successResponse(post);
      }
      return errorResponse('Post not found');
    },

    async sharePost(postId) {
      await delay();
      const post = localPosts.find(p => p._id === postId);
      if (post) {
        post.shares += 1;
        return successResponse(post);
      }
      return errorResponse('Post not found');
    },

    async createComment(postId, commentData) {
      await delay();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const newComment = {
        _id: `comment_${Date.now()}`,
        postId,
        userId: storedUser._id,
        user: storedUser,
        ...commentData,
        likes: 0,
        createdAt: new Date().toISOString(),
      };

      if (!mockComments[postId]) {
        mockComments[postId] = [];
      }
      mockComments[postId].push(newComment);

      const post = localPosts.find(p => p._id === postId);
      if (post) {
        post.comments += 1;
      }

      return successResponse(newComment);
    },
  },

  // ==================== COMMUNITIES ====================
  communities: {
    async getPublicCommunities(limit = 20) {
      await delay();
      return successResponse(localCommunities.filter(c => !c.isPrivate).slice(0, limit));
    },

    async getUserCommunities(limit = 20) {
      await delay();
      return successResponse(localCommunities.filter(c => c.isJoined).slice(0, limit));
    },

    async createCommunity(communityData) {
      await delay();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const newCommunity = {
        _id: `community_${Date.now()}`,
        ...communityData,
        slug: communityData.name.toLowerCase().replace(/\s+/g, '-'),
        membersCount: 1,
        postsCount: 0,
        isJoined: true,
        createdBy: storedUser._id,
        createdAt: new Date().toISOString(),
      };
      localCommunities.unshift(newCommunity);
      return successResponse(newCommunity);
    },

    async getCommunityBySlug(slug) {
      await delay();
      const community = localCommunities.find(c => c.slug === slug);
      if (community) {
        return successResponse(community);
      }
      return errorResponse('Community not found');
    },

    async getCommunityPosts(communityId, limit = 10, page = 1) {
      await delay();
      // Return some posts for the community
      const posts = localPosts.slice(0, limit);
      return successResponse({
        posts,
        pagination: { page, limit, total: posts.length, pages: 1 },
      });
    },

    async updateCommunity(communityId, communityData) {
      await delay();
      const index = localCommunities.findIndex(c => c._id === communityId);
      if (index !== -1) {
        localCommunities[index] = { ...localCommunities[index], ...communityData };
        return successResponse(localCommunities[index]);
      }
      return errorResponse('Community not found');
    },

    async deleteCommunity(communityId) {
      await delay();
      localCommunities = localCommunities.filter(c => c._id !== communityId);
      return successResponse({ message: 'Community deleted successfully' });
    },

    async joinCommunity(communityId) {
      await delay();
      const community = localCommunities.find(c => c._id === communityId);
      if (community) {
        community.isJoined = true;
        community.membersCount += 1;
        return successResponse(community);
      }
      return errorResponse('Community not found');
    },

    async leaveCommunity(communityId) {
      await delay();
      const community = localCommunities.find(c => c._id === communityId);
      if (community) {
        community.isJoined = false;
        community.membersCount -= 1;
        return successResponse(community);
      }
      return errorResponse('Community not found');
    },
  },

  // ==================== MESSAGES ====================
  messages: {
    async getConversations(limit = 20) {
      await delay();
      return successResponse(localConversations.slice(0, limit));
    },

    async getMessages(conversationId, limit = 50, page = 1) {
      await delay();
      const messages = localMessages[conversationId] || [];
      return successResponse({
        messages,
        pagination: { page, limit, total: messages.length, pages: 1 },
      });
    },

    async sendMessage(conversationId, messageData) {
      await delay();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const newMessage = {
        _id: `msg_${Date.now()}`,
        conversationId,
        senderId: storedUser._id,
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false,
      };

      if (!localMessages[conversationId]) {
        localMessages[conversationId] = [];
      }
      localMessages[conversationId].push(newMessage);

      // Update conversation
      const conv = localConversations.find(c => c._id === conversationId);
      if (conv) {
        conv.lastMessage = {
          content: messageData.content,
          timestamp: newMessage.timestamp,
          senderId: storedUser._id,
          read: false,
        };
      }

      return successResponse(newMessage);
    },

    async createConversation(userId) {
      await delay();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const otherUser = allUsers.find(u => u._id === userId);
      
      if (!otherUser) {
        return errorResponse('User not found');
      }

      const newConversation = {
        _id: `conv_${Date.now()}`,
        participants: [storedUser._id, userId],
        otherUser,
        lastMessage: null,
        unreadCount: 0,
      };

      localConversations.unshift(newConversation);
      localMessages[newConversation._id] = [];

      return successResponse(newConversation);
    },

    async markAsRead(conversationId) {
      await delay();
      const conv = localConversations.find(c => c._id === conversationId);
      if (conv) {
        conv.unreadCount = 0;
        if (conv.lastMessage) {
          conv.lastMessage.read = true;
        }
      }
      return successResponse({ message: 'Marked as read' });
    },
  },

  // ==================== NOTIFICATIONS ====================
  notifications: {
    async getNotifications(limit = 20, page = 1) {
      await delay();
      const startIndex = (page - 1) * limit;
      const notifications = localNotifications.slice(startIndex, startIndex + limit);
      return successResponse({
        notifications,
        pagination: {
          page,
          limit,
          total: localNotifications.length,
          pages: Math.ceil(localNotifications.length / limit),
        },
      });
    },

    async getUnreadCount() {
      await delay(200);
      const unreadCount = localNotifications.filter(n => !n.read).length;
      return successResponse({ count: unreadCount });
    },

    async markAsRead(notificationId) {
      await delay();
      const notif = localNotifications.find(n => n._id === notificationId);
      if (notif) {
        notif.read = true;
        return successResponse(notif);
      }
      return errorResponse('Notification not found');
    },

    async markAllAsRead() {
      await delay();
      localNotifications.forEach(n => n.read = true);
      return successResponse({ message: 'All notifications marked as read' });
    },
  },

  // ==================== STORIES ====================
  stories: {
    async getStories() {
      await delay();
      return successResponse(mockStories);
    },

    async createStory(storyData) {
      await delay();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const newStory = {
        _id: `story_${Date.now()}`,
        userId: storedUser._id,
        user: storedUser,
        ...storyData,
        views: 0,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      return successResponse(newStory);
    },

    async deleteStory() {
      await delay();
      return successResponse({ message: 'Story deleted successfully' });
    },

    async viewStory() {
      await delay();
      return successResponse({ message: 'Story viewed' });
    },
  },

  // ==================== SEARCH ====================
  search: {
    async globalSearch(query, type = 'all', limit = 10) {
      await delay();
      
      let results = {};

      if (type === 'all' || type === 'users') {
        results.users = allUsers.filter(u =>
          u.username.toLowerCase().includes(query.toLowerCase()) ||
          u.displayName.toLowerCase().includes(query.toLowerCase())
        ).slice(0, limit);
      }

      if (type === 'all' || type === 'posts') {
        results.posts = localPosts.filter(p =>
          p.content.toLowerCase().includes(query.toLowerCase()) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
        ).slice(0, limit);
      }

      if (type === 'all' || type === 'communities') {
        results.communities = localCommunities.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, limit);
      }

      return successResponse(results);
    },
  },

  // ==================== AI ====================
  ai: {
    async generateContent(prompt) {
      await delay(1000);
      return successResponse({
        content: `Generated content based on: "${prompt}"\n\nThis is a mock AI response. In production, this would be generated by an actual AI service.`,
      });
    },

    async generateImage(prompt) {
      await delay(1500);
      return successResponse({
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        prompt,
      });
    },
  },

  // ==================== CREDITS ====================
  credits: {
    async purchaseCredits(packageId, amount) {
      await delay();
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      storedUser.credits = (storedUser.credits || 0) + amount;
      localStorage.setItem('user', JSON.stringify(storedUser));
      
      return successResponse({
        credits: storedUser.credits,
        transaction: {
          _id: `trans_${Date.now()}`,
          type: 'purchase',
          amount,
          description: `Purchased ${amount} credits`,
          createdAt: new Date().toISOString(),
        },
      });
    },
  },

  // ==================== ANALYTICS ====================
  analytics: {
    async getAnalytics() {
      await delay();
      return successResponse(mockAnalytics);
    },

    async trackEvent() {
      await delay(100);
      return successResponse({ message: 'Event tracked' });
    },
  },

  // ==================== UPLOAD ====================
  upload: {
    async uploadImage() {
      await delay(800);
      // Simulate upload and return a mock URL
      return successResponse({
        url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
        publicId: `upload_${Date.now()}`,
      });
    },

    async uploadVideo() {
      await delay(1200);
      return successResponse({
        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        publicId: `video_${Date.now()}`,
      });
    },

    async deleteMedia() {
      await delay();
      return successResponse({ message: 'Media deleted successfully' });
    },
  },
};
