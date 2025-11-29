// User profile management utilities
// Stores user profile data in localStorage

const PROFILE_KEY = 'projectx_user_profile';

// Get user profile data
export const getUserProfile = () => {
  try {
    const profile = localStorage.getItem(PROFILE_KEY);
    if (profile) {
      return JSON.parse(profile);
    }
    return null; // Return null if no profile exists
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};

// Save user profile data
export const saveUserProfile = (profileData) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
    // Dispatch custom event to notify components of profile update
    window.dispatchEvent(new CustomEvent('profileUpdated', { detail: profileData }));
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
};

// Get profile photo (with fallback to default)
export const getProfilePhoto = (defaultPhoto) => {
  const profile = getUserProfile();
  return profile?.profilePhoto || defaultPhoto;
};

// Get profile video
export const getProfileVideo = () => {
  const profile = getUserProfile();
  return profile?.profileVideo || null;
};

