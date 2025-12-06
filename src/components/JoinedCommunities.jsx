import React from "react";
import { communitiesData } from "../data/communitiesData";

// Use shared communities data
const joinedCommunities = communitiesData.map((community) => ({
  id: community.id,
  name: community.name,
  description: community.description,
  members: community.members,
  cover: community.cover,
  avatar: community.avatar,
  badges: community.badges,
}));

export default function JoinedCommunities({ setActiveView, onDiscoverClick }) {
  const handleCommunityClick = (communityId) => {
    if (setActiveView) {
      setActiveView("communityDetail", communityId);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
            Communities you&apos;re in
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
            Pick up where you left off, join live sessions, or explore what&apos;s trending inside your circles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onDiscoverClick}
            className="px-4 py-2 rounded-lg border border-black dark:border-gray-700 bg-white dark:bg-[#161616] text-sm text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-black dark:hover:text-white transition-all duration-300"
          >
            Discover more
          </button>
          <button
            onClick={() => setActiveView("createCommunity")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-sm font-medium text-white hover:shadow-[0_0_24px_rgba(249,115,22,0.35)] transition-all duration-300"
          >
            Create community
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2">
        {joinedCommunities.map((community) => (
          <article
            key={community.id}
            onClick={() => handleCommunityClick(community.id)}
            className="group relative rounded-3xl border border-black dark:border-gray-800 bg-white dark:bg-[#121212] transition-all duration-500 hover:border-orange-500 hover:shadow-[0_0_35px_rgba(249,115,22,0.15)] cursor-pointer"
          >
            <div className="relative h-40 overflow-hidden rounded-t-3xl">
              <img
                src={community.cover}
                alt={`${community.name} cover`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
            </div>

            <div className="relative pt-12 pb-6 px-6">
              <div className="absolute -top-8 left-6">
                <div className="w-16 h-16 rounded-2xl border-4 border-[#121212] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
                  <img
                    src={community.avatar}
                    alt={`${community.name} avatar`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-black dark:text-white">{community.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {community.description}
                  </p>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-orange-400 bg-orange-500/10 border border-orange-500/40 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">{community.members}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-700" />
                <div className="flex flex-wrap items-center gap-2">
                  {community.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded-full text-xs font-medium text-orange-600 dark:text-orange-300 bg-orange-100 dark:bg-orange-500/10 border border-orange-300 dark:border-orange-500/30"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommunityClick(community.id);
                  }}
                  className="flex-1 rounded-xl border border-black dark:border-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:border-orange-500 hover:text-black dark:hover:text-white"
                >
                  View latest posts
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}