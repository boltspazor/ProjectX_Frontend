import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import ShareModal from "./ShareModal";
import commentIcon from "../assets/comment.svg";
import messageIcon from "../assets/message.svg";
import profilePhoto from "../assets/profile-photo.jpg";
import LiveProfilePhoto from "./LiveProfilePhoto";
import { getProfileVideoUrl } from "../utils/profileVideos";

export default function PostDetailModal({ isOpen, onClose, post, onViewUserProfile }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(234);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const commentsEndRef = useRef(null);
  const commentsContainerRef = useRef(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "john_doe",
      text: "This is amazing! 🔥",
      likes: 12,
      liked: false,
      image: "https://i.pravatar.cc/100?img=20",
      time: "2h"
    },
    {
      id: 2,
      username: "jane_smith",
      text: "Love this content!",
      likes: 8,
      liked: false,
      image: "https://i.pravatar.cc/100?img=21",
      time: "1h"
    },
    {
      id: 3,
      username: "mike_ross",
      text: "Keep it up! 💪",
      likes: 15,
      liked: true,
      image: "https://i.pravatar.cc/100?img=22",
      time: "30m"
    },
  ]);

  // Sample post data if not provided
  const postImage = post?.image || "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=800&fit=crop";
  const profileImage = post?.profileImage || profilePhoto;
  const username = post?.username || "idkwhoisrahul_04";
  const caption = post?.caption || "Found that's guitar I saw last rly as a rockstar. Still waiting for my negro to learn what a Ghost is.";

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Auto-scroll to bottom when comments change
  useEffect(() => {
    if (commentsEndRef.current && commentsContainerRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

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
        username: "idkwhoisrahul_04",
        text: newComment,
        likes: 0,
        liked: false,
        image: profilePhoto,
        time: "now"
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 dark:bg-black/90 backdrop-blur-sm z-[100]"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-0 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full h-full md:h-[90vh] md:max-w-7xl bg-white dark:bg-[#0f0f0f] md:rounded-2xl overflow-hidden pointer-events-auto flex flex-col md:grid md:grid-cols-2 gap-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/80 hover:bg-black dark:bg-black/80 dark:hover:bg-black flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white dark:text-white" />
              </button>

              {/* Left Side - Post (looks exactly like PostCard) */}
              <div className="w-full h-1/2 md:h-full flex flex-col bg-gray-100 dark:bg-[#111] md:border-r border-b md:border-b-0 border-gray-300 dark:border-gray-800 overflow-hidden">
                {/* User Info Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 flex-shrink-0">
                  <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0">
                    <LiveProfilePhoto
                      imageSrc={profileImage}
                      videoSrc={getProfileVideoUrl(profileImage, username)}
                      alt="profile"
                      className="h-9 w-9 rounded-full"
                    />
                  </div>
                  <button
                    onClick={() => onViewUserProfile && onViewUserProfile(username)}
                    className="text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    {username}
                  </button>
                </div>

                {/* Post Image - Fills available space */}
                <div className="flex-1 bg-white dark:bg-black overflow-hidden flex items-center justify-center">
                  <img
                    src={postImage}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 px-4 py-3 flex-shrink-0 border-t border-gray-800">
                  <button onClick={handleLike} className="focus:outline-none">
                    <Heart
                      className={`h-6 w-6 cursor-pointer hover:scale-110 transition-all duration-200 ${liked ? "fill-red-500 text-red-500" : "text-black dark:text-white"
                        }`}
                    />
                  </button>
                  <button className="focus:outline-none">
                    <img
                      src={commentIcon}
                      alt="comment"
                      className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 invert dark:invert-0"
                    />
                  </button>
                  <button onClick={handleShareClick} className="focus:outline-none">
                    <img
                      src={messageIcon}
                      alt="share"
                      className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 invert dark:invert-0"
                    />
                  </button>
                </div>

                {/* Likes Count */}
                <div className="px-4 pb-2 flex-shrink-0">
                  <p className="text-sm font-semibold">{likes.toLocaleString()} likes</p>
                </div>

                {/* Caption */}
                <div className="px-4 pb-4 flex-shrink-0">
                  <p className="text-sm">
                    <button
                      onClick={() => onViewUserProfile && onViewUserProfile(username)}
                      className="font-semibold mr-2 hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      {username}
                    </button>
                    <span className="text-gray-700 dark:text-gray-300">{caption}</span>
                  </p>
                </div>
              </div>

              {/* Right Side - Comments Section */}
              <div className="w-full h-1/2 md:h-full flex flex-col bg-white dark:bg-[#0f0f0f] overflow-hidden">
                {/* Comments Header */}
                <div className="flex items-center justify-between p-3 md:p-5 border-b border-gray-300 dark:border-gray-800 flex-shrink-0">
                  <h3 className="text-base md:text-xl font-semibold text-black dark:text-white">Comments</h3>
                </div>

                {/* Comments List - Scrollable with fixed height */}
                <div
                  ref={commentsContainerRef}
                  className="flex-1 overflow-y-auto p-3 md:p-5 space-y-3 md:space-y-5 scrollbar-hide"
                >
                  {comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-12">
                      <p className="text-gray-400 text-center">No comments yet. Be the first to comment!</p>
                    </div>
                  ) : (
                    <>
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
                            <div className="bg-gray-200 dark:bg-[#1a1a1a] rounded-2xl px-4 py-2.5 md:px-5 md:py-3 hover:bg-gray-300 dark:hover:bg-[#1f1f1f] transition-colors">
                              <button
                                onClick={() => onViewUserProfile && onViewUserProfile(comment.username)}
                                className="font-semibold text-sm md:text-base text-black dark:text-white mb-1 hover:opacity-70 transition-opacity cursor-pointer"
                              >
                                {comment.username}
                              </button>
                              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                                {comment.text}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 md:gap-5 mt-2 px-2">
                              <button
                                onClick={() => handleLikeComment(comment.id)}
                                className="flex items-center gap-1.5 text-xs md:text-sm hover:scale-105 transition-transform group"
                              >
                                <Heart
                                  className={`h-4 w-4 md:h-5 md:w-5 transition-all group-hover:scale-110 ${comment.liked ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                                    }`}
                                />
                                <span
                                  className={comment.liked ? "text-red-500 font-semibold" : "text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"}
                                >
                                  {comment.likes > 0 ? comment.likes.toLocaleString() : "Like"}
                                </span>
                              </button>
                              <span className="text-xs md:text-sm text-gray-500">{comment.time}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {/* Invisible element to scroll to */}
                      <div ref={commentsEndRef} />
                    </>
                  )}
                </div>

                {/* Comment Input */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="border-t border-gray-300 dark:border-gray-800 p-3 md:p-5 bg-white dark:bg-[#0f0f0f] flex-shrink-0"
                >
                  <div className="flex gap-2 md:gap-4 items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-700">
                      <LiveProfilePhoto
                        imageSrc={profilePhoto}
                        videoSrc={getProfileVideoUrl(profilePhoto, "idkwhoisrahul_04")}
                        alt="Your profile"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                      />
                    </div>
                    <div className="flex-1 flex gap-2 items-center min-w-0">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
                        placeholder="Add a comment..."
                        className="flex-1 min-w-0 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-full px-3 md:px-5 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500 transition-all"
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
              </div>
            </motion.div>
          </div>

          {/* Share Modal */}
          <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} onViewUserProfile={onViewUserProfile} />
        </>
      )}
    </AnimatePresence>
  );
}