/**
 * Mock API for development without backend
 * This file provides dummy data to test the frontend
 */

// Mock delay to simulate network requests
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUser = {
  id: '1',
  username: 'idkwhoisrahul_04',
  email: 'rahul@example.com',
  fullName: 'Rahul Kumar',
  bio: 'Full-stack developer | Tech enthusiast',
  profilePhoto: 'https://i.pravatar.cc/150?img=1',
  followersCount: 1234,
  followingCount: 567,
  postsCount: 89,
  isVerified: true,
};

// Mock posts - Complete with all fields
const mockPosts = Array.from({ length: 20 }, (_, i) => ({
  id: `post-${i + 1}`,
  _id: `post-${i + 1}`, // Support both id and _id
  imageUrl: `https://picsum.photos/600/600?random=${i + 1}`,
  image: `https://picsum.photos/600/600?random=${i + 1}`, // Fallback for different components
  caption: `This is an awesome post #${i + 1} 🔥 Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  user: {
    id: `user-${i + 1}`,
    username: `user_${i + 1}`,
    profilePhoto: `https://i.pravatar.cc/100?img=${i + 1}`,
    isVerified: i % 3 === 0,
  },
  username: `user_${i + 1}`, // Fallback
  profileImage: `https://i.pravatar.cc/100?img=${i + 1}`, // Fallback
  likesCount: Math.floor(Math.random() * 1000) + 100,
  commentsCount: Math.floor(Math.random() * 100) + 10,
  isLiked: Math.random() > 0.5,
  createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  location: i % 4 === 0 ? 'New York, USA' : null,
  tags: [`tag${i}`, `awesome`],
}));

// Mock comments - Complete with all fields
const mockComments = Array.from({ length: 10 }, (_, i) => ({
  id: `comment-${i + 1}`,
  text: `Great post! This is comment number ${i + 1} 🎉 Lorem ipsum dolor sit amet.`,
  user: {
    id: `commenter-${i + 1}`,
    username: `commenter_${i + 1}`,
    profilePhoto: `https://i.pravatar.cc/50?img=${i + 20}`,
  },
  username: `commenter_${i + 1}`, // Fallback
  image: `https://i.pravatar.cc/50?img=${i + 20}`, // Fallback
  likesCount: Math.floor(Math.random() * 50),
  likes: Math.floor(Math.random() * 50), // Fallback
  isLiked: Math.random() > 0.5,
  liked: Math.random() > 0.5, // Fallback
  createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
  time: `${Math.floor(Math.random() * 24)}h`, // Fallback
}));

// Mock communities - Complete with all fields
const mockCommunities = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  slug: `community-${i + 1}`,
  name: `${['Music Lovers', 'Tech Enthusiasts', 'Gaming Squad', 'Art Lovers', 'Music Fans', 'Food Critics', 'Sports Fans', 'Book Club', 'Fitness Freaks', 'Travel Bugs', 'Photo Club', 'Coding Ninjas'][i]}`,
  description: 'A great community for enthusiasts to share ideas, connect, and grow together. Join us for amazing discussions!',
  members: `${Math.floor(Math.random() * 10000) + 500}`,
  followers: `${Math.floor(Math.random() * 10000) + 500}`,
  membersCount: Math.floor(Math.random() * 10000) + 500,
  contributors: `${Math.floor(Math.random() * 200) + 50}`,
  avatar: `https://i.pravatar.cc/100?img=${i + 30}`,
  icon: `https://i.pravatar.cc/100?img=${i + 30}`,
  cover: `https://picsum.photos/800/400?random=${i + 50}`,
  banner: `https://picsum.photos/1200/400?random=${i + 50}`,
  badges: ['Active', 'Trending'],
  category: ['Technology', 'Games', 'Art & Design', 'Music', 'Food', 'Sports'][i % 6],
  type: i % 2 === 0 ? 'Public' : 'Private',
  createdDate: 'Jan 15, 2020',
  isJoined: i % 3 === 0,
  creator: 'admin_user',
  creatorId: 'admin-1',
  topics: ['Discussion', 'Events', 'News', 'Q&A'],
  moderators: [
    { id: 1, username: `mod_${i}_1`, avatar: `https://i.pravatar.cc/50?img=${i * 3 + 1}` },
    { id: 2, username: `mod_${i}_2`, avatar: `https://i.pravatar.cc/50?img=${i * 3 + 2}` },
  ],
  rules: [
    'Be respectful to all members',
    'No spam or self-promotion',
    'Keep content relevant',
    'Follow community guidelines',
  ],
  posts: Array.from({ length: 8 }, (_, j) => ({
    id: i * 10 + j + 1,
    username: `user_${j + 1}`,
    avatar: `https://i.pravatar.cc/100?img=${j + 10}`,
    title: `Community Post ${j + 1}`,
    content: `This is post number ${j + 1} in the community. Great discussion happening here!`,
    image: j % 2 === 0 ? `https://picsum.photos/600/600?random=${i * 10 + j}` : null,
    imageUrl: j % 2 === 0 ? `https://picsum.photos/600/600?random=${i * 10 + j}` : null,
    likes: Math.floor(Math.random() * 500),
    likesCount: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 100),
    commentsCount: Math.floor(Math.random() * 100),
    liked: j % 3 === 0,
    isLiked: j % 3 === 0,
    createdAt: new Date(Date.now() - j * 3600000).toISOString(),
  })),
}));

// Mock notifications
const mockNotifications = Array.from({ length: 15 }, (_, i) => ({
  id: `notification-${i + 1}`,
  type: ['like', 'comment', 'follow', 'mention'][i % 4],
  user: {
    username: `user_${i + 1}`,
    profilePhoto: `https://i.pravatar.cc/50?img=${i + 10}`,
  },
  post: i % 2 === 0 ? { imageUrl: `https://picsum.photos/100/100?random=${i}` } : null,
  message: `interacted with your content`,
  createdAt: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
  isRead: i > 5,
}));

// Mock conversations
const mockConversations = Array.from({ length: 10 }, (_, i) => ({
  id: `conversation-${i + 1}`,
  user: {
    username: `chat_user_${i + 1}`,
    profilePhoto: `https://i.pravatar.cc/50?img=${i + 40}`,
  },
  lastMessage: {
    text: `Hey! This is message ${i + 1}`,
    createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  },
  unreadCount: i < 3 ? Math.floor(Math.random() * 5) : 0,
}));

// Mock messages
const mockMessages = Array.from({ length: 20 }, (_, i) => ({
  id: `message-${i + 1}`,
  text: `This is message number ${i + 1}`,
  senderId: i % 2 === 0 ? '1' : '2',
  createdAt: new Date(Date.now() - (20 - i) * 60000).toISOString(),
}));

/**
 * Mock API Service
 */
export const mockApi = {
  // Auth
  async login(credentials) {
    await delay();
    return {
      success: true,
      data: {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      },
    };
  },

  async register(userData) {
    await delay();
    return {
      success: true,
      data: {
        user: { ...mockUser, ...userData },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      },
    };
  },

  // Posts
  async getFeed({ limit = 10, lastDocId = null }) {
    await delay();
    const start = lastDocId ? parseInt(lastDocId) : 0;
    const posts = mockPosts.slice(start, start + limit);
    return {
      success: true,
      data: {
        posts,
        lastDocId: start + limit < mockPosts.length ? String(start + limit) : null,
        hasMore: start + limit < mockPosts.length,
      },
    };
  },

  async getTrendingPosts() {
    await delay();
    return {
      success: true,
      data: { posts: mockPosts.slice(0, 10) },
    };
  },

  async getUserPosts(username) {
    await delay();
    return {
      success: true,
      data: { posts: mockPosts.slice(0, 6) },
    };
  },

  async getPostComments(postId) {
    await delay();
    return {
      success: true,
      data: { comments: mockComments },
    };
  },

  async createPost(postData) {
    await delay();
    return {
      success: true,
      data: {
        id: 'new-post-' + Date.now(),
        ...postData,
        user: mockUser,
        likesCount: 0,
        commentsCount: 0,
        isLiked: false,
        createdAt: new Date().toISOString(),
      },
    };
  },

  async likePost(postId) {
    await delay(200);
    return { success: true, data: { liked: true } };
  },

  async unlikePost(postId) {
    await delay(200);
    return { success: true, data: { liked: false } };
  },

  async addComment(postId, commentData) {
    await delay();
    return {
      success: true,
      data: {
        comment: {
          id: 'new-comment-' + Date.now(),
          ...commentData,
          user: mockUser,
          likesCount: 0,
          isLiked: false,
          createdAt: new Date().toISOString(),
        },
      },
    };
  },

  // Users
  async getUserByUsername(username) {
    await delay();
    // Generate consistent mock data based on username
    const userHash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const avatarNum = (userHash % 70) + 1;
    
    return {
      success: true,
      data: { 
        id: 'user-' + username,
        username,
        displayName: username.replace('_', ' ').charAt(0).toUpperCase() + username.replace('_', ' ').slice(1),
        fullName: username.replace('_', ' ').toUpperCase(),
        email: `${username}@example.com`,
        avatar: `https://i.pravatar.cc/150?img=${avatarNum}`,
        profilePhoto: `https://i.pravatar.cc/150?img=${avatarNum}`,
        profileVideo: null,
        coverImage: `https://picsum.photos/1200/40${avatarNum % 10}`,
        bio: `Hey there! I'm ${username}. Welcome to my profile 👋`,
        location: ['New York, NY', 'Los Angeles, CA', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA'][userHash % 5],
        website: `https://${username}.com`,
        joinDate: '2023-0' + ((userHash % 9) + 1) + '-15',
        isFollowing: userHash % 3 === 0,
        isVerified: userHash % 4 === 0,
        stats: {
          posts: 50 + (userHash % 100),
          followers: 500 + (userHash % 5000),
          following: 100 + (userHash % 500),
          communities: 10 + (userHash % 20),
        },
      },
    };
  },

  async getUserStats(username) {
    await delay();
    return {
      success: true,
      data: {
        postsCount: Math.floor(Math.random() * 100) + 20,
        followersCount: Math.floor(Math.random() * 5000) + 500,
        followingCount: Math.floor(Math.random() * 1000) + 100,
      },
    };
  },

  async getUserById(userId) {
    await delay();
    // Return different user data based on userId
    const users = [
      {
        id: '1',
        username: 'johndoe',
        displayName: 'John Doe',
        email: 'john@example.com',
        avatar: `https://i.pravatar.cc/150?img=${userId || 1}`,
        profilePhoto: `https://i.pravatar.cc/150?img=${userId || 1}`,
        coverImage: 'https://picsum.photos/1200/400',
        bio: 'Software developer and tech enthusiast. Love building cool stuff!',
        location: 'San Francisco, CA',
        website: 'https://johndoe.dev',
        joinDate: '2023-01-15',
        isFollowing: false,
        isVerified: true,
        stats: {
          posts: 127,
          followers: 4523,
          following: 342,
          communities: 23,
        },
      },
      {
        id: '2',
        username: 'jansmith',
        displayName: 'Jane Smith',
        email: 'jane@example.com',
        avatar: `https://i.pravatar.cc/150?img=${parseInt(userId) + 1 || 2}`,
        profilePhoto: `https://i.pravatar.cc/150?img=${parseInt(userId) + 1 || 2}`,
        coverImage: 'https://picsum.photos/1200/401',
        bio: 'Designer, photographer, and coffee lover ☕',
        location: 'New York, NY',
        website: 'https://janesmith.com',
        joinDate: '2023-03-20',
        isFollowing: true,
        isVerified: true,
        stats: {
          posts: 89,
          followers: 2341,
          following: 189,
          communities: 15,
        },
      },
    ];
    
    const userIndex = (parseInt(userId) - 1) % users.length;
    const user = users[userIndex] || users[0];
    
    return {
      success: true,
      data: { ...user, id: userId },
    };
  },

  async getUserFollowers(username) {
    await delay();
    return {
      success: true,
      data: {
        followers: Array.from({ length: 10 }, (_, i) => ({
          id: `user-${i}`,
          username: `follower_${i}`,
          displayName: `Follower ${i}`,
          profilePhoto: `https://i.pravatar.cc/50?img=${i}`,
          avatar: `https://i.pravatar.cc/50?img=${i}`,
          isFollowing: i % 3 === 0,
        })),
      },
    };
  },

  async getUserFollowing(username) {
    await delay();
    return {
      success: true,
      data: {
        following: Array.from({ length: 10 }, (_, i) => ({
          id: `user-${i}`,
          username: `following_${i}`,
          displayName: `Following ${i}`,
          profilePhoto: `https://i.pravatar.cc/50?img=${i + 10}`,
          avatar: `https://i.pravatar.cc/50?img=${i + 10}`,
          isFollowing: true,
        })),
      },
    };
  },

  async followUser(userId) {
    await delay(200);
    return { success: true, data: { following: true } };
  },

  async unfollowUser(userId) {
    await delay(200);
    return { success: true, data: { following: false } };
  },

  async updateProfile(profileData) {
    await delay();
    return {
      success: true,
      data: { ...mockUser, ...profileData },
    };
  },

  // Communities
  async getUserCommunities() {
    await delay();
    return {
      success: true,
      data: mockCommunities.slice(0, 6),
    };
  },

  async getPublicCommunities({ category, limit = 6 }) {
    await delay();
    let communities = mockCommunities;
    if (category && category !== 'All') {
      communities = communities.filter(c => c.category === category);
    }
    return {
      success: true,
      data: communities.slice(0, limit),
    };
  },

  async joinCommunity(communityId) {
    await delay(200);
    return { success: true, data: { joined: true } };
  },

  async leaveCommunity(communityId) {
    await delay(200);
    return { success: true, data: { joined: false } };
  },

  async getCommunityBySlug(slug) {
    await delay();
    // Try to find by slug, id, or number
    const communityId = typeof slug === 'string' ? parseInt(slug.replace(/\D/g, '')) || 1 : slug;
    const community = mockCommunities.find(c => 
      c.slug === slug || 
      c.id === slug || 
      c.id === communityId ||
      c.id === parseInt(slug)
    ) || mockCommunities[0];
    return {
      success: true,
      data: community,
    };
  },

  async getCommunityPosts(communityId) {
    await delay();
    const community = mockCommunities.find(c => c.id === parseInt(communityId) || c.slug === communityId) || mockCommunities[0];
    return {
      success: true,
      data: { posts: community.posts || mockPosts.slice(0, 8) },
    };
  },

  // Notifications
  async getNotifications() {
    await delay();
    return {
      success: true,
      data: mockNotifications,
    };
  },

  async markNotificationAsRead(notificationId) {
    await delay(200);
    return { success: true, data: { read: true } };
  },

  async deleteNotification(notificationId) {
    await delay(200);
    return { success: true, data: { deleted: true } };
  },

  // Messages
  async getConversations() {
    await delay();
    return {
      success: true,
      data: mockConversations,
    };
  },

  async getMessagesByConversation(conversationId) {
    await delay();
    return {
      success: true,
      data: mockMessages,
    };
  },

  async sendMessage(conversationId, messageData) {
    await delay();
    return {
      success: true,
      data: {
        id: 'new-message-' + Date.now(),
        ...messageData,
        senderId: '1',
        createdAt: new Date().toISOString(),
      },
    };
  },

  async createConversation(userId) {
    await delay();
    return {
      success: true,
      data: {
        id: 'new-conversation-' + Date.now(),
        user: {
          username: 'new_user',
          profilePhoto: 'https://i.pravatar.cc/50?img=99',
        },
        lastMessage: null,
        unreadCount: 0,
      },
    };
  },

  async markConversationAsRead(conversationId) {
    await delay(200);
    return { success: true, data: { read: true } };
  },

  // Search
  async search({ query, type, category }) {
    await delay();
    return {
      success: true,
      data: {
        posts: mockPosts.slice(0, 8),
        users: Array.from({ length: 5 }, (_, i) => ({
          id: `user-${i}`,
          username: `${query}_user_${i}`,
          profilePhoto: `https://i.pravatar.cc/50?img=${i}`,
        })),
      },
    };
  },

  async getAIPosts() {
    await delay();
    return {
      success: true,
      data: mockPosts.slice(0, 10),
    };
  },

  // Upload
  async uploadFromBase64({ base64Data, fileName, fileType }) {
    await delay(1000);
    // Return a mock URL
    return {
      success: true,
      data: {
        url: `https://picsum.photos/600/600?random=${Date.now()}`,
        publicId: 'mock-upload-' + Date.now(),
      },
    };
  },
};
