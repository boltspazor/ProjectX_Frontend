import React, { useState } from "react";

import likeIcon from "../assets/like_button_icon.svg";
import commentIcon from "../assets/comment_button_svg.svg";

export default function PostCard({ variant = "grid", postId, onCommentClick, isActive }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(234);

  const postImage = "src/assets/post_check_random_image.jpg";
  const profileImage = "https://i.pravatar.cc/100";
  const username = "sheryanne_xoxo";
  const caption = "Found that's guitar I saw last rly as a rockstar. Still waiting for my negro to learn what a Ghost is.";

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleCommentClick = () => {
    if (onCommentClick && postId !== undefined) {
      onCommentClick(postId);
    }
  };

  // Feed variant (vertical list for Home)
  if (variant === "feed") {
    return (
      <div 
        className={`
          w-full rounded-xl overflow-hidden bg-[#111] border shadow-sm
          transition-all duration-300
          ${isActive ? 'border-purple-400' : 'border-gray-800'}
        `}
      >

        {/* User Info Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
          <img
            src={profileImage}
            alt="profile"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{username}</span>
        </div>

        {/* Post Image */}
        <div className="w-full aspect-square bg-black overflow-hidden">
          <img
            src={postImage}
            alt="post"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 px-4 py-3">
          <button onClick={handleLike} className="focus:outline-none">
            <img
              src={likeIcon}
              alt="like"
              className={`h-6 w-6 cursor-pointer hover:opacity-80 transition ${liked ? 'opacity-100' : 'opacity-70'}`}
            />
          </button>
          <button onClick={handleCommentClick} className="focus:outline-none">
            <img
              src={commentIcon}
              alt="comment"
              className="h-6 w-6 cursor-pointer hover:opacity-80 transition"
            />
          </button>
        </div>

        {/* Likes Count */}
        <div className="px-4 pb-2">
          <p className="text-sm font-semibold">{likes} likes</p>
        </div>

        {/* Caption */}
        <div className="px-4 pb-4">
          <p className="text-sm">
            <span className="font-semibold mr-2">{username}</span>
            <span className="text-gray-300">{caption}</span>
          </p>
        </div>
      </div>
    );
  }

  // Grid variant (for Explore page)
  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#111] border border-gray-800 hover:border-gray-600 transition shadow-sm">

      {/* Post Image */}
      <div className="w-full h-64 md:h-72 bg-black overflow-hidden">
        <img
          src={postImage}
          alt="post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User + Icons Row */}
      <div className="flex justify-between items-center px-3 py-3">

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="profile"
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{username}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="focus:outline-none">
            <img
              src={likeIcon}
              alt="like"
              className={`h-5 w-5 cursor-pointer hover:opacity-80 transition ${liked ? 'opacity-100' : 'opacity-70'}`}
            />
          </button>
          <img
            src={commentIcon}
            alt="comment"
            className="h-5 w-5 cursor-pointer hover:opacity-80 transition"
          />
        </div>

      </div>
    </div>
  );
}