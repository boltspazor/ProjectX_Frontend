import React, { useState, useEffect } from "react";
import { communityService } from "../services/communityService";
import LiveBanner from "./LiveBanner";
import LiveProfilePhoto from "./LiveProfilePhoto";
import { getCommunityBannerVideoUrl, getCommunityProfileVideoUrl } from "../utils/communityVideos";

export default function JoinedCommunities({ setActiveView, onDiscoverClick }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJoinedCommunities();
  }, []);

  const fetchJoinedCommunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getUserCommunities();
      // Ensure data is always an array
      if (Array.isArray(data)) {
        setCommunities(data);
      } else if (data && Array.isArray(data.communities)) {
        setCommunities(data.communities);
      } else {
        setCommunities([]);
      }
    } catch (err) {
      console.error('Error fetching joined communities:', err);
      setError(err.message || 'Failed to load communities');
      // Set empty array on error to prevent undefined issues
      setCommunities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCommunity = async (communityId) => {
    try {
      // Optimistic update
      setCommunities(prev => prev.filter(c => c.id !== communityId));
      await communityService.leaveCommunity(communityId);
    } catch (err) {
      console.error('Error leaving community:', err);
      // Revert on error
      fetchJoinedCommunities();
    }
  };

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
            className="px-4 py-2 rounded-lg border border-black dark:border-gray-700 bg-white dark:bg-[#161616] text-sm text-gray-700 dark:text-gray-300 hover:border-primary hover:text-black dark:hover:text-white transition-all duration-300"
          >
            Discover more
          </button>
          <button
            onClick={() => setActiveView("createCommunity")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary via-primary to-primary-700 text-sm font-medium text-white hover:shadow-[0_0_24px_rgba(119,5,36,0.35)] transition-all duration-300"
          >
            Create community
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchJoinedCommunities}
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-700 transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && communities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You haven&apos;t joined any communities yet.
          </p>
          <button
            onClick={onDiscoverClick}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary via-primary to-primary-700 text-white hover:shadow-[0_0_24px_rgba(119,5,36,0.35)] transition-all duration-300"
          >
            Discover communities
          </button>
        </div>
      )}

      {!loading && !error && communities.length > 0 && (
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2">
          {communities.map((community) => (
          <article
            key={community.id}
            onClick={() => handleCommunityClick(community.id)}
            className="group relative rounded-3xl border border-black dark:border-gray-800 bg-white dark:bg-[#121212] transition-all duration-500 hover:border-primary hover:shadow-[0_0_35px_rgba(249,115,22,0.15)] cursor-pointer"
          >
            <div className="relative h-40 overflow-hidden rounded-t-3xl">
              <LiveBanner
                imageSrc={community.cover}
                videoSrc={getCommunityBannerVideoUrl(community.id, community.cover, community)}
                alt={`${community.name} cover`}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                maxDuration={10}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            <div className="relative pt-12 pb-6 px-6">
              <div className="absolute -top-8 left-6">
                <div className="w-16 h-16 rounded-2xl border-4 border-[#121212] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
                  <LiveProfilePhoto
                    imageSrc={community.avatar}
                    videoSrc={getCommunityProfileVideoUrl(community.id, community.avatar, community)}
                    alt={`${community.name} avatar`}
                    className="h-full w-full rounded-2xl"
                    maxDuration={10}
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
                <span className="text-xs font-medium uppercase tracking-wide text-primary-400 bg-primary/10 border border-primary/40 px-3 py-1 rounded-full">
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
                      className="px-3 py-1 rounded-full text-xs font-medium text-primary-700 dark:text-secondary-300 bg-secondary-100 dark:bg-primary/10 border border-secondary-300 dark:border-primary/30"
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
                  className="flex-1 rounded-xl border border-black dark:border-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:border-primary hover:text-black dark:hover:text-white"
                >
                  View latest posts
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeaveCommunity(community.id);
                  }}
                  className="rounded-xl border border-red-500 px-4 py-2 text-sm text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                >
                  Leave
                </button>
              </div>
            </div>
          </article>
          ))}
        </div>
      )}
    </div>
  );
}