import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function DiscoverCommunities({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Games",
    "Pop Culture",
    "Anime & Manga",
    "Food & Recipes",
    "Music",
    "Sports",
    "Art & Design"
  ];

  const recommendedCommunities = [
    {
      id: 1,
      name: "Tech4Good",
      members: "375 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=20"
    },
    {
      id: 2,
      name: "Tech4Good",
      members: "436 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=21"
    },
    {
      id: 3,
      name: "Tech4Good",
      members: "288 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=22"
    },
    {
      id: 4,
      name: "Tech4Good",
      members: "375 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=23"
    },
    {
      id: 5,
      name: "Tech4Good",
      members: "436 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=24"
    },
    {
      id: 6,
      name: "Tech4Good",
      members: "288 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=25"
    }
  ];

  const technologyCommunities = [
    {
      id: 7,
      name: "Tech4Good",
      members: "375 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=26"
    },
    {
      id: 8,
      name: "Tech4Good",
      members: "436 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=27"
    },
    {
      id: 9,
      name: "Tech4Good",
      members: "288 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=28"
    },
    {
      id: 10,
      name: "Tech4Good",
      members: "375 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=29"
    },
    {
      id: 11,
      name: "Tech4Good",
      members: "436 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=30"
    },
    {
      id: 12,
      name: "Tech4Good",
      members: "288 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=31"
    }
  ];

  const gamesCommunities = [
    {
      id: 13,
      name: "Tech4Good",
      members: "375 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=32"
    },
    {
      id: 14,
      name: "Tech4Good",
      members: "436 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=33"
    },
    {
      id: 15,
      name: "Tech4Good",
      members: "288 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=34"
    },
    {
      id: 16,
      name: "Tech4Good",
      members: "375 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=35"
    },
    {
      id: 17,
      name: "Tech4Good",
      members: "436 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=36"
    },
    {
      id: 18,
      name: "Tech4Good",
      members: "288 followers",
      description: "Some long ass description > honestly don't know what to write here",
      avatar: "https://i.pravatar.cc/100?img=37"
    }
  ];

  const CommunityCard = ({ community }) => (
    <div className="bg-white dark:bg-[#0f0f0f] border border-black dark:border-gray-800 rounded-2xl p-4 hover:border-orange-500 transition-all duration-300">
      <div className="flex items-start gap-3">
        <img
          src={community.avatar}
          alt={community.name}
          className="w-12 h-12 rounded-xl object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-black dark:text-white font-medium">{community.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs">{community.members}</p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 line-clamp-2">
            {community.description}
          </p>
        </div>
        <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-full transition-colors flex-shrink-0">
          Join
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffcfa] dark:bg-black text-black dark:text-white pb-20 md:pb-0">
      {/* Header */}
      <div className="border-b border-black dark:border-gray-800 px-4 md:px-6 py-4">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-black dark:text-white" />
          </button>
          <h1 className="text-lg md:text-2xl font-semibold">Discover more Communities</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Search and Categories */}
        <div className="mb-8">
          <h2 className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4">What are you looking for?</h2>

          {/* Categories - Horizontal scroll on mobile */}
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${activeCategory === category
                      ? "bg-orange-500 text-white"
                      : "bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-[#222] hover:text-black dark:hover:text-white border border-black dark:border-gray-800"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="mb-10">
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#222] text-white text-sm font-medium rounded-lg border border-gray-800 transition-colors">
              Show More
            </button>
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-10">
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologyCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#222] text-white text-sm font-medium rounded-lg border border-gray-800 transition-colors">
              Show More
            </button>
          </div>
        </div>

        {/* Games Section */}
        <div className="mb-10">
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gamesCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#222] text-white text-sm font-medium rounded-lg border border-gray-800 transition-colors">
              Show More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}