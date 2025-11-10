import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sampleAccounts = Array.from({ length: 12 }).map((_, i) => ({
  username: `bdue_hu${730 + i}`,
  name: "Rohan Jha",
  img: "https://via.placeholder.com/120", // Replace with actual profile image URLs
}));

const suggestedAccounts = Array.from({ length: 8 }).map((_, i) => ({
  username: `mshvd_${i + 1}`,
  name: "Mihir Kumar",
  img: "https://via.placeholder.com/100",
}));

export default function Accounts({ searchQuery = "Rohan" }) {
  const scrollRef = useRef(null);
  const [visibleStart, setVisibleStart] = useState(0);
  const visibleCount = 6;

  const scroll = (direction) => {
    if (direction === "left") {
      setVisibleStart((prev) => Math.max(prev - visibleCount, 0));
    } else {
      setVisibleStart((prev) =>
        Math.min(prev + visibleCount, sampleAccounts.length - visibleCount)
      );
    }
  };

  const visibleAccounts = sampleAccounts.slice(
    visibleStart,
    visibleStart + visibleCount
  );

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-6 text-white">
      {/* Results Section */}
      <h2 className="text-lg md:text-xl font-semibold mb-5">
        Results for{" "}
        <span className="text-gray-300">"{searchQuery}"</span>
      </h2>

      <div className="relative mb-12">
        {/* Left arrow */}
        {visibleStart > 0 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-sm p-2 rounded-full z-10 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Accounts grid (6 visible at a time) */}
        <div
          ref={scrollRef}
          className="flex items-center justify-center gap-8 md:gap-12 overflow-hidden"
        >
          {visibleAccounts.map((account, i) => (
            <div
              key={i}
              className="flex flex-col items-center min-w-[100px] md:min-w-[120px]"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-700 mb-3 border border-gray-600 hover:border-purple-500 transition-all"></div>
              <p className="text-sm md:text-base font-medium">
                {account.username}
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                {account.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        {visibleStart + visibleCount < sampleAccounts.length && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-sm p-2 rounded-full z-10 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* Suggested Accounts Section */}
      <h3 className="text-lg md:text-xl font-semibold mb-5">
        Other Accounts You Could Follow
      </h3>

      <div className="flex flex-wrap gap-6 md:gap-8">
        {suggestedAccounts.map((account, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border border-gray-700 rounded-lg px-4 py-3 md:px-6 md:py-4 hover:border-purple-500 transition-all bg-[#0f0f0f]"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-600"></div>
            <div>
              <p className="text-sm md:text-base font-medium">
                {account.username}
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                {account.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
