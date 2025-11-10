import React, { useState } from "react";
import PostCard from "./PostCard";
import Filters from "./Filters";
import Accounts from "./Accounts";

export default function Feed() {
  const [activeTab, setActiveTab] = useState("Posts");
  const [searchTerm, setSearchTerm] = useState(""); // 👈 added state for search

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
      {/* Filters */}
      <Filters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} // 👈 pass setter function
      />

      {/* Conditional Rendering */}
      {activeTab === "Posts" && (
        <div
          className="
            grid 
            gap-4 md:gap-8
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            max-w-7xl
            mx-auto
          "
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <PostCard key={i} />
          ))}
        </div>
      )}

      {activeTab === "Accounts" && (
        <Accounts searchQuery={searchTerm || "Explore"} /> // 👈 pass the term
      )}

      {activeTab === "Communities" && (
        <div className="text-gray-400 text-center mt-10">
          <p>Communities section will appear here.</p>
        </div>
      )}
    </main>
  );
}
