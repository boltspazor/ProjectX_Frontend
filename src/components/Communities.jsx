import React from "react";

const sampleCommunities = Array.from({ length: 4 }).map(() => ({
  name: "community_name",
  image: "https://via.placeholder.com/48",
}));

const suggestedCommunities = Array.from({ length: 8 }).map(() => ({
  name: "community_name",
  image: "https://via.placeholder.com/48",
}));

export default function Communities({ searchQuery = "", hasSearched = false }) {
  return (
    <div className="max-w-7xl mx-auto text-white">
      {/* Results Section - Only show if search has been performed */}
      {hasSearched && searchQuery && (
        <div className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-5">
            Results for <span className="text-gray-300">"{searchQuery}"</span>
          </h2>
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sampleCommunities.map((community, i) => (
              <div
                key={i}
                className="relative border border-gray-800 rounded-xl overflow-hidden bg-[#111] hover:border-orange-500 transition-all"
              >
                {/* Top 1/3rd section with 3 equal parts */}
                <div className="grid grid-cols-3 h-24">
                  <div className="bg-gray-700"></div>
                  <div className="bg-gray-600"></div>
                  <div className="bg-gray-700"></div>
                </div>

                {/* Profile Image overlapping in the middle */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-gray-500 border-4 border-[#111]"></div>
                </div>

                {/* Bottom section with community name */}
                <div className="pt-10 pb-4 px-4 text-center">
                  <p className="text-sm font-semibold">{community.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Communities Section */}
      <h3 className="text-lg md:text-xl font-semibold mb-5">
        Other Communities You could Follow
      </h3>
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {suggestedCommunities.map((community, i) => (
          <div
            key={i}
            className="relative border border-gray-800 rounded-xl overflow-hidden bg-[#111] hover:border-orange-500 transition-all"
          >
            {/* Top 1/3rd section with 3 equal parts */}
            <div className="grid grid-cols-3 h-24">
              <div className="bg-gray-700"></div>
              <div className="bg-gray-600"></div>
              <div className="bg-gray-700"></div>
            </div>

            {/* Profile Image overlapping in the middle */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-gray-500 border-4 border-[#111]"></div>
            </div>

            {/* Bottom section with community name */}
            <div className="pt-10 pb-4 px-4 text-center">
              <p className="text-sm font-semibold">{community.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}