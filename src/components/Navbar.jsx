import React from "react";
import logo from "../assets/projectX_logo.svg";
import bell from "../assets/bell_icon.svg";
import shop from "../assets/shop_icon.svg";

export default function Navbar() {
  return (
    <header className="w-full h-20 border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 bg-black z-20">

   
      <img src={logo} alt="Project Logo" className="h-9 select-none" />

     
      <div className="flex items-center gap-6">

        <img
          src={shop}
          alt="Shop"
          className="h-6 w-6 cursor-pointer opacity-90 hover:opacity-100 transition"
        />

        <img
          src={bell}
          alt="Notifications"
          className="h-6 w-6 cursor-pointer opacity-90 hover:opacity-100 transition"
        />

        <button className="relative rounded-full p-[2px] bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 hover:opacity-90 transition">
  <span className="block px-5 py-2 text-sm font-medium rounded-full bg-black text-white">
    Create a Post
  </span>
</button>


      </div>
    </header>
  );
}
