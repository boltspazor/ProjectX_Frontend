import React, { useState } from "react";
import ShareModal from "./ShareModal";
import likeIcon from "../assets/like.svg";
import commentIcon from "../assets/comment.svg";
import messageIcon from "../assets/message.svg";
import postSampleImage from "../assets/post-sample.jpg";

export default function PostCard({ variant = "grid", postId, onCommentClick, isActive }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(234);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const postImage = postSampleImage;
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

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  // Feed variant (vertical list for Home)
  if (variant === "feed") {
    return (
      <>
        <div 
          className={`
            w-full rounded-xl overflow-hidden bg-[#111] border shadow-sm
            transition-all duration-300
            md:max-h-[700px] md:flex md:flex-col
            ${isActive ? 'border-orange-400' : 'border-gray-800'}
          `}
        >
          {/* User Info Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 flex-shrink-0">
            <img
              src={profileImage}
              alt="profile"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{username}</span>
          </div>

          {/* Post Image */}
          <div className="w-full aspect-square md:aspect-auto md:flex-1 bg-black overflow-hidden flex items-center justify-center">
            <img
              src={postImage}
              alt="post"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 px-4 py-3 flex-shrink-0">
            <button onClick={handleLike} className="focus:outline-none">
              <img
                src={likeIcon}
                alt="like"
                className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200 ${
                  liked ? 'brightness-0 saturate-100 hue-rotate-[340deg] contrast-[2]' : ''
                }`}
                style={liked ? { filter: 'invert(33%) sepia(97%) saturate(7471%) hue-rotate(348deg) brightness(96%) contrast(101%)' } : {}}
              />
            </button>
            <button onClick={handleCommentClick} className="focus:outline-none">
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
          <div className="px-4 pb-2 flex-shrink-0">
            <p className="text-sm font-semibold">{likes.toLocaleString()} likes</p>
          </div>

          {/* Caption */}
          <div className="px-4 pb-4 flex-shrink-0">
            <p className="text-sm">
              <span className="font-semibold mr-2">{username}</span>
              <span className="text-gray-300">{caption}</span>
            </p>
          </div>
        </div>

        {/* Share Modal */}
        <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
      </>
    );
  }

  // Grid variant (for Explore page)
  return (
    <>
      <div className="w-full rounded-xl overflow-hidden bg-[#111] border border-gray-800 hover:border-gray-600 transition shadow-sm">
        {/* Post Image */}
        <div className="w-full h-64 md:h-72 bg-black overflow-hidden flex items-center justify-center">
          <img
            src={postImage}
            alt="post"
            className="w-full h-full object-contain"
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
          <div className="flex items-center gap-3">
            <button onClick={handleLike} className="focus:outline-none">
              <img
                src={likeIcon}
                alt="like"
                className={`h-6 w-5 cursor-pointer hover:scale-110 transition-transform duration-200`}
                style={liked ? { filter: 'invert(33%) sepia(97%) saturate(7471%) hue-rotate(348deg) brightness(96%) contrast(101%)' } : {}}
              />
            </button>
            <button onClick={handleCommentClick} className="focus:outline-none">
              <img
                src={commentIcon}
                alt="comment"
                className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            </button>
            <button onClick={handleShareClick} className="focus:outline-none">
              <img
                src={messageIcon}
                alt="share"
                className="h-6 w-5 cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </>
  );
}
