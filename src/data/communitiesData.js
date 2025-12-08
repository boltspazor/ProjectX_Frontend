// Shared community data structure
// In production, this would come from an API or database

export const communitiesData = [
  {
    id: 1,
    name: "Music Lovers",
    description: "Weekly jam sessions, playlist drops, and gear swaps. Join us for live music discussions and share your favorite tracks!",
    members: "2.3K members",
    followers: "2.3K",
    contributors: "180",
    cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    avatar: "https://i.pravatar.cc/100?img=50",
    icon: "https://i.pravatar.cc/100?img=50",
    badges: ["Live Sessions", "Events"],
    createdDate: "Jan 15, 2020",
    type: "Public",
    topics: ["Rock", "Jazz", "Electronic", "Live Performances"],
    moderators: [
      { id: 1, username: "music_mod1", avatar: "https://i.pravatar.cc/100?img=1" },
      { id: 2, username: "music_mod2", avatar: "https://i.pravatar.cc/100?img=2" },
      { id: 3, username: "music_mod3", avatar: "https://i.pravatar.cc/100?img=3" },
    ],
    rules: [
      "Share your favorite music discoveries",
      "Be respectful of different music tastes",
      "No pirated content",
      "Keep discussions relevant to music",
    ],
    posts: [
      {
        id: 1,
        username: "dj_producer",
        avatar: "https://i.pravatar.cc/100?img=20",
        title: "What's your favorite album of 2024?",
        content: "I've been diving deep into some amazing releases this year. What albums have blown you away? Looking for recommendations!",
        likes: 120,
        comments: 45,
      },
      {
        id: 2,
        username: "guitar_lover",
        avatar: "https://i.pravatar.cc/100?img=21",
        title: "Best guitar for beginners?",
        content: "Looking to pick up guitar for the first time. Any recommendations for a good starter instrument? Budget is around $300.",
        likes: 89,
        comments: 32,
      },
    ],
  },
  {
    id: 2,
    name: "Tech Enthusiasts",
    description: "Build, break, and ship together with the latest in tech. Share your projects, get help, and discuss the future of technology.",
    members: "5.1K members",
    followers: "5.1K",
    contributors: "420",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    avatar: "https://i.pravatar.cc/100?img=51",
    icon: "https://i.pravatar.cc/100?img=51",
    badges: ["Hackathons", "AI"],
    createdDate: "Mar 22, 2019",
    type: "Public",
    topics: ["Programming", "AI/ML", "Web Development", "Mobile Apps"],
    moderators: [
      { id: 1, username: "tech_mod1", avatar: "https://i.pravatar.cc/100?img=4" },
      { id: 2, username: "tech_mod2", avatar: "https://i.pravatar.cc/100?img=5" },
      { id: 3, username: "tech_mod3", avatar: "https://i.pravatar.cc/100?img=6" },
      { id: 4, username: "tech_mod4", avatar: "https://i.pravatar.cc/100?img=7" },
    ],
    rules: [
      "Share your projects and code",
      "Be helpful and supportive",
      "No spam or self-promotion",
      "Keep discussions technical and relevant",
    ],
    posts: [
      {
        id: 1,
        username: "code_wizard",
        avatar: "https://i.pravatar.cc/100?img=22",
        title: "React vs Vue vs Angular in 2024?",
        content: "Starting a new project and can't decide which framework to use. What are your thoughts on the current state of these frameworks?",
        likes: 234,
        comments: 78,
      },
      {
        id: 2,
        username: "ai_researcher",
        avatar: "https://i.pravatar.cc/100?img=23",
        title: "Best resources for learning machine learning?",
        content: "I'm new to ML and looking for quality resources. Any courses, books, or tutorials you'd recommend?",
        likes: 156,
        comments: 42,
      },
    ],
  },
  {
    id: 3,
    name: "Photography Club",
    description: "Share your shots, get feedback, and plan photo walks. A community for photographers of all skill levels.",
    members: "1.8K members",
    followers: "1.8K",
    contributors: "95",
    cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    avatar: "https://i.pravatar.cc/100?img=52",
    icon: "https://i.pravatar.cc/100?img=52",
    badges: ["Critique", "Workshops"],
    createdDate: "Aug 10, 2021",
    type: "Public",
    topics: ["Portrait", "Landscape", "Street Photography", "Wildlife"],
    moderators: [
      { id: 1, username: "photo_mod1", avatar: "https://i.pravatar.cc/100?img=8" },
      { id: 2, username: "photo_mod2", avatar: "https://i.pravatar.cc/100?img=9" },
    ],
    rules: [
      "Share your best work",
      "Provide constructive feedback",
      "Credit original photographers",
      "Respect copyright and privacy",
    ],
    posts: [
      {
        id: 1,
        username: "lens_master",
        avatar: "https://i.pravatar.cc/100?img=24",
        title: "Tips for shooting in low light?",
        content: "I'm struggling with getting good shots in low light conditions. Any tips on settings, equipment, or techniques?",
        likes: 67,
        comments: 23,
      },
    ],
  },
  {
    id: 4,
    name: "Design Playground",
    description: "UI drops, Figma files, and daily inspiration threads. Share your designs and get feedback from fellow designers.",
    members: "3.4K members",
    followers: "3.4K",
    contributors: "210",
    cover: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    avatar: "https://i.pravatar.cc/100?img=53",
    icon: "https://i.pravatar.cc/100?img=53",
    badges: ["Figma", "Inspiration"],
    createdDate: "Nov 5, 2018",
    type: "Public",
    topics: ["UI Design", "UX Research", "Typography", "Color Theory"],
    moderators: [
      { id: 1, username: "design_mod1", avatar: "https://i.pravatar.cc/100?img=10" },
      { id: 2, username: "design_mod2", avatar: "https://i.pravatar.cc/100?img=11" },
      { id: 3, username: "design_mod3", avatar: "https://i.pravatar.cc/100?img=12" },
    ],
    rules: [
      "Share your design work",
      "Be constructive in feedback",
      "Credit design inspiration",
      "No plagiarism",
    ],
    posts: [
      {
        id: 1,
        username: "ui_designer",
        avatar: "https://i.pravatar.cc/100?img=25",
        title: "Best practices for mobile app design?",
        content: "Working on my first mobile app design. What are some key principles I should keep in mind?",
        likes: 98,
        comments: 34,
      },
    ],
  },
];

// Get community by ID
export const getCommunityById = (id) => {
  return communitiesData.find((community) => community.id === id);
};

// Add new community
export const addCommunity = (communityData) => {
  const newId = Math.max(...communitiesData.map((c) => c.id), 0) + 1;
  // Generate unique community code
  const communityCode = `COMM${newId.toString().padStart(6, '0')}`;
  const newCommunity = {
    id: newId,
    ...communityData,
    code: communityCode,
    followers: "0",
    contributors: "0",
    createdDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    members: "0 members",
    posts: [],
    moderators: [],
  };
  communitiesData.push(newCommunity);
  return newCommunity;
};

// Add post to community
export const addPostToCommunity = (communityId, postData) => {
  const community = getCommunityById(communityId);
  if (!community) return null;
  
  if (!community.posts) {
    community.posts = [];
  }
  
  const newPostId = Math.max(...community.posts.map((p) => p.id || 0), 0) + 1;
  const newPost = {
    id: newPostId,
    ...postData,
    likes: postData.likes || 0,
    comments: postData.comments || 0,
    commentsList: postData.commentsList || [],
    liked: false,
  };
  
  community.posts.push(newPost);
  return newPost;
};