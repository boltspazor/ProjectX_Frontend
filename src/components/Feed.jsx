import React from "react";
import PostCard from "./PostCard";

export default function Feed() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
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
    </main>
  );
}
