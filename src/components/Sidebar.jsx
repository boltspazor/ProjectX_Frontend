// Normal icons
import homeIcon from "../assets/home.svg";
import exploreIcon from "../assets/explore.svg";
import communitiesIcon from "../assets/communities.svg";
import messageIcon from "../assets/message.svg";
import profileIcon from "../assets/profile.svg";
import logoutIcon from "../assets/logout.svg";

// Highlighted icons
import homeIconActive from "../assets/home-active.svg";
import exploreIconActive from "../assets/explore-active.svg";
import messageIconActive from "../assets/message-active.svg";
import profileIconActive from "../assets/profile-active.svg";
import logoutIconActive from "../assets/logout-active.svg";

import LogoutConfirmationModal from "./LogoutConfirmationModal";
import LiveProfilePhoto from "./LiveProfilePhoto";
import { useUserProfile } from "../hooks/useUserProfile";
import React, { useState } from "react";

export default function Sidebar({ activeView, setActiveView, onLogout }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { profilePhoto, profileVideo, username } = useUserProfile();

  // Same initial data as ProfilePage to keep counts in sync
  // These match exactly what ProfilePage has
  const posts = [
    { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
    { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 },
  ];

  const followersList = [
    { username: "sheryanne_xoxo" },
    { username: "john_doe" },
    { username: "jane_smith" },
    { username: "mike_ross" },
    { username: "sarah_jones" },
    { username: "david_wilson" },
  ];

  const followingList = [
    { username: "sheryanne_xoxo" },
    { username: "pxhf_12" },
    { username: "xsd_hgf" },
    { username: "shane_xd" },
    { username: "garvv_pvt" },
  ];

  // Dynamic counts based on array lengths - same calculation as ProfilePage
  const postsCount = posts.length;
  const followersCount = followersList.length;
  const followingCount = followingList.length;
  const items = [
    { label: "Home", value: "home", icon: homeIcon, iconActive: homeIconActive },
    { label: "Explore", value: "explore", icon: exploreIcon, iconActive: exploreIconActive },
    { label: "Communities", value: "communities", icon: communitiesIcon, iconActive: communitiesIcon },
    { label: "Messages", value: "messages", icon: messageIcon, iconActive: messageIconActive },
    { label: "Profile", value: "profile", icon: profileIcon, iconActive: profileIconActive },
  ];

  function handleClick(value) {
    setActiveView(value);
  }

  const handleLogout = () => {
    // Clear token and redirect to login
    if (onLogout) {
      onLogout();
    }
    setIsLogoutModalOpen(false);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <aside className="hidden md:flex flex-col w-80 bg-[#fffcfa] dark:bg-[#0f0f0f] border-r border-black dark:border-gray-800 transition-colors duration-300 p-8 fixed left-0 top-16 h-[calc(100vh-4rem)] text-black dark:text-white overflow-y-auto">

      {/* Profile Image */}
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full blur-lg opacity-90"></div>
        <div className="relative w-28 h-28 rounded-full border-2 dark:border-gray-900 border-black overflow-hidden">
          <LiveProfilePhoto
            imageSrc={profilePhoto}
            videoSrc={profileVideo}
            alt="Profile"
            className="w-full h-full"
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold text-center">{username}</h2>
      <p className="text-sm dark:text-gray-400 text-gray-600 text-center mb-8">Rahul Chauhan</p>

      {/* Stats */}
      <div className="flex justify-center text-center mb-10 text-sm">
        <div className="px-3">
          <p className="font-bold">{postsCount}</p>
          <p className="dark:text-gray-400 text-gray-600 text-xs">Posts</p>
        </div>

        <div className="border-l dark:border-gray-700 border-black mx-2 h-5"></div>

        <div className="px-3">
          <p className="font-bold">{followersCount}</p>
          <p className="dark:text-gray-400 text-gray-600 text-xs">Followers</p>
        </div>

        <div className="border-l dark:border-gray-700 border-black mx-2 h-5"></div>

        <div className="px-3">
          <p className="font-bold">{followingCount}</p>
          <p className="dark:text-gray-400 text-gray-600 text-xs">Following</p>
        </div>
      </div>

      {/* Buttons */}
      <nav className="space-y-4 text-[15px] font-medium">
        {items.map((item, i) => {
          const active = activeView === item.value;
          return (
            <button
              key={i}
              onClick={() => handleClick(item.value)}
              aria-pressed={active}
              className={`relative w-full rounded-2xl p-[3px] border ${active ? "border-transparent" : "dark:border-gray-600 border-black"} ${active ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" : "hover:border-transparent hover:bg-gradient-to-r hover:from-orange-400 hover:via-orange-500 hover:to-orange-600"} transition-all duration-300`}
            >
              <span className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0f0f0f]">
                <img src={active ? item.icon : item.icon} className="h-5 w-5 invert dark:invert-0" alt={item.label} />
                <span className={`${active ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" : ""}`}>
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}

        {/* Logout */}
        <button
          className="group relative w-full rounded-2xl p-[3px] border dark:border-gray-600 border-black hover:border-transparent hover:bg-gradient-to-r hover:from-orange-400 hover:via-orange-500 hover:to-orange-600 transition-all duration-300 mt-6"
          onClick={handleLogoutClick}
        >
          <span className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0f0f0f]">
            <img src={logoutIcon} className="h-5 w-5 invert dark:invert-0" alt="Logout" />
            <span className="text-black dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-orange-600 transition-all duration-300">
              Logout
            </span>
          </span>
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
}