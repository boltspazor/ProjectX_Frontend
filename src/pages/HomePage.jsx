import React, { useState } from "react";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";
import Comments from "../components/Comments";

export default function HomePage() {
  const [activePostId, setActivePostId] = useState(null);

  const handleCommentClick = (postId) => {
    setActivePostId(postId);
  };

  const handleCloseComments = () => {
    setActivePostId(null);
  };

  return (
    <main className="flex-1 overflow-y-auto h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
      <div className="p-4 md:p-8">
        {/* Stories Section */}
        <div className="max-w-full mx-auto mb-6">
          <Stories />
        </div>

        {/* Posts Section with Comments */}
        <div className={`max-w-2xl mx-auto transition-all duration-300 ${activePostId !== null ? 'md:max-w-none md:grid md:grid-cols-2 md:gap-6' : ''}`}>
          {/* Posts Container */}
          <div className="space-y-6">
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

          {/* Comments Section - Desktop only, side by side */}
          {activePostId !== null && (
            <div className="hidden md:block sticky top-0 h-fit">
              <Comments isOpen={activePostId !== null} onClose={handleCloseComments} />
            </div>
          )}

          {/* Comments Section - Mobile only, overlay */}
          <div className="md:hidden">
            <Comments isOpen={activePostId !== null} onClose={handleCloseComments} />
          </div>
        </div>
      </div>
    </main>
  );
}
