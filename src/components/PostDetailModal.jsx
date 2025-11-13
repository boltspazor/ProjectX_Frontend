import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import ShareModal from "./ShareModal";
import commentIcon from "../assets/comment.svg";
import messageIcon from "../assets/message.svg";
import profilePhoto from "../assets/profile-photo.jpg";

export default function PostDetailModal({ isOpen, onClose, post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(234);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
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
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl max-h-[90vh] bg-[#111] rounded-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Post Image */}
              <div className="w-full md:w-1/2 bg-black flex items-center justify-center aspect-[4/3] md:aspect-auto md:h-full min-h-[300px] max-h-[70vh] md:max-h-full">
                <img
                  src={postImage}
                  alt="Post"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Post Details */}
              <div className="w-full md:w-1/2 flex flex-col bg-[#111] max-h-[70vh] md:max-h-full">
                {/* User Info Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 flex-shrink-0">
                  <img
                    src={profileImage}
                    alt="profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold">{username}</span>
                </div>

                {/* Comments Section - Scrollable */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  {/* Caption */}
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-sm">
                      <span className="font-semibold mr-2">{username}</span>
                      <span className="text-gray-300">{caption}</span>
                    </p>
                  </div>

                  {/* Comments */}
                  <div className="px-4 py-4 space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <img
                          src={comment.image}
                          alt={comment.username}
                          className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold mr-2">{comment.username}</span>
                            <span className="text-gray-300">{comment.text}</span>
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">{comment.time}</span>
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="text-xs text-gray-500 hover:text-white transition-colors"
                            >
                              {comment.liked ? "Liked" : "Like"}
                            </button>
                            <button className="text-xs text-gray-500 hover:text-white transition-colors">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-800 flex-shrink-0">
                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 px-4 py-3">
                    <button onClick={handleLike} className="focus:outline-none">
                      <Heart
                        className={`h-6 w-6 cursor-pointer hover:scale-110 transition-all duration-200 ${
                          liked ? "fill-red-500 text-red-500" : "text-white"
                        }`}
                      />
                    </button>
                    <button className="focus:outline-none">
                      <img
                        src={commentIcon}
                        alt="comment"
                        className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200"
                      />
                    </button>
                    <button onClick={handleShareClick} className="focus:outline-none">
                      <img
                        src={messageIcon}
                        alt="share"
                        className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200"
                      />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <div className="px-4 pb-2">
                    <p className="text-sm font-semibold">{likes.toLocaleString()} likes</p>
                  </div>

                  {/* Comment Input */}
                  <div className="px-4 pb-4 border-t border-gray-800 pt-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                        placeholder="Add a comment..."
                        className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                      />
                      <button
                        onClick={handleSendComment}
                        disabled={!newComment.trim()}
                        className="text-sm text-orange-500 font-semibold hover:text-orange-400 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Share Modal */}
          <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
        </>
      )}
    </AnimatePresence>
  );
}