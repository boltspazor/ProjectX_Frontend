/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import Filters from "../components/Filters";
import Accounts from "../components/Accounts";
import Comments from "../components/Comments";

export default function ExplorePage({ onViewUserProfile }) {
  const [activeTab, setActiveTab] = useState("Posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activePostId, setActivePostId] = useState(null);
  const [postsComments, setPostsComments] = useState({});

  const handleCommentClick = (postId) => {
    setActivePostId(postId);
  };

  const handleCloseComments = () => {
    setActivePostId(null);
  };

  const categories = [
    "Memes",
    "Entertainment",
    "Social Media",
    "Technology",
    "Gaming",
    "Sports",
    "Music",
    "Art",
  ];

  // Handle Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchTerm);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 h-[calc(100vh-7.5rem)] md:h-[calc(100vh-4rem)]">
      {/* Filters */}
      <div onKeyPress={handleSearchKeyPress}>
        <Filters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isAIEnabled={isAIEnabled}
          setIsAIEnabled={setIsAIEnabled}
        />
      </div>

      {/* Categories Section - Only show for Posts tab */}
      {activeTab === "Posts" && (
        <div className="max-w-7xl mx-auto mb-6 md:mb-8">
          {/* Categories Title */}
          <div className="mb-4 md:mb-5">
            <h2 className="text-xl md:text-2xl font-semibold text-orange-500 mb-2">
              Categories
            </h2>
            <div className="h-0.5 w-16 md:w-20 bg-orange-500 rounded-full"></div>
          </div>

          {/* Categories Grid */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(isSelected ? null : category)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-4 md:px-6 py-2 md:py-3 rounded-xl
                    text-sm md:text-base font-medium
                    transition-all duration-200
                    ${isSelected
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/50"
                      : "bg-gray-100 dark:bg-[#1a1a1a] text-black dark:text-white border border-black dark:border-gray-700 hover:border-orange-500/50 hover:bg-gray-200 dark:hover:bg-[#222]"
                    }
                  `}
                >
                  {category}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Conditional Rendering */}
      {activeTab === "Posts" && (
        <>
          {searchQuery && (
            <h2 className="text-lg md:text-xl font-semibold mb-5 text-black dark:text-white max-w-7xl mx-auto">
              Results for <span className="text-gray-600 dark:text-gray-300">"{searchQuery}"</span>
            </h2>
          )}
          <div
            className="
              grid 
              gap-4 md:gap-8
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              max-w-7xl
              mx-auto
            "
          >
            {Array.from({ length: isAIEnabled ? 20 : 20 }).map((_, i) => (
              <PostCard
                key={i}
                postId={i}
                onCommentClick={handleCommentClick}
                isActive={activePostId === i}
                onViewUserProfile={onViewUserProfile}
              />
            ))}
          </div>

          {/* Comments Section - Overlay for both mobile and desktop */}
          <Comments
            isOpen={activePostId !== null}
            onClose={handleCloseComments}
            variant="overlay"
            initialComments={activePostId !== null ? (postsComments[activePostId] || []) : []}
            onViewUserProfile={onViewUserProfile}
          />
        </>
      )}

      {activeTab === "Accounts" && (
        <Accounts searchQuery={searchQuery} hasSearched={searchQuery !== ""} />
      )}
    </main>
  );
}