import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import PostDetailModal from "../components/PostDetailModal";
import FollowersFollowingModal from "../components/FollowersFollowingModal";
import LiveProfilePhoto from "../components/LiveProfilePhoto";
import { getProfileVideoUrl } from "../utils/profileVideos";
import { useUserProfile } from "../hooks/useUserProfile";
import { userService, postService } from "../services";

export default function OtherUserProfile({ username: viewedUsername, setActiveView, onViewUserProfile }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followersModalType, setFollowersModalType] = useState("followers");
  const { username: currentUsername } = useUserProfile();

  const viewedUser = viewedUsername || "sheryanne_xoxo";

  // Profile data state
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Posts state - counts will be dynamic based on this array length
  const [posts, setPosts] = useState([]);

  // Followers and Following lists - counts will be dynamic based on these array lengths
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  // Dynamic counts based on array lengths or API data
  const postsCount = userData?.stats?.posts || posts.length;
  const followersCount = userData?.stats?.followers || followersList.length;
  const followingCount = userData?.stats?.following || followingList.length;

  // Fetch user profile data
  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch user data
      const user = await userService.getUserByUsername(viewedUser);
      setUserData(user);
      setIsFollowing(user?.isFollowing || false);

      // Fetch user posts
      const userPosts = await postService.getUserPosts(viewedUser);
      setPosts(userPosts?.posts || userPosts || []);

      // Fetch followers
      const followersData = await userService.getUserFollowers(viewedUser);
      setFollowersList(followersData?.followers || followersData || []);

      // Fetch following
      const followingData = await userService.getUserFollowing(viewedUser);
      setFollowingList(followingData?.following || followingData || []);

    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err.message || 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [viewedUser]);


  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleFollow = async () => {
    const newFollowingState = !isFollowing;
    const previousFollowingState = isFollowing;
    
    // Optimistic update
    setIsFollowing(newFollowingState);

    try {
      if (newFollowingState) {
        // Use userId from userData instead of username
        const userIdToFollow = userData?.uid || userData?._id;
        if (!userIdToFollow) {
          throw new Error('User ID not found');
        }
        await userService.followUser(userIdToFollow);
        
        // Update follower count
        if (userData?.stats) {
          setUserData({
            ...userData,
            stats: { ...userData.stats, followers: (userData.stats.followers || 0) + 1 }
          });
        }
      } else {
        // Use userId from userData instead of username
        const userIdToUnfollow = userData?.uid || userData?._id;
        if (!userIdToUnfollow) {
          throw new Error('User ID not found');
        }
        await userService.unfollowUser(userIdToUnfollow);
        
        // Update follower count
        if (userData?.stats) {
          setUserData({
            ...userData,
            stats: { ...userData.stats, followers: Math.max(0, (userData.stats.followers || 0) - 1) }
          });
        }
      }
    } catch (err) {
      console.error("Error toggling follow:", err);
      // Revert on error
      setIsFollowing(previousFollowingState);
      alert("Failed to update follow status. Please try again.");
    }
  };

  const handleFollowersClick = () => {
    setFollowersModalType("followers");
    setFollowersModalOpen(true);
  };

  const handleFollowingClick = () => {
    setFollowersModalType("following");
    setFollowersModalOpen(true);
  };

  const handleFollowUser = async (targetUsername) => {
    try {
      await userService.followUser(targetUsername);
      
      // Update followers list
      setFollowersList(followersList.map(user =>
        user.username === targetUsername ? { ...user, isFollowing: true } : user
      ));

      // Update following list
      setFollowingList(followingList.map(user =>
        user.username === targetUsername ? { ...user, isFollowing: true } : user
      ));
    } catch (err) {
      console.error("Error following user:", err);
      alert("Failed to follow user. Please try again.");
    }
  };

  const handleUnfollowUser = async (targetUsername) => {
    try {
      await userService.unfollowUser(targetUsername);
      
      // Update followers list
      setFollowersList(followersList.map(user =>
        user.username === targetUsername ? { ...user, isFollowing: false } : user
      ));

      // Update following list
      setFollowingList(followingList.map(user =>
        user.username === targetUsername ? { ...user, isFollowing: false } : user
      ));
    } catch (err) {
      console.error("Error unfollowing user:", err);
      alert("Failed to unfollow user. Please try again.");
    }
  };

  const handleMessage = () => {
    // Navigate to messages page and open chat with this user
    if (setActiveView) {
      const usernameToMessage = viewedUsername || userData.username;
      setActiveView("messages", null, null, usernameToMessage);
    }
  };

  const handleBack = () => {
    if (setActiveView) {
      setActiveView("home");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffcfa] dark:bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
            onClick={fetchUserProfile}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!userData) {
    return (
      <div className="min-h-screen bg-[#fffcfa] dark:bg-black flex items-center justify-center p-4">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfa] dark:bg-black text-black dark:text-white pb-20 md:pb-0">
      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="Back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" />
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
              imageSrc={userData.profilePhoto}
              videoSrc={userData.profileVideo}
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
              {userData.username}
            </motion.h2>

            {/* Full Name */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-gray-700 dark:text-gray-300 mb-3"
            >
              {userData.fullName}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-black dark:text-white mb-6 text-sm md:text-base"
            >
              {userData.bio}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center justify-center gap-4 md:gap-6 text-base md:text-lg mb-6"
            >
              <div className="text-center">
                <p className="font-bold text-black dark:text-white">{postsCount}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Posts</p>
              </div>

              <div className="h-6 w-px bg-gray-400 dark:bg-gray-700"></div>

              <button
                onClick={handleFollowersClick}
                className="text-center hover:opacity-70 transition-opacity cursor-pointer"
              >
                <p className="font-bold text-black dark:text-white">{followersCount}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Followers</p>
              </button>

              <div className="h-6 w-px bg-gray-400 dark:bg-gray-700"></div>

              <button
                onClick={handleFollowingClick}
                className="text-center hover:opacity-70 transition-opacity cursor-pointer"
              >
                <p className="font-bold text-black dark:text-white">{followingCount}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Following</p>
              </button>
            </motion.div>

            {/* Follow and Message Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3 w-full max-w-md px-4"
            >
              <button
                onClick={handleFollow}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${isFollowing
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 border border-gray-400 dark:border-gray-700"
                  : "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white hover:from-orange-500 hover:via-orange-600 hover:to-orange-700"
                  }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button
                onClick={handleMessage}
                className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 border border-gray-400 dark:border-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Message
              </button>
            </motion.div>
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="grid grid-cols-3 gap-1 md:gap-2"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.03, duration: 0.4 }}
              onClick={() => handlePostClick(post)}
              className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-900 cursor-pointer group border-2 border-black dark:border-gray-800 transition-all"
            >
              <img
                src={post.image}
                alt={`Post ${post.id + 1}`}
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

      {/* Followers/Following Modal */}
      <FollowersFollowingModal
        isOpen={followersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        type={followersModalType}
        followersList={followersList}
        followingList={followingList}
        onFollow={handleFollowUser}
        onUnfollow={handleUnfollowUser}
        onViewUserProfile={onViewUserProfile}
        currentUsername={currentUsername}
      />
    </div>
  );
}