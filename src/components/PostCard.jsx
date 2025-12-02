import React, { useState } from "react";
import { Heart } from "lucide-react";
import ShareModal from "./ShareModal";
import commentIcon from "../assets/comment.svg";
import messageIcon from "../assets/message.svg";
import postSampleImage from "../assets/post-sample.jpg";
import LiveProfilePhoto from "./LiveProfilePhoto";
import { getProfileVideoUrl } from "../utils/profileVideos";

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
            <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0">
              <LiveProfilePhoto
                imageSrc={profileImage}
                videoSrc={getProfileVideoUrl(profileImage, username)}
            alt="profile"
                className="h-9 w-9 rounded-full"
          />
            </div>
          <span className="text-sm font-medium">{username}</span>
        </div>

          {/* Post Image - 4:3 aspect ratio (Instagram standard) */}
          <div className="w-full aspect-[4/3] md:aspect-auto md:flex-1 bg-black overflow-hidden flex items-center justify-center">
          <img
            src={postImage}
            alt="post"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 px-4 py-3 flex-shrink-0">
          <button onClick={handleLike} className="focus:outline-none">
              <Heart 
                className={`h-6 w-6 cursor-pointer hover:scale-110 transition-all duration-200 ${
                  liked ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
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
        {/* Post Image - 4:3 aspect ratio (Instagram standard) */}
        <div className="w-full aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
        <img
          src={postImage}
          alt="post"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
        />
      </div>

      {/* User + Icons Row */}
      <div className="flex justify-between items-center px-3 py-3">
        {/* User Info */}
        <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full overflow-hidden flex-shrink-0">
              <LiveProfilePhoto
                imageSrc={profileImage}
                videoSrc={getProfileVideoUrl(profileImage, username)}
            alt="profile"
                className="h-7 w-7 rounded-full"
          />
            </div>
          <span className="text-sm font-medium">{username}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button onClick={handleLike} className="focus:outline-none">
              <Heart 
                className={`h-5 w-5 cursor-pointer hover:scale-110 transition-all duration-200 ${
                  liked ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
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