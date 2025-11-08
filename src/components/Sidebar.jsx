import React from "react";

import homeIcon from "../assets/home_button_icon.svg";
import exploreIcon from "../assets/explore_button_icon.svg";
import messageIcon from "../assets/message_button_icon.svg";
import profileIcon from "../assets/profile_button_icon.svg";
import logoutIcon from "../assets/logout_button_icon.svg";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-80 bg-[#0f0f0f] border-r border-gray-800 p-8 sticky top-0 h-screen text-white">

      {/* Profile */}
      <div className="w-28 h-28 rounded-full overflow-hidden mb-4 mx-auto bg-gray-700"></div>
      <h2 className="text-lg font-semibold text-center">idkwhoisrahul_04</h2>
      <p className="text-sm text-gray-400 text-center mb-8">Rahul Chauhan</p>

      {/* Stats */}
      <div className="flex justify-around text-center mb-10 text-sm">
        <div>
          <p className="font-bold">21</p>
          <p className="text-gray-400">Posts</p>
        </div>
        <div>
          <p className="font-bold">738</p>
          <p className="text-gray-400">Followers</p>
        </div>
        <div>
          <p className="font-bold">512</p>
          <p className="text-gray-400">Following</p>
        </div>
      </div>

      {/* Sidebar Buttons */}
      <nav className="space-y-4 text-[15px] font-medium">

      

        {/* INACTIVE BUTTONS */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-600 hover:border-purple-400 transition">
          <img src={exploreIcon} className="h-5 w-5 opacity-90" />
          <span>Home</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-600 hover:border-purple-400 transition">
          <img src={exploreIcon} className="h-5 w-5 opacity-90" />
          <span>Explore</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-600 hover:border-purple-400 transition">
          <img src={messageIcon} className="h-5 w-5 opacity-90" />
          <span>Messages</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-600 hover:border-purple-400 transition">
          <img src={profileIcon} className="h-5 w-5 opacity-90" />
          <span>Profile</span>
        </button>

        {/* LOGOUT */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition mt-10">
          <img src={logoutIcon} className="h-5 w-5 opacity-90" />
          <span>Logout</span>
        </button>

      </nav>
    </aside>
  );
}
