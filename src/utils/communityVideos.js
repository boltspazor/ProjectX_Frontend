// Utility to get video URLs for community banners and profile photos
// Checks community object first, then falls back to API/database lookup

// Generate banner video URL based on community ID or banner image URL
export const getCommunityBannerVideoUrl = (communityId, bannerSrc = null, community = null) => {
  // First check if community object was passed and has a bannerVideo property
  if (community && community.bannerVideo) {
    return community.bannerVideo;
  }
  
  // If community object not provided, try to get it by ID
  if (communityId) {
    const communityData = getCommunityById(communityId);
    if (communityData && communityData.bannerVideo) {
      return communityData.bannerVideo;
    }
  }
  
  // In a real app, you would:
  // 1. Check if community has a live banner video
  // 2. Fetch from your database/CDN
  // 3. Return the actual video URL
  
  // Return null if no video available (component will show static image)
  return null;
};

// Generate profile video URL for community icon
export const getCommunityProfileVideoUrl = (communityId, profileSrc = null, community = null) => {
  // First check if community object was passed and has a profileVideo property
  if (community && community.profileVideo) {
    return community.profileVideo;
  }
  
  // If community object not provided, try to get it by ID
  if (communityId) {
    const communityData = getCommunityById(communityId);
    if (communityData && communityData.profileVideo) {
      return communityData.profileVideo;
    }
  }
  
  // In a real app, you would:
  // 1. Check if community has a live profile video
  // 2. Fetch from your database/CDN
  // 3. Return the actual video URL
  
  // Return null if no video available (component will show static image)
  return null;
};

// Alternative: Return null to show only static images
// export const getCommunityBannerVideoUrl = (communityId, bannerSrc = null) => {
//   return null; // No videos for now
// };
// export const getCommunityProfileVideoUrl = (communityId, profileSrc = null) => {
//   return null; // No videos for now
// };

