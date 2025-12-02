import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import PostDetailModal from "../components/PostDetailModal";
import LiveProfilePhoto from "../components/LiveProfilePhoto";
import { getProfileVideoUrl } from "../utils/profileVideos";

export default function OtherUserProfilePage({ username: viewedUsername, setActiveView, onViewUserProfile }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Sample user data - in a real app, this would be fetched based on username
  const userData = {
    username: viewedUsername || "sheryanne_xoxo",
    fullName: "Sheryanne Smith",
    bio: "Living life one adventure at a time 🌍✨",
    profilePhoto: "https://i.pravatar.cc/200",
    profileVideo: getProfileVideoUrl("https://i.pravatar.cc/200", viewedUsername || "sheryanne_xoxo"),
    posts: 9,
    followers: 738,
    following: 512,
  };

  // Sample posts data - in a real app, this would be fetched from backend filtered by username
  // For now, we create sample posts for the viewed user
  const allSamplePosts = [
    {
      id: 0,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop",
      caption: "Found that's guitar I saw last rly as a rockstar. Still waiting for my negro to learn what a Ghost is.",
      profileImage: "https://i.pravatar.cc/200",
    },
    {
      id: 1,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      caption: "Sunset vibes 🌅",
      profileImage: "https://i.pravatar.cc/200",
    },
    {
      id: 2,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      caption: "Palm trees and paradise",
      profileImage: "https://i.pravatar.cc/200",
    },
    {
      id: 3,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop",
      caption: "Beach day 🏖️",
      profileImage: "https://i.pravatar.cc/200",
    },
    {
      id: 4,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1490772888775-55fceea286b8?w=400&h=400&fit=crop",
      caption: "Breakfast of champions",
      profileImage: "https://i.pravatar.cc/200",
    },
    {
      id: 5,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
      caption: "Mirror selfie vibes",
      profileImage: "https://i.pravatar.cc/200",
    },
    {
      id: 6,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop",
      caption: "Cloud watching",
      profileImage: "https://i.pravatar.cc/200",
    },
    {
      id: 7,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
      caption: "Golden hour",
      profileImage: "https://i.pravatar.cc/200",
    },
    {
      id: 8,
      username: "sheryanne_xoxo",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      caption: "Tropical vibes",
      profileImage: "https://i.pravatar.cc/200",
    },
    // Sample posts for other users (these won't show for sheryanne_xoxo)
    {
      id: 100,
      username: "john_doe",
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop",
      caption: "Different user post",
      profileImage: "https://i.pravatar.cc/100?img=1",
    },
  ];

  // Filter posts to show only posts by this user
  const posts = allSamplePosts
    .filter(post => post.username === userData.username)
    .map(post => ({
      ...post,
      profileImage: userData.profilePhoto,
    }));

  // Update posts count based on filtered posts
  userData.posts = posts.length;

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // In a real app, this would make an API call to follow/unfollow
  };

  const handleMessage = () => {
    // Navigate to messages page and open chat with this user
    if (setActiveView) {
      const usernameToMessage = viewedUsername || userData.username;
      setActiveView("messages", null, null, usernameToMessage);
    }
  };

  const handleBack = () => {
    if (setActiveView) {
      setActiveView("home");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            title="Back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-800"
          >
            <LiveProfilePhoto
              imageSrc={userData.profilePhoto}
              videoSrc={userData.profileVideo}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </motion.div>

          {/* Profile Details */}
          <div className="flex flex-col items-center text-center w-full">
            {/* Username */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xl md:text-2xl font-semibold text-white mb-2"
            >
              {userData.username}
            </motion.h2>

            {/* Full Name */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-gray-300 mb-3"
            >
              {userData.fullName}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white mb-6 text-sm md:text-base"
            >
              {userData.bio}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center justify-center gap-4 md:gap-6 text-base md:text-lg mb-6"
            >
              <div className="text-center">
                <p className="font-bold text-white">{userData.posts}</p>
                <p className="text-gray-400 text-xs md:text-sm">Posts</p>
              </div>

              <div className="h-6 w-px bg-gray-700"></div>

              <div className="text-center">
                <p className="font-bold text-white">{userData.followers}</p>
                <p className="text-gray-400 text-xs md:text-sm">Followers</p>
              </div>

              <div className="h-6 w-px bg-gray-700"></div>

              <div className="text-center">
                <p className="font-bold text-white">{userData.following}</p>
                <p className="text-gray-400 text-xs md:text-sm">Following</p>
              </div>
            </motion.div>

            {/* Follow and Message Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3 w-full max-w-md px-4"
            >
              <button
                onClick={handleFollow}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  isFollowing
                    ? "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button
                onClick={handleMessage}
                className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Message
              </button>
            </motion.div>
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="grid grid-cols-3 gap-1 md:gap-2"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.03, duration: 0.4 }}
              onClick={() => handlePostClick(post)}
              className="aspect-square overflow-hidden bg-gray-900 cursor-pointer group"
            >
              <img
                src={post.image}
                alt={`Post ${post.id + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
        onViewUserProfile={onViewUserProfile}
      />
    </div>
  );
}

