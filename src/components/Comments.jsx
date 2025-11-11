import React, { useState } from "react";
import likeIcon from "../assets/like.svg";

export default function Comments({ isOpen, onClose }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "john_doe",
      text: "This is amazing! 🔥",
      likes: 12,
      liked: false,
      image: "https://i.pravatar.cc/100?img=20"
    },
    {
      id: 2,
      username: "jane_smith",
      text: "Love this content!",
      likes: 8,
      liked: false,
      image: "https://i.pravatar.cc/100?img=21"
    },
    {
      id: 3,
      username: "mike_ross",
      text: "Keep it up! 💪",
      likes: 15,
      liked: true,
      image: "https://i.pravatar.cc/100?img=22"
    },
    {
      id: 4,
      username: "adarsh_69",
      text: "Keep it up! 💪",
      likes: 257,
      liked: false,
      image: "https://i.pravatar.cc/100?img=22"
    }
  ]);

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
        image: "https://i.pravatar.cc/100?img=30"
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Comments Panel */}
      <div
        className={`
          fixed md:relative
          top-0 md:top-0
          right-0 md:right-auto
          h-full md:h-auto
          bg-[#0f0f0f]
          border border-gray-800
          rounded-xl
          flex flex-col
          z-50 md:z-auto
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 w-full md:w-full' : 'translate-x-full md:translate-x-0 w-0 md:w-0'}
        `}
      >
        {isOpen && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold">Comments</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition text-2xl"
              >
                ×
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px] md:max-h-[600px]">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.image}
                    alt={comment.username}
                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                  />
                  <div className="flex-1">
                    <div className="bg-[#1a1a1a] rounded-2xl px-4 py-2">
                      <p className="font-semibold text-sm">{comment.username}</p>
                      <p className="text-sm text-gray-300">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 px-2">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center gap-1 text-xs hover:scale-105 transition-transform"
                      >
                        <img
                          src={likeIcon}
                          alt="like"
                          className="h-4 w-4"
                          style={comment.liked ? { filter: 'invert(33%) sepia(97%) saturate(7471%) hue-rotate(348deg) brightness(96%) contrast(101%)' } : {}}
                        />
                        <span className={comment.liked ? 'text-red-500 font-semibold' : 'text-gray-400'}>
                          {comment.likes > 0 ? comment.likes.toLocaleString() : 'Like'}
                        </span>
                      </button>
                      <span className="text-xs text-gray-500">2h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="border-t border-gray-800 p-4">
              <div className="flex gap-3 items-center">
                <img
                  src="https://i.pravatar.cc/100?img=30"
                  alt="Your profile"
                  className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                    placeholder="Add a comment..."
                    className="flex-1 bg-[#2b2a2a] text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    onClick={handleSendComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full text-sm font-semibold transition"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
