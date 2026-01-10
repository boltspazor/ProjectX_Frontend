// Mock Users
export const mockUsers = {
  'john@example.com': {
    _id: 'user_john_123',
    email: 'john@example.com',
    username: 'john_doe',
    displayName: 'John Doe',
    bio: 'Passionate photographer and travel enthusiast 📸✈️',
    avatar: 'https://i.pravatar.cc/300?img=12',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    followers: 2543,
    following: 487,
    postsCount: 125,
    credits: 500,
    verified: true,
    isPrivate: false,
    createdAt: '2024-01-15T10:30:00Z',
  },
  'sarah@example.com': {
    _id: 'user_sarah_456',
    email: 'sarah@example.com',
    username: 'sarah_smith',
    displayName: 'Sarah Smith',
    bio: 'Digital artist & UI/UX designer | Creating beautiful experiences 🎨',
    avatar: 'https://i.pravatar.cc/300?img=47',
    coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200',
    followers: 3892,
    following: 621,
    postsCount: 203,
    credits: 750,
    verified: true,
    isPrivate: false,
    createdAt: '2023-11-20T14:20:00Z',
  }
};

// Additional mock users for interactions
export const additionalUsers = [
  {
    _id: 'user_alice_789',
    email: 'alice@example.com',
    username: 'alice_wonder',
    displayName: 'Alice Wonder',
    bio: 'Nature lover 🌿 | Wildlife photographer',
    avatar: 'https://i.pravatar.cc/300?img=45',
    followers: 1234,
    following: 567,
    postsCount: 89,
    verified: false,
    isPrivate: false,
  },
  {
    _id: 'user_bob_101',
    email: 'bob@example.com',
    username: 'bob_builder',
    displayName: 'Bob Builder',
    bio: 'Tech enthusiast | Code & Coffee ☕',
    avatar: 'https://i.pravatar.cc/300?img=33',
    followers: 890,
    following: 234,
    postsCount: 45,
    verified: true,
    isPrivate: false,
  },
  {
    _id: 'user_emma_202',
    email: 'emma@example.com',
    username: 'emma_watson',
    displayName: 'Emma Watson',
    bio: 'Fitness coach | Healthy lifestyle advocate 💪',
    avatar: 'https://i.pravatar.cc/300?img=48',
    followers: 5678,
    following: 890,
    postsCount: 312,
    verified: true,
    isPrivate: false,
  },
  {
    _id: 'user_david_303',
    email: 'david@example.com',
    username: 'david_jones',
    displayName: 'David Jones',
    bio: 'Food blogger | Culinary adventures 🍕',
    avatar: 'https://i.pravatar.cc/300?img=15',
    followers: 2156,
    following: 445,
    postsCount: 178,
    verified: false,
    isPrivate: false,
  },
];

// Mock Posts
export const mockPosts = [
  {
    _id: 'post_001',
    userId: 'user_john_123',
    user: mockUsers['john@example.com'],
    content: 'Just captured this stunning sunset at the beach! 🌅 Nature never ceases to amaze me.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
    ],
    likes: 342,
    comments: 28,
    shares: 12,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    tags: ['photography', 'sunset', 'beach'],
  },
  {
    _id: 'post_002',
    userId: 'user_sarah_456',
    user: mockUsers['sarah@example.com'],
    content: 'New UI design concept for a mobile banking app. What do you think? 💭',
    images: [
      'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800'
    ],
    likes: 567,
    comments: 45,
    shares: 23,
    isLiked: true,
    isSaved: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    tags: ['design', 'ui', 'mobile'],
  },
  {
    _id: 'post_003',
    userId: 'user_alice_789',
    user: additionalUsers[0],
    content: 'Early morning hike rewarded me with this incredible view! 🏔️',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    likes: 234,
    comments: 19,
    shares: 8,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    tags: ['nature', 'hiking', 'mountains'],
  },
  {
    _id: 'post_004',
    userId: 'user_bob_101',
    user: additionalUsers[1],
    content: 'Finally launched my new project! Check it out and let me know your thoughts 🚀',
    images: [],
    likes: 123,
    comments: 34,
    shares: 15,
    isLiked: true,
    isSaved: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    tags: ['tech', 'project', 'launch'],
  },
  {
    _id: 'post_005',
    userId: 'user_emma_202',
    user: additionalUsers[2],
    content: 'Morning workout complete! Remember, consistency is key 💪',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    likes: 445,
    comments: 28,
    shares: 19,
    isLiked: false,
    isSaved: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['fitness', 'workout', 'health'],
  },
  {
    _id: 'post_006',
    userId: 'user_david_303',
    user: additionalUsers[3],
    content: 'Made this delicious homemade pizza today! Recipe in comments 🍕',
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800'
    ],
    likes: 678,
    comments: 56,
    shares: 34,
    isLiked: true,
    isSaved: true,
    createdAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['food', 'cooking', 'pizza'],
  },
];

// Mock Comments
export const mockComments = {
  post_001: [
    {
      _id: 'comment_001',
      postId: 'post_001',
      userId: 'user_sarah_456',
      user: mockUsers['sarah@example.com'],
      content: 'Absolutely stunning! The colors are amazing! 😍',
      likes: 12,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'comment_002',
      postId: 'post_001',
      userId: 'user_alice_789',
      user: additionalUsers[0],
      content: 'What camera did you use?',
      likes: 5,
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    },
  ],
  post_002: [
    {
      _id: 'comment_003',
      postId: 'post_002',
      userId: 'user_john_123',
      user: mockUsers['john@example.com'],
      content: 'Love the color scheme! Very modern and clean.',
      likes: 8,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

// Mock Communities
export const mockCommunities = [
  {
    _id: 'community_001',
    name: 'Photography Enthusiasts',
    slug: 'photography-enthusiasts',
    description: 'A community for photographers to share their work and techniques',
    coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200',
    membersCount: 15234,
    postsCount: 3421,
    isJoined: true,
    isPrivate: false,
    createdBy: 'user_john_123',
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    _id: 'community_002',
    name: 'UI/UX Designers',
    slug: 'ui-ux-designers',
    description: 'Share and discuss UI/UX design trends, tips, and resources',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
    membersCount: 8932,
    postsCount: 2145,
    isJoined: true,
    isPrivate: false,
    createdBy: 'user_sarah_456',
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    _id: 'community_003',
    name: 'Travel & Adventure',
    slug: 'travel-adventure',
    description: 'Share your travel stories, photos, and adventure experiences',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
    membersCount: 22567,
    postsCount: 5632,
    isJoined: false,
    isPrivate: false,
    createdBy: 'user_alice_789',
    createdAt: '2023-12-01T00:00:00Z',
  },
  {
    _id: 'community_004',
    name: 'Tech & Innovation',
    slug: 'tech-innovation',
    description: 'Latest in technology, coding, and innovation',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    membersCount: 18765,
    postsCount: 4321,
    isJoined: false,
    isPrivate: false,
    createdBy: 'user_bob_101',
    createdAt: '2024-03-01T00:00:00Z',
  },
];

// Mock Messages
export const mockConversations = [
  {
    _id: 'conv_001',
    participants: ['user_john_123', 'user_sarah_456'],
    otherUser: mockUsers['sarah@example.com'],
    lastMessage: {
      content: 'Hey! Thanks for the feedback on my design 😊',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      senderId: 'user_sarah_456',
      read: false,
    },
    unreadCount: 2,
  },
  {
    _id: 'conv_002',
    participants: ['user_john_123', 'user_alice_789'],
    otherUser: additionalUsers[0],
    lastMessage: {
      content: 'That photo spot sounds amazing!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      senderId: 'user_alice_789',
      read: true,
    },
    unreadCount: 0,
  },
];

export const mockMessages = {
  conv_001: [
    {
      _id: 'msg_001',
      conversationId: 'conv_001',
      senderId: 'user_john_123',
      content: 'Great work on that banking app UI!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      _id: 'msg_002',
      conversationId: 'conv_001',
      senderId: 'user_sarah_456',
      content: 'Thanks John! I really appreciate it 😊',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      _id: 'msg_003',
      conversationId: 'conv_001',
      senderId: 'user_sarah_456',
      content: 'Hey! Thanks for the feedback on my design 😊',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
    },
  ],
  conv_002: [
    {
      _id: 'msg_004',
      conversationId: 'conv_002',
      senderId: 'user_john_123',
      content: 'Your nature photos are incredible!',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      _id: 'msg_005',
      conversationId: 'conv_002',
      senderId: 'user_alice_789',
      content: 'That photo spot sounds amazing!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ],
};

// Mock Notifications
export const mockNotifications = [
  {
    _id: 'notif_001',
    type: 'like',
    user: mockUsers['sarah@example.com'],
    message: 'liked your post',
    post: mockPosts[0],
    read: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    _id: 'notif_002',
    type: 'comment',
    user: additionalUsers[0],
    message: 'commented on your post',
    post: mockPosts[0],
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'notif_003',
    type: 'follow',
    user: additionalUsers[2],
    message: 'started following you',
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'notif_004',
    type: 'mention',
    user: additionalUsers[1],
    message: 'mentioned you in a post',
    post: mockPosts[3],
    read: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Stories
export const mockStories = [
  {
    _id: 'story_001',
    userId: 'user_sarah_456',
    user: mockUsers['sarah@example.com'],
    media: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800',
    type: 'image',
    caption: 'Working on something new! 🎨',
    views: 234,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'story_002',
    userId: 'user_alice_789',
    user: additionalUsers[0],
    media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    type: 'image',
    caption: 'Mountain vibes ⛰️',
    views: 156,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Credit Transactions
export const mockCreditTransactions = [
  {
    _id: 'trans_001',
    userId: 'user_john_123',
    type: 'earn',
    amount: 50,
    description: 'Daily login bonus',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'trans_002',
    userId: 'user_john_123',
    type: 'spend',
    amount: -20,
    description: 'AI image generation',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'trans_003',
    userId: 'user_john_123',
    type: 'earn',
    amount: 100,
    description: 'Post reached 1000 likes',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Analytics Data
export const mockAnalytics = {
  profileViews: [
    { date: '2026-01-01', views: 45 },
    { date: '2026-01-02', views: 52 },
    { date: '2026-01-03', views: 38 },
    { date: '2026-01-04', views: 67 },
    { date: '2026-01-05', views: 73 },
    { date: '2026-01-06', views: 89 },
    { date: '2026-01-07', views: 95 },
  ],
  postEngagement: {
    totalLikes: 3421,
    totalComments: 567,
    totalShares: 234,
    averageEngagementRate: 12.5,
  },
  followerGrowth: [
    { date: '2026-01-01', followers: 2450 },
    { date: '2026-01-02', followers: 2467 },
    { date: '2026-01-03', followers: 2489 },
    { date: '2026-01-04', followers: 2501 },
    { date: '2026-01-05', followers: 2518 },
    { date: '2026-01-06', followers: 2532 },
    { date: '2026-01-07', followers: 2543 },
  ],
  topPosts: mockPosts.slice(0, 3),
};

// Export all users combined
export const allUsers = [
  mockUsers['john@example.com'],
  mockUsers['sarah@example.com'],
  ...additionalUsers,
];
