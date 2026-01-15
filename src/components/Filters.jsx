import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search } from "lucide-react";

export default function Filters({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  isAIEnabled,
  setIsAIEnabled,
}) {
  const tabs = useMemo(() => ["Posts", "Accounts"], []);
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
  }, [activeTab, tabs]);

  return (
    <div className="w-full flex flex-col gap-4 mb-6">
      {/* Top Row: Tabs + Search + AI Toggle */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        {/* Tabs */}
        <div className="relative flex items-center gap-6 text-sm md:text-base font-medium">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[i] = el)}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-1 transition-colors duration-300 ${activeTab === tab
                  ? "text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}

          {/* Underline indicator */}
          <div
            className="absolute bottom-0 h-[2px] rounded-full bg-gradient-to-r from-primary-400 via-primary to-primary-700 shadow-[0_0_8px_rgba(119, 5, 36,0.5)] transition-all duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)]"
            style={indicatorStyle}
          ></div>
        </div>

        {/* Search + AI Toggle */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* 🔍 Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 text-black dark:text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gradient-to-r from-secondary-100 to-secondary-50 dark:from-gray-800 dark:to-gray-900 border border-black dark:border-gray-600 rounded-full pl-9 pr-4 py-2 text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary-400 transition"
            />
          </div>

          {/* AI Filter Switch */}
          <button
            onClick={() => setIsAIEnabled(!isAIEnabled)}
            className={`relative w-12 h-6 flex items-center rounded-full transition-all duration-500 flex-shrink-0 border border-black ${isAIEnabled
                ? "bg-gradient-to-r from-primary-400 to-primary-700"
                : "bg-gradient-to-r from-secondary-200 to-secondary-100 dark:from-gray-700 dark:to-gray-800"
              }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-500 text-[9px] font-bold ${isAIEnabled
                  ? "left-7 bg-white text-black"
                  : "left-1 bg-white text-black dark:bg-gray-300 dark:text-gray-900"
                }`}
            >
              AI
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}