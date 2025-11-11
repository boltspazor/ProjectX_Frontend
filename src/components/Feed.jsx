import React, { useState } from "react";
import PostCard from "./PostCard";
import Filters from "./Filters";
import Accounts from "./Accounts";
import Communities from "./Communities";

export default function Feed() {
  const [activeTab, setActiveTab] = useState("Posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAIEnabled, setIsAIEnabled] = useState(false);

  // Handle Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchTerm);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
      {/* Filters */}
      <div onKeyPress={handleSearchKeyPress}>
        <Filters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isAIEnabled={isAIEnabled}
          setIsAIEnabled={setIsAIEnabled}
        />
      </div>

      {/* Conditional Rendering */}
      {activeTab === "Posts" && (
        <>
          {searchQuery && (
            <h2 className="text-lg md:text-xl font-semibold mb-5 text-white max-w-7xl mx-auto">
              Results for <span className="text-gray-300">"{searchQuery}"</span>
            </h2>
          )}
          <div
            className="
              grid 
              gap-4 md:gap-8
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              max-w-7xl
              mx-auto
            "
          >
            {Array.from({ length: isAIEnabled ? 20 : 20 }).map((_, i) => (
              <PostCard key={i} />
            ))}
          </div>
        </>
      )}

      {activeTab === "Accounts" && (
        <Accounts searchQuery={searchQuery} hasSearched={searchQuery !== ""} />
      )}

      {activeTab === "Communities" && (
        <Communities searchQuery={searchQuery} hasSearched={searchQuery !== ""} />
      )}
    </main>
  );
}
