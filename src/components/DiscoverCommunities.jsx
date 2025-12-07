import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { communityService } from "../services/communityService";
import LiveProfilePhoto from "./LiveProfilePhoto";
import { getCommunityProfileVideoUrl } from "../utils/communityVideos";

export default function DiscoverCommunities({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [recommendedCommunities, setRecommendedCommunities] = useState([]);
  const [categoryCommunities, setCategoryCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningIds, setJoiningIds] = useState(new Set());

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

  useEffect(() => {
    fetchCommunities();
  }, [activeCategory]);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch recommended communities (always shown)
      const recommended = await communityService.getPublicCommunities({ limit: 6 });
      setRecommendedCommunities(recommended || []);
      
      // Fetch category-specific communities if not "All"
      if (activeCategory !== "All") {
        const categoryData = await communityService.getPublicCommunities({
          category: activeCategory,
          limit: 6
        });
        setCategoryCommunities(categoryData || []);
      } else {
        setCategoryCommunities([]);
      }
    } catch (err) {
      console.error('Error fetching communities:', err);
      setError(err.message || 'Failed to load communities');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCommunity = async (communityId) => {
    if (joiningIds.has(communityId)) return;
    
    try {
      setJoiningIds(prev => new Set(prev).add(communityId));
      await communityService.joinCommunity(communityId);
      
      // Optimistic update - remove from lists after joining
      setRecommendedCommunities(prev => prev.filter(c => c.id !== communityId));
      setCategoryCommunities(prev => prev.filter(c => c.id !== communityId));
    } catch (err) {
      console.error('Error joining community:', err);
    } finally {
      setJoiningIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(communityId);
        return newSet;
      });
    }
  };

  const CommunityCard = ({ community, onJoin, isJoining }) => (
    <div className="bg-white dark:bg-[#0f0f0f] border border-black dark:border-gray-800 rounded-2xl p-4 hover:border-orange-500 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
          <LiveProfilePhoto
            imageSrc={community.avatar}
            videoSrc={getCommunityProfileVideoUrl(community.id, community.avatar, community)}
            alt={community.name}
            className="w-12 h-12 rounded-xl"
            maxDuration={10}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-black dark:text-white font-medium">{community.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs">{community.members}</p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 line-clamp-2">
            {community.description}
          </p>
        </div>
        <button
          onClick={() => onJoin(community.id)}
          disabled={isJoining}
          className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-colors flex-shrink-0"
        >
          {isJoining ? 'Joining...' : 'Join'}
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
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchCommunities}
              className="px-6 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
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
        {recommendedCommunities.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">Recommended for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onJoin={handleJoinCommunity}
                  isJoining={joiningIds.has(community.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Category-Specific Section */}
        {activeCategory !== "All" && categoryCommunities.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">{activeCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onJoin={handleJoinCommunity}
                  isJoining={joiningIds.has(community.id)}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && recommendedCommunities.length === 0 && categoryCommunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No communities found. Try a different category.
            </p>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}