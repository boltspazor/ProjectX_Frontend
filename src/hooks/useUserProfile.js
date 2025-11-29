import { useState, useEffect } from 'react';
import { getUserProfile, getProfilePhoto, getProfileVideo } from '../utils/userProfile';
import profilePhotoDefault from '../assets/profile-photo.jpg';

/**
 * Hook to get current user profile data with reactive updates
 * Automatically updates when profile changes
 */
export const useUserProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState(() => getProfilePhoto(profilePhotoDefault));
  const [profileVideo, setProfileVideo] = useState(() => getProfileVideo());
  const [profile, setProfile] = useState(() => getUserProfile());

  useEffect(() => {
    const handleProfileUpdate = (e) => {
      const updatedProfile = e.detail;
      setProfile(updatedProfile);
      setProfilePhoto(updatedProfile.profilePhoto || profilePhotoDefault);
      setProfileVideo(updatedProfile.profileVideo || null);
    };

    // Listen for profile updates
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    // Check for updates periodically (in case updated from another tab)
    const checkProfile = () => {
      const currentProfile = getUserProfile();
      if (currentProfile) {
        setProfile(currentProfile);
        setProfilePhoto(currentProfile.profilePhoto || profilePhotoDefault);
        setProfileVideo(currentProfile.profileVideo || null);
      }
    };
    
    checkProfile();
    const interval = setInterval(checkProfile, 1000);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
      clearInterval(interval);
    };
  }, []);

  return {
    profile,
    profilePhoto,
    profileVideo,
    username: profile?.username || "idkwhoisrahul_04"
  };
};

