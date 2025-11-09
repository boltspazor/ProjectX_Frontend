import React, { useState } from "react";
import Stories from "./Stories";
import PostCard from "./PostCard";
import Comments from "./Comments";

export default function Home() {
  const [activePostId, setActivePostId] = useState(null);

  const handleCommentClick = (postId) => {
    setActivePostId(postId);
  };

  const handleCloseComments = () => {
    setActivePostId(null);
  };

  return (
    <main className="flex-1 overflow-y-auto h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
      {/* Stories Section */}
      <Stories />

      {/* Posts Section with Comments */}
      <div className="flex h-[calc(100%-88px)]">
        {/* Posts Container */}
        <div
          className={`
            transition-all duration-300 ease-in-out
            ${activePostId ? 'w-full md:w-[calc(100%-384px)]' : 'w-full'}
            overflow-y-auto
          `}
        >
          <div className="p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <PostCard
                  key={i}
                  postId={i}
                  variant="feed"
                  onCommentClick={handleCommentClick}
                  isActive={activePostId === i}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <Comments isOpen={activePostId !== null} onClose={handleCloseComments} />
      </div>
    </main>
  );
}