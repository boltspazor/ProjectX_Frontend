import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import PostDetailModal from "../components/PostDetailModal";
import FollowersFollowingModal from "../components/FollowersFollowingModal";
import LiveProfilePhoto from "../components/LiveProfilePhoto";
import { getProfileVideoUrl } from "../utils/profileVideos";
import { useUserProfile } from "../hooks/useUserProfile";

export default function OtherUserProfile({ username: viewedUsername, setActiveView, onViewUserProfile }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followersModalType, setFollowersModalType] = useState("followers");
  const { username: currentUsername } = useUserProfile();

  const viewedUser = viewedUsername || "sheryanne_xoxo";

  // Sample user data - in a real app, this would be fetched based on username
  const userData = {
    username: viewedUser,
    fullName: "Sheryanne Smith",
    bio: "Living life one adventure at a time 🌍✨",
    profilePhoto: "https://i.pravatar.cc/200",
    profileVideo: getProfileVideoUrl("https://i.pravatar.cc/200", viewedUser),
  };

  // Posts state - counts will be dynamic based on this array length
  const [posts, setPosts] = useState([
    {
      id: 0,
      username: viewedUser,
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop",
      caption: "Found that's guitar I saw last rly as a rockstar. Still waiting for my negro to learn what a Ghost is.",
      profileImage: userData.profilePhoto,
    },
    {
      id: 1,
      username: viewedUser,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      caption: "Sunset vibes 🌅",
      profileImage: userData.profilePhoto,
    },
    {
      id: 2,
      username: viewedUser,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      caption: "Palm trees and paradise",
      profileImage: userData.profilePhoto,
    },
    {
      id: 3,
      username: viewedUser,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop",
      caption: "Beach day 🏖️",
      profileImage: userData.profilePhoto,
    },
    {
      id: 4,
      username: viewedUser,
      image: "https://images.unsplash.com/photo-1490772888775-55fceea286b8?w=400&h=400&fit=crop",
      caption: "Breakfast of champions",
      profileImage: userData.profilePhoto,
    },
  ]);

  // Followers and Following lists - counts will be dynamic based on these array lengths
  const [followersList, setFollowersList] = useState([
    { username: "idkwhoisrahul_04", fullName: "Rahul Chauhan", image: "https://i.pravatar.cc/100?img=1", isFollowing: true },
    { username: "john_doe", fullName: "John Doe", image: "https://i.pravatar.cc/100?img=2", isFollowing: false },
    { username: "jane_smith", fullName: "Jane Smith", image: "https://i.pravatar.cc/100?img=3", isFollowing: true },
  ]);

  const [followingList, setFollowingList] = useState([
    { username: "idkwhoisrahul_04", fullName: "Rahul Chauhan", image: "https://i.pravatar.cc/100?img=1", isFollowing: true },
    { username: "pxhf_12", fullName: "Pxhf User", image: "https://i.pravatar.cc/100?img=11", isFollowing: true },
  ]);

  // Dynamic counts based on array lengths
  const postsCount = posts.length;
  const followersCount = followersList.length;
  const followingCount = followingList.length;


  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleFollow = () => {
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);

    // Update follower count when following/unfollowing
    if (newFollowingState) {
      // Add current user to their followers list if not already there
      const currentUserInFollowers = followersList.find(u => u.username === currentUsername);
      if (!currentUserInFollowers) {
        setFollowersList([...followersList, {
          username: currentUsername,
          fullName: "You",
          image: "https://i.pravatar.cc/100",
          isFollowing: true
        }]);
      }
    } else {
      // Remove current user from their followers list
      setFollowersList(followersList.filter(u => u.username !== currentUsername));
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

  const handleFollowUser = (targetUsername) => {
    // Update followers list
    setFollowersList(followersList.map(user =>
      user.username === targetUsername ? { ...user, isFollowing: true } : user
    ));

    // Update following list
    setFollowingList(followingList.map(user =>
      user.username === targetUsername ? { ...user, isFollowing: true } : user
    ));
  };

  const handleUnfollowUser = (targetUsername) => {
    // Update followers list
    setFollowersList(followersList.map(user =>
      user.username === targetUsername ? { ...user, isFollowing: false } : user
    ));

    // Update following list
    setFollowingList(followingList.map(user =>
      user.username === targetUsername ? { ...user, isFollowing: false } : user
    ));
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