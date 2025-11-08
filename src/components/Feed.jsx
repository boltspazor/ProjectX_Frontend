import React from "react";
import PostCard from "./PostCard";

export default function Feed() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div
        className="
          grid 
          gap-8
          grid-flow-row
          auto-rows-max
          justify-center
          [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]
        "
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <PostCard key={i} />
        ))}
      </div>
    </main>
  );
}
