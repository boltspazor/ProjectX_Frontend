import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import profilePhoto from "../assets/profile-photo.jpg";
import PostDetailModal from "../components/PostDetailModal";
import LogoutConfirmationModal from "../components/LogoutConfirmationModal";

export default function ProfilePage({ onLogout }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Sample post images - 9 posts in a 3x3 grid
  const posts = [
    {
      id: 0,
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop",
      caption: "Found that's guitar I saw last rly as a rockstar. Still waiting for my negro to learn what a Ghost is.",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      caption: "Sunset vibes 🌅",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      caption: "Palm trees and paradise",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop",
      caption: "Beach day 🏖️",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1490772888775-55fceea286b8?w=400&h=400&fit=crop",
      caption: "Breakfast of champions",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
      caption: "Mirror selfie vibes",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop",
      caption: "Cloud watching",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
      caption: "Golden hour",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      caption: "Tropical vibes",
      profileImage: profilePhoto,
      username: "idkwhoisrahul_04"
    },
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    if (onLogout) {
      onLogout();
    }
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Logout Button - Mobile Only */}
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={handleLogoutClick}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5 text-red-500" />
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
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
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
              idkwhoisrahul_04
            </motion.h2>

            {/* Full Name */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-gray-300 mb-3"
            >
              Rahul Chauhan
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white mb-6 text-sm md:text-base"
            >
              Wish I was half as interesting as my bio
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center justify-center gap-4 md:gap-6 text-base md:text-lg"
            >
              <div className="text-center">
                <p className="font-bold text-white">21</p>
                <p className="text-gray-400 text-xs md:text-sm">Posts</p>
              </div>

              <div className="h-6 w-px bg-gray-700"></div>

              <div className="text-center">
                <p className="font-bold text-white">738</p>
                <p className="text-gray-400 text-xs md:text-sm">Followers</p>
              </div>

              <div className="h-6 w-px bg-gray-700"></div>

              <div className="text-center">
                <p className="font-bold text-white">512</p>
                <p className="text-gray-400 text-xs md:text-sm">Following</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-3 gap-1 md:gap-2"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 + index * 0.03, duration: 0.4 }}
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
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}