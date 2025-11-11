import React from "react";
import homeIcon from "../assets/home.svg";
import exploreIcon from "../assets/explore.svg";
import messageIcon from "../assets/message.svg";
import shopIcon from "../assets/shop.svg";
import profilePhoto from "../assets/profile-photo.jpg";

export default function MobileNav({ activeView, setActiveView }) {
  const navItems = [
    { id: "home", icon: homeIcon },
    { id: "explore", icon: exploreIcon },
    { id: "messages", icon: messageIcon },
    { id: "shop", icon: shopIcon },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0f0f0f] flex justify-center items-end pb-6 z-50">
      {/* Curved container */}
      <div className="relative flex items-end justify-between w-[90%] max-w-[400px] px-4 pb-3">
        
        {/* Left side icons */}
        <div className="flex gap-8">
          {navItems.slice(0, 2).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className="relative flex items-center justify-center w-12 h-12"
            >
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 blur-sm transition ${
                  activeView === item.id ? "opacity-100" : "opacity-40"
                }`}
              ></div>
              <div className="relative w-12 h-12 rounded-full bg-[#0f0f0f] border-2 border-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 p-[2px]">
                <div className="flex items-center justify-center w-full h-full bg-[#0f0f0f] rounded-full">
                  <img src={item.icon} alt={item.id} className="w-5 h-5" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Center profile image */}
        <div
          onClick={() => setActiveView("profile")}
          className="relative -translate-y-8 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 rounded-full blur-lg opacity-80 animate-pulse"></div>
          <img
            src={profilePhoto}
            alt="Profile"
            className={`relative w-16 h-16 rounded-full object-cover border-[3px] ${
              activeView === "profile"
                ? "border-purple-400"
                : "border-[#0f0f0f]"
            }`}
          />
        </div>

        {/* Right side icons */}
        <div className="flex gap-8">
          {navItems.slice(2).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className="relative flex items-center justify-center w-12 h-12"
            >
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 blur-sm transition ${
                  activeView === item.id ? "opacity-100" : "opacity-40"
                }`}
              ></div>
              <div className="relative w-12 h-12 rounded-full bg-[#0f0f0f] border-2 border-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 p-[2px]">
                <div className="flex items-center justify-center w-full h-full bg-[#0f0f0f] rounded-full">
                  <img src={item.icon} alt={item.id} className="w-5 h-5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
