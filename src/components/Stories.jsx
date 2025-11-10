import React from "react";

export default function Stories() {
  const stories = [
    { id: 1, username: "samad_123", image: "https://i.pravatar.cc/100?img=1" },
    { id: 2, username: "samad_123", image: "https://i.pravatar.cc/100?img=2" },
    { id: 3, username: "samad_123", image: "https://i.pravatar.cc/100?img=3" },
    { id: 4, username: "samad_123", image: "https://i.pravatar.cc/100?img=4" },
    { id: 5, username: "samad_123", image: "https://i.pravatar.cc/100?img=5" },
    { id: 6, username: "samad_123", image: "https://i.pravatar.cc/100?img=6" },
    { id: 7, username: "samad_123", image: "https://i.pravatar.cc/100?img=7" },
  ];

  return (
    <div className="w-full bg-black border border-gray-800 rounded-xl py-3 md:py-4 px-4 md:px-6">
      <div className="flex items-center gap-3 md:gap-4 overflow-x-auto scrollbar-hide">
        {/* Add Story Button */}
        <div className="flex flex-col items-center gap-1 md:gap-2 flex-shrink-0">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition">
            <span className="text-xl md:text-2xl text-gray-400">+</span>
          </div>
          <span className="text-xs text-gray-400">Add Story</span>
        </div>

        {/* Story Items */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-1 md:gap-2 flex-shrink-0">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 via-pink-500 to-green-500 cursor-pointer">
              <div className="w-full h-full rounded-full border-2 border-black overflow-hidden flex items-center justify-center">
                <img
                  src={story.image}
                  alt={story.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-gray-400 max-w-[56px] md:max-w-[64px] truncate">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}