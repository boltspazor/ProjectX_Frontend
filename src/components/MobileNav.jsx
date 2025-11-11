import React from "react";

export default function MobileNav({ activeView, setActiveView }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 text-white flex justify-around py-3 text-xs z-30">
      <button
        onClick={() => setActiveView("home")}
        className={`px-3 py-2 rounded-lg transition ${
          activeView === "home" ? "text-purple-400 font-semibold" : "text-gray-400"
        }`}
      >
        Home
      </button>
      <button
        onClick={() => setActiveView("explore")}
        className={`px-3 py-2 rounded-lg transition ${
          activeView === "explore" ? "text-purple-400 font-semibold" : "text-gray-400"
        }`}
      >
        Explore
      </button>
      <button
        onClick={() => setActiveView("messages")}
        className={`px-3 py-2 rounded-lg transition ${
          activeView === "messages" ? "text-purple-400 font-semibold" : "text-gray-400"
        }`}
      >
        Messages
      </button>
      <button
        onClick={() => setActiveView("profile")}
        className={`px-3 py-2 rounded-lg transition ${
          activeView === "profile" ? "text-purple-400 font-semibold" : "text-gray-400"
        }`}
      >
        Profile
      </button>
  </div>
 );
}