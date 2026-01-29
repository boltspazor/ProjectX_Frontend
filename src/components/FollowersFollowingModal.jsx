import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LiveProfilePhoto from "./LiveProfilePhoto";
import { getProfileVideoUrl } from "../utils/profileVideos";

export default function FollowersFollowingModal({
  isOpen,
  onClose,
  type, // "followers" or "following"
  followersList = [],
  followingList = [],
  onFollow,
  onUnfollow,
  onViewUserProfile,
  currentUsername
}) {
  const [activeTab, setActiveTab] = useState(type || "followers");

  // Set active tab based on type prop
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleFollow = (user) => {
    if (onFollow) {
      const userId = user.uid || user.id;
      onFollow(userId, user.username);
    }
  };

  const handleUnfollow = (user) => {
    if (onUnfollow) {
      const userId = user.uid || user.id;
      onUnfollow(userId, user.username);
    }
  };

  const currentList = activeTab === "followers" ? followersList : followingList;
  const listTitle = activeTab === "followers" ? "Followers" : "Following";

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 dark:bg-black/70 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
              className="w-full max-w-[400px] sm:max-w-[420px] h-auto max-h-[85vh] bg-[#fffcfa] dark:bg-[#0f0f0f] border-2 border-black dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-black dark:border-gray-800 flex-shrink-0">
                <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">{listTitle}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-black dark:border-gray-800">
                <button
                  onClick={() => setActiveTab("followers")}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "followers"
                    ? "text-black dark:text-white border-b-2 border-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-gray-300"
                    }`}
                >
                  Followers
                </button>
                <button
                  onClick={() => setActiveTab("following")}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "following"
                    ? "text-black dark:text-white border-b-2 border-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-gray-300"
                    }`}
                >
                  Following
                </button>
              </div>

              {/* Users List */}
              <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1"
                  >
                    {currentList.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4">
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                          {activeTab === "followers"
                            ? "No followers yet"
                            : "Not following anyone yet"}
                        </p>
                      </div>
                    ) : (
                      currentList.map((user, index) => (
                        <motion.div
                          key={user.username || user.id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03, duration: 0.3 }}
                          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-secondary-50 dark:hover:bg-[#1a1a1a] transition-colors"
                        >
                          {/* Profile Picture */}
                          <button
                            onClick={() => {
                              if (onViewUserProfile && user.username !== currentUsername) {
                                onViewUserProfile(user.username);
                                onClose();
                              }
                            }}
                            className="flex-shrink-0"
                          >
                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden">
                              <LiveProfilePhoto
                                imageSrc={user.profilePhoto || user.image || user.avatar}
                                videoSrc={getProfileVideoUrl(user.profilePhoto || user.image || user.avatar, user.username)}
                                alt={user.username}
                                className="w-11 h-11 md:w-12 md:h-12 rounded-full"
                              />
                            </div>
                          </button>

                          {/* User Info */}
                          <div className="flex-1 min-w-0">
                            <button
                              onClick={() => {
                                if (onViewUserProfile && user.username !== currentUsername) {
                                  onViewUserProfile(user.username);
                                  onClose();
                                }
                              }}
                              className="text-left w-full"
                            >
                              <p className="font-semibold text-sm md:text-base text-black dark:text-white truncate hover:opacity-70 transition-opacity">
                                {user.username}
                              </p>
                              {(user.displayName || user.fullName) && (
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">
                                  {user.displayName || user.fullName}
                                </p>
                              )}
                            </button>
                          </div>

                          {/* Follow/Unfollow Button - Don't show for current user */}
                          {user.username !== currentUsername && (
                            <button
                              onClick={() => {
                                if (user.isFollowing) {
                                  handleUnfollow(user);
                                } else {
                                  handleFollow(user);
                                }
                              }}
                              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${user.isFollowing
                                ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 border border-gray-400 dark:border-gray-700"
                                : "bg-gradient-to-r from-primary-400 via-primary to-primary-700 text-white hover:from-primary hover:via-primary-700 hover:to-primary-800"
                                }`}
                            >
                              {user.isFollowing ? "Following" : "Follow"}
                            </button>
                          )}
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  // Use portal to render at body level
  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}