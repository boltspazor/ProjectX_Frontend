import React, { useState } from "react";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";
import Comments from "../components/Comments";

export default function HomePage({ setActiveView, onViewUserProfile }) {
  const [activePostId, setActivePostId] = useState(null);
  const [postsComments, setPostsComments] = useState({
    0: [
      { id: 1, username: "john_doe", text: "Great post!", likes: 5, liked: false, image: "https://i.pravatar.cc/100?img=1" },
      { id: 2, username: "jane_smith", text: "Love this!", likes: 3, liked: false, image: "https://i.pravatar.cc/100?img=2" },
    ],
    1: [
      { id: 1, username: "mike_wilson", text: "Amazing content!", likes: 8, liked: false, image: "https://i.pravatar.cc/100?img=3" },
    ],
    2: [],
    3: [],
  });

  const handleCommentClick = (postId) => {
    setActivePostId(postId);
  };

  const handleCloseComments = () => {
    setActivePostId(null);
  };

  const handleAddStory = () => {
    if (setActiveView) {
      setActiveView("addStory");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto h-[calc(100vh-7.5rem)] md:h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-8">
        {/* Stories Section - Centered */}
        <div className="w-full flex justify-center mb-6">
          <Stories onAddStory={handleAddStory} />
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
                onViewUserProfile={onViewUserProfile}
              />
            ))}
          </div>

          {/* Comments Section - Desktop only, side by side */}
          <div className="hidden md:block sticky top-0 h-fit">
            <Comments
              isOpen={activePostId !== null}
              onClose={handleCloseComments}
              initialComments={activePostId !== null ? (postsComments[activePostId] || []) : []}
              onViewUserProfile={onViewUserProfile}
            />
          </div>

          {/* Comments Section - Mobile only, overlay */}
          <div className="md:hidden">
            <Comments
              isOpen={activePostId !== null}
              onClose={handleCloseComments}
              initialComments={activePostId !== null ? (postsComments[activePostId] || []) : []}
              onViewUserProfile={onViewUserProfile}
            />
          </div>
        </div>
      </div>
    </main>
  );
}