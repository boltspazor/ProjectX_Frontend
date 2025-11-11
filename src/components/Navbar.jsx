import React from "react";
import logo from "../assets/logo.svg";
import bell from "../assets/bell.svg";
import shop from "../assets/shop.svg";

export default function Navbar({ setActiveView }) {
  return (
    <header className="w-full h-16 md:h-20 border-b border-gray-800 px-4 md:px-6 flex items-center justify-between sticky top-0 bg-black z-20">
      <img src={logo} alt="Project Logo" className="h-7 md:h-9 select-none" />

      <div className="flex items-center gap-4 md:gap-6">
        <img
          src={shop}
          alt="Shop"
          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer opacity-90 hover:opacity-100 transition"
        />
        <img
          src={bell}
          alt="Notifications"
          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer opacity-90 hover:opacity-100 transition"
        />

        <button
          onClick={() => setActiveView("createPost")}
          className="relative rounded-full p-[2px] animate-spin-slow-glow hover:opacity-90"
        >
          <span className="block px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-medium rounded-full bg-black text-white border border-purple-500 ">
            Create a Post
          </span>
        </button>
      </div>
    </header>
  );
}
