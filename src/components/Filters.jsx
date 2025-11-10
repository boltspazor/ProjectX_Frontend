import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

export default function Filters({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
}) {
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const tabs = ["Posts", "Accounts", "Communities"];
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);

  // 🔹 Calculate underline position and width
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const currentTab = tabRefs.current[activeIndex];

    if (currentTab) {
      const tabRect = currentTab.getBoundingClientRect();
      const parentRect = currentTab.parentElement.getBoundingClientRect();
      const left = tabRect.left - parentRect.left;

      setIndicatorStyle({
        width: `${tabRect.width}px`,
        transform: `translateX(${left}px)`,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 mb-6">
      {/* Tabs */}
      <div className="relative flex items-center gap-6 text-sm md:text-base font-medium">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[i] = el)}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-1 transition-colors duration-300 ${
              activeTab === tab
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* Underline indicator */}
        <div
          className="absolute bottom-0 h-[2px] rounded-full bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)] transition-all duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)]"
          style={indicatorStyle}
        ></div>
      </div>

      {/* Search + AI Toggle */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* 🔍 Search bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm} // 👈 linked to Feed.jsx
            onChange={(e) => setSearchTerm(e.target.value)} // 👈 updates Feed.jsx
            className="w-full bg-[#0f0f0f] border border-gray-800 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* AI Filter Switch */}
        <button
          onClick={() => setIsAIEnabled(!isAIEnabled)}
          className={`relative w-12 h-6 flex items-center rounded-full transition-all duration-500 ${
            isAIEnabled
              ? "bg-gradient-to-r from-purple-500 to-pink-500"
              : "bg-gray-700"
          }`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white text-[9px] font-bold text-black flex items-center justify-center transition-all duration-500 ${
              isAIEnabled ? "translate-x-6 bg-black text-white" : "translate-x-0"
            }`}
          >
            AI
          </span>
        </button>
      </div>
    </div>
  );
}
