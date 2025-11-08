import React from "react";

// Normal icons
import homeIcon from "../assets/home_button_icon.svg";
import exploreIcon from "../assets/explore_button_icon.svg";
import messageIcon from "../assets/message_button_icon.svg";
import profileIcon from "../assets/profile_button_icon.svg";
import logoutIcon from "../assets/logout_button_icon.svg";

// Highlighted icons
import homeIconActive from "../assets/home_highlighted_button_icon.svg";
import exploreIconActive from "../assets/explore_highlighted_button_icon.svg";
import messageIconActive from "../assets/message_highlighted_button_icon.svg";
import profileIconActive from "../assets/profile_highlighted_button_icon.svg";
import logoutIconActive from "../assets/logout_highlighted_button_icon.svg";

// Profile photo
import profilePhoto from "../assets/profile_photo_random.jpg";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-80 bg-[#0f0f0f] border-r border-gray-800 p-8 fixed left-0 top-20 h-[calc(100vh-5rem)] text-white overflow-y-auto">

      {/* Profile Image */}
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 blur-[35px] opacity-40"></div>
        <img src={profilePhoto} className="relative w-28 h-28 rounded-full object-cover" />
      </div>

      <h2 className="text-lg font-semibold text-center">idkwhoisrahul_04</h2>
      <p className="text-sm text-gray-400 text-center mb-8">Rahul Chauhan</p>

      {/* Stats */}
      <div className="flex justify-center text-center mb-10 text-sm">
        <div className="px-3">
          <p className="font-bold">21</p>
          <p className="text-gray-400 text-xs">Posts</p>
        </div>

        <div className="border-l border-gray-700 mx-2 h-5"></div>

        <div className="px-3">
          <p className="font-bold">738</p>
          <p className="text-gray-400 text-xs">Followers</p>
        </div>

        <div className="border-l border-gray-700 mx-2 h-5"></div>

        <div className="px-3">
          <p className="font-bold">512</p>
          <p className="text-gray-400 text-xs">Following</p>
        </div>
      </div>

      {/* Buttons */}
      <nav className="space-y-4 text-[15px] font-medium">

        {[
          { label: "Home", icon: homeIcon, iconActive: homeIconActive },
          { label: "Explore", icon: exploreIcon, iconActive: exploreIconActive },
          { label: "Messages", icon: messageIcon, iconActive: messageIconActive },
          { label: "Profile", icon: profileIcon, iconActive: profileIconActive },
        ].map((item, i) => (
          <button
            key={i}
            className="group relative w-full rounded-xl p-[2px] border border-gray-600 hover:border-transparent hover:bg-gradient-to-r hover:from-teal-400 hover:via-purple-400 hover:to-pink-400 transition"
          >
            <span className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#0f0f0f]">
              <img src={item.icon} className="h-5 w-5 opacity-90 group-hover:hidden" />
              <img src={item.iconActive} className="h-5 w-5 hidden group-hover:block" />
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-none">
                {item.label}
              </span>
            </span>
          </button>
        ))}

        {/* Logout */}
        <button className="group relative w-full rounded-xl p-[1px] border border-red-500 hover:border-transparent hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-500 transition mt-10">
          <span className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#0f0f0f]">
            <img src={logoutIcon} className="h-5 w-5 opacity-90 group-hover:hidden" />
            <img src={logoutIconActive} className="h-5 w-5 hidden group-hover:block" />
            <span className="text-red-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-pink-500 transition-none">
              Logout
            </span>
          </span>
        </button>

      </nav>
    </aside>
  );
}
