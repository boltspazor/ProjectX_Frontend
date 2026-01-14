import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, Settings } from "lucide-react";
import profilePhotoDefault from "../../assets/profile-photo.jpg";
import PostDetailModal from "../../components/PostDetailModal";
import LogoutConfirmationModal from "../../components/LogoutConfirmationModal";
import ProfileSettings from "../../components/ProfileSettings";
import FollowersFollowingModal from "../../components/FollowersFollowingModal";
import LiveProfilePhoto from "../../components/LiveProfilePhoto";
import { useUserProfile } from "../../hooks/useUserProfile";
import { getProfileVideoUrl } from "../../utils/profileVideos";
import { useAuth } from "../../context/AuthContext";
import { userService, postService } from "../../services";

export default function ProfilePage({ onLogout, onViewUserProfile }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followersModalType, setFollowersModalType] = useState("followers");
  const { profilePhoto, profileVideo, username, profile } = useUserProfile();
  const { user } = useAuth();

  // Profile data state
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Posts state - counts will be dynamic based on this array length
  const [posts, setPosts] = useState([
    {
      id: 0,
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop",
      caption: "Found that's guitar I saw last rly as a rockstar. Still waiting for my negro to learn what a Ghost is.",
      profileImage: profilePhoto,
      username: username
    },
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      caption: "Sunset vibes 🌅",
      profileImage: profilePhoto,
      username: username
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      caption: "Palm trees and paradise",
      profileImage: profilePhoto,
      username: username
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop",
      caption: "Beach day 🏖️",
      profileImage: profilePhoto,
      username: username
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1490772888775-55fceea286b8?w=400&h=400&fit=crop",
      caption: "Breakfast of champions",
      profileImage: profilePhoto,
      username: username
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
      caption: "Mirror selfie vibes",
      profileImage: profilePhoto,
      username: username
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop",
      caption: "Cloud watching",
      profileImage: profilePhoto,
      username: username
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
      caption: "Golden hour",
      profileImage: profilePhoto,
      username: username
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      caption: "Tropical vibes",
      profileImage: profilePhoto,
      username: username
    },
  ]);

  // Followers and Following lists - counts will be dynamic based on these array lengths
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  // Dynamic counts based on array lengths or API data
  const postsCount = profileData?.stats?.posts || posts.length;
  const followersCount = profileData?.stats?.followers || followersList.length;
  const followingCount = profileData?.stats?.following || followingList.length;

  const hasFetchedProfile = React.useRef(false);

  // Fetch profile data on mount
useEffect(() => {
  if (!user || !user.username) return;
  if (hasFetchedProfile.current) return;

  hasFetchedProfile.current = true;
  fetchProfileData();
}, [user]);


  // Listen for new posts created from CreatePost component
  useEffect(() => {
    const handleNewPost = (event) => {
      const newPost = event.detail;
      // Add new post to the beginning of the posts array
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    window.addEventListener("newPostCreated", handleNewPost);
    return () => {
      window.removeEventListener("newPostCreated", handleNewPost);
    };
  }, []);

const fetchProfileData = async () => {
  try {
    setLoading(true);
    setError(null);

    const actualUsername = user.username;

    // Fetch user profile data
    const userData = await userService.getUserByUsername(actualUsername);
    setProfileData(userData);

    // Fetch user posts
    const userPosts = await postService.getUserPosts(actualUsername);
    setPosts(userPosts?.posts || userPosts || []);

    // Fetch followers
    const followersData = await userService.getUserFollowers(actualUsername);
    setFollowersList(followersData?.followers || followersData || []);

    // Fetch following
    const followingData = await userService.getUserFollowing(actualUsername);
    setFollowingList(followingData?.following || followingData || []);
  } catch (err) {
    console.error("Error fetching profile data:", err);
    setError(err.message || "Failed to load profile");
  } finally {
    setLoading(false);
  }
};


  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    if (onLogout) {
      onLogout();
    }
    setIsLogoutModalOpen(false);
  };

  const handleFollowersClick = () => {
    setFollowersModalType("followers");
    setFollowersModalOpen(true);
  };

  const handleFollowingClick = () => {
    setFollowersModalType("following");
    setFollowersModalOpen(true);
  };

  const handleFollow = async (targetUsername) => {
    try {
      await userService.followUser(targetUsername);
      
      // Update followers list (if following back)
      setFollowersList(followersList.map(user =>
        user.username === targetUsername ? { ...user, isFollowing: true } : user
      ));

      // Add to following list if not already there
      const isInFollowing = followingList.find(u => u.username === targetUsername);
      if (!isInFollowing) {
        const userToAdd = followersList.find(u => u.username === targetUsername) || {
          username: targetUsername,
          fullName: targetUsername,
          image: `https://i.pravatar.cc/100?u=${encodeURIComponent(targetUsername)}`,
          isFollowing: true
        };
        setFollowingList([...followingList, userToAdd]);
      } else {
        setFollowingList(followingList.map(user =>
          user.username === targetUsername ? { ...user, isFollowing: true } : user
        ));
      }
    } catch (err) {
      console.error("Error following user:", err);
      alert("Failed to follow user. Please try again.");
    }
  };

  const handleUnfollow = async (targetUsername) => {
    try {
      await userService.unfollowUser(targetUsername);
      
      // Update followers list
      setFollowersList(followersList.map(user =>
        user.username === targetUsername ? { ...user, isFollowing: false } : user
      ));

      // Remove from following list
      setFollowingList(followingList.filter(u => u.username !== targetUsername));
    } catch (err) {
      console.error("Error unfollowing user:", err);
      alert("Failed to unfollow user. Please try again.");
    }
  };

  // Show settings page if active
  if (showSettings) {
    return <ProfileSettings onBack={() => setShowSettings(false)} onProfileUpdate={fetchProfileData} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffcfa] dark:bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#fffcfa] dark:bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchProfileData}
            className="px-6 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfa] dark:bg-black text-black dark:text-white pb-20 md:pb-0">
      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Action Buttons - Top Right */}
        <div className="flex justify-end gap-2 mb-4">
          {/* Settings Button - Always visible */}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="Settings"
          >
            <Settings className="h-5 w-5 text-black dark:text-gray-400 dark:hover:text-white" />
          </button>

          {/* Logout Button - Mobile Only */}
          <button
            onClick={handleLogoutClick}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors md:hidden"
            title="Logout"
          >
            <LogOut className="h-5 w-5 text-red-500" />
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-black dark:border-gray-800"
          >
            <LiveProfilePhoto
              imageSrc={profilePhoto}
              videoSrc={profileVideo}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </motion.div>

          {/* Profile Details */}
          <div className="flex flex-col items-center text-center w-full">
            {/* Username */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-2"
            >
              {username}
            </motion.h2>

            {/* Full Name */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-gray-600 dark:text-gray-300 mb-3"
            >
              {profileData?.displayName || user?.displayName || "Rahul Chauhan"}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-black dark:text-white mb-6 text-sm md:text-base"
            >
              {profileData?.bio || profile?.bio || "Wish I was half as interesting as my bio"}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center justify-center gap-4 md:gap-6 text-base md:text-lg"
            >
              <div className="text-center">
                <p className="font-bold text-black dark:text-white">{postsCount}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Posts</p>
              </div>

              <div className="h-6 w-px bg-gray-700"></div>

              <button
                onClick={handleFollowersClick}
                className="text-center hover:opacity-70 transition-opacity cursor-pointer"
              >
                <p className="font-bold text-black dark:text-white">{followersCount}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Followers</p>
              </button>

              <div className="h-6 w-px bg-gray-700"></div>

              <button
                onClick={handleFollowingClick}
                className="text-center hover:opacity-70 transition-opacity cursor-pointer"
              >
                <p className="font-bold text-black dark:text-white">{followingCount}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Following</p>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-3 gap-1 md:gap-2"
        >
          {posts.map((post, index) => (
  <motion.div
    key={`${post.id || post._id}-${index}`}
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.35 + index * 0.03, duration: 0.4 }}
    onClick={() => handlePostClick(post)}
    className="aspect-square overflow-hidden bg-gray-900 cursor-pointer group"
  >
    <img
      src={post.image}
      alt={`Post ${index + 1}`}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      loading="lazy"
      decoding="async"
    />
  </motion.div>
))}

        </motion.div>
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
        onViewUserProfile={onViewUserProfile}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Followers/Following Modal */}
      <FollowersFollowingModal
        isOpen={followersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        type={followersModalType}
        followersList={followersList}
        followingList={followingList}
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
        onViewUserProfile={onViewUserProfile}
        currentUsername={username}
      />
    </div>
  );
}