import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

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
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { profilePhoto, profileVideo, username } = useUserProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Same initial data as ProfilePage to keep counts in sync
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
    { label: "Home", path: "/home", icon: homeIcon, iconActive: homeIconActive },
    { label: "Explore", path: "/explore", icon: exploreIcon, iconActive: exploreIconActive },
    { label: "Communities", path: "/communities", icon: communitiesIcon, iconActive: communitiesIcon },
    { label: "Messages", path: "/messages", icon: messageIcon, iconActive: messageIconActive },
    { label: "Profile", path: `/profile/${username}`, icon: profileIcon, iconActive: profileIconActive },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsLogoutModalOpen(false);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden md:flex flex-col w-80 bg-[#fffcfa] dark:bg-[#0f0f0f] border-r border-black dark:border-gray-800 transition-colors duration-300 p-8 fixed left-0 top-16 h-[calc(100vh-4rem)] text-black dark:text-white overflow-y-auto">
      {/* Profile Image */}
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-primary to-primary-700 rounded-full blur-lg opacity-90"></div>
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
          const active = isActive(item.path);
          return (
            <NavLink
              key={i}
              to={item.path}
              className={`relative w-full rounded-2xl p-[3px] border ${active ? "border-transparent" : "dark:border-gray-600 border-black"} ${active ? "bg-gradient-to-r from-primary-400 via-primary to-primary-700" : "hover:border-transparent hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary hover:to-primary-700"} transition-all duration-300 block`}
            >
              <span className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0f0f0f]">
                <img src={active ? item.icon : item.icon} className="h-5 w-5 invert dark:invert-0" alt={item.label} />
                <span className={`${active ? "text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary to-primary-700" : ""}`}>
                  {item.label}
                </span>
              </span>
            </NavLink>
          );
        })}

        {/* Logout */}
        <button
          className="group relative w-full rounded-2xl p-[3px] border dark:border-gray-600 border-black hover:border-transparent hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary hover:to-primary-700 transition-all duration-300 mt-6"
          onClick={handleLogoutClick}
        >
          <span className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0f0f0f]">
            <img src={logoutIcon} className="h-5 w-5 invert dark:invert-0" alt="Logout" />
            <span className="text-black dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:via-primary group-hover:to-primary-700 transition-all duration-300">
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