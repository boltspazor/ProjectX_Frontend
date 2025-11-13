import React from "react";
import { motion } from "framer-motion";
import profilePhoto from "../assets/profile-photo.jpg";

export default function ProfilePage() {
  // Sample post images - 9 posts in a 3x3 grid
  const posts = [
    "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop", // Sky with bird
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", // Car with sunset
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop", // Palm trees sunset
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop", // Beach sunset
    "https://images.unsplash.com/photo-1490772888775-55fceea286b8?w=400&h=400&fit=crop", // Food/coffee
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop", // Mirror selfie
    "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop", // Clouds
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop", // Bridge sunset
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop", // Palm trees
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
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
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 + index * 0.03, duration: 0.4 }}
              className="aspect-square overflow-hidden bg-gray-900 cursor-pointer group"
            >
              <img
                src={post}
                alt={`Post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
