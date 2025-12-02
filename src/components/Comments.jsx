import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import LiveProfilePhoto from "./LiveProfilePhoto";
import { useUserProfile } from "../hooks/useUserProfile";

export default function Comments({ isOpen, onClose, variant = "sidebar", initialComments = [] }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  const { profilePhoto, profileVideo, username } = useUserProfile();

  // Reset comments when modal opens/closes or initialComments changes
  useEffect(() => {
    if (isOpen) {
      setComments(initialComments);
    }
  }, [isOpen, initialComments]);

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        username: username,
        text: newComment,
        likes: 0,
        liked: false,
        image: profilePhoto
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const renderContent = () => (
    <>
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex items-center justify-between p-4 md:p-5 border-b border-gray-800 flex-shrink-0 bg-[#0f0f0f]"
      >
        <h3 className="text-lg md:text-xl font-semibold text-white">Comments</h3>
              <button
                onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-full"
              >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
              </button>
      </motion.div>

            {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 md:space-y-5 scrollbar-hide">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <p className="text-gray-400 text-center">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <AnimatePresence>
            {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex gap-3 md:gap-4"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-700">
                <LiveProfilePhoto
                  imageSrc={comment.image}
                  videoSrc={getProfileVideoUrl(comment.image, comment.username)}
                    alt={comment.username}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                  />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-[#1a1a1a] rounded-2xl px-4 py-2.5 md:px-5 md:py-3 hover:bg-[#1f1f1f] transition-colors">
                  <p className="font-semibold text-sm md:text-base text-white mb-1">{comment.username}</p>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed break-words">{comment.text}</p>
                    </div>
                <div className="flex items-center gap-4 md:gap-5 mt-2 px-2">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center gap-1.5 text-xs md:text-sm hover:scale-105 transition-transform group"
                      >
                    <Heart 
                      className={`h-4 w-4 md:h-5 md:w-5 transition-all group-hover:scale-110 ${
                        comment.liked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                        />
                    <span className={comment.liked ? 'text-red-500 font-semibold' : 'text-gray-400 group-hover:text-gray-300'}>
                          {comment.likes > 0 ? comment.likes.toLocaleString() : 'Like'}
                        </span>
                      </button>
                  <span className="text-xs md:text-sm text-gray-500">2h</span>
                </div>
              </div>
            </motion.div>
              ))}
          </AnimatePresence>
        )}
            </div>

            {/* Comment Input */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="border-t border-gray-800 p-3 md:p-5 bg-[#0f0f0f] flex-shrink-0"
      >
        <div className="flex gap-2 md:gap-4 items-center">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-700">
            <LiveProfilePhoto
              imageSrc={profilePhoto}
              videoSrc={profileVideo}
                  alt="Your profile"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
          </div>
          <div className="flex-1 flex gap-2 items-center min-w-0">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                    placeholder="Add a comment..."
              className="flex-1 min-w-0 bg-[#1a1a1a] border border-gray-700 text-white rounded-full px-3 md:px-5 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500 transition-all"
                  />
            <motion.button
                    onClick={handleSendComment}
                    disabled={!newComment.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 md:px-6 py-2 md:py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:hover:bg-gray-700 rounded-full text-xs md:text-base font-semibold transition-colors text-white flex-shrink-0"
                  >
                    Send
            </motion.button>
                </div>
              </div>
      </motion.div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile and desktop (when variant is overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] ${variant === "sidebar" ? "md:hidden" : ""}`}
            onClick={onClose}
          />

          {/* Comments Panel - Mobile: Slide from bottom (Instagram style) */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              mass: 0.8
            }}
            className="md:hidden fixed bottom-0 left-0 right-0 h-[85vh] bg-[#0f0f0f] border-t border-gray-800 rounded-t-3xl flex flex-col z-[60] shadow-2xl"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
            </div>
            {renderContent()}
          </motion.div>

          {/* Comments Panel - Desktop Sidebar: Fade in with scale (only for sidebar variant) */}
          {variant === "sidebar" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 250,
                mass: 0.6
              }}
              className="hidden md:flex relative h-auto max-h-[calc(100vh-6rem)] w-full min-w-[400px] max-w-[450px] bg-[#0f0f0f] border border-gray-800 rounded-xl flex-col z-auto shadow-2xl"
            >
              {renderContent()}
            </motion.div>
          )}

          {/* Comments Panel - Desktop Overlay: Centered modal (only for overlay variant) */}
          {variant === "overlay" && (
            <div className="hidden md:flex fixed inset-0 z-[60] items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 300,
                  mass: 0.8
                }}
                className="w-full max-w-[500px] h-auto max-h-[85vh] bg-[#0f0f0f] border border-gray-800 rounded-2xl flex flex-col shadow-2xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {renderContent()}
              </motion.div>
            </div>
          )}
          </>
        )}
    </AnimatePresence>
  );
}