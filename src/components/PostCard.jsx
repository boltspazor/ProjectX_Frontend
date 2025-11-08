import React from "react";

import likeIcon from "../assets/like_button_icon.svg";
import commentIcon from "../assets/comment_button_svg.svg";

export default function PostCard() {
  const postImage = "src/assets/post_check_random_image.jpg"; 
  const profileImage = "https://i.pravatar.cc/100";
  const username = "thru_her_lens";

  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#111] border border-gray-800 hover:border-gray-600 transition shadow-sm">
      
      {/* Post Image */}
      <div className="w-full h-72 bg-black overflow-hidden">
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
          <img
            src={likeIcon}
            alt="like"
            className="h-5 w-5 cursor-pointer hover:opacity-80 transition"
          />
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
