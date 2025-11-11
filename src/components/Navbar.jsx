import React from "react";
import logo from "../assets/logo.png";
import bell from "../assets/bell.svg";
import shop from "../assets/shop.svg";

export default function Navbar({ setActiveView, onCreatePostClick }) {
  const handleCreatePost = () => {
    if (onCreatePostClick) {
      onCreatePostClick();
    } else {
      // Fallback to legacy behavior
      setActiveView("createPost");
    }
  };

  return (
    <header className="w-full h-20 md:h-24 border-b border-gray-800 px-4 md:px-2 flex items-center justify-between sticky top-0 bg-black z-20">
      <div className="flex items-center py-2 md:py-3">
        <img
          src={logo}
          alt="Project Logo"
          className="h-12 md:h-16 w-auto select-none object-contain cursor-pointer hover:opacity-90 transition-opacity"
        />
        
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <img
          src={shop}
          alt="Shop"
          onClick={() => setActiveView("shop")}
          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer opacity-90 hover:opacity-100 transition"
        />
        <img
          src={bell}
          alt="Notifications"
          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer opacity-90 hover:opacity-100 transition"
        />

        <button
          onClick={handleCreatePost}
          className="relative rounded-full p-[2px] animate-spin-slow-glow hover:opacity-90"
        >
          <span className="block px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-medium rounded-full bg-black text-white border border-orange-500 ">
            Create a Post
          </span>
        </button>
      </div>
    </header>
  );
}
