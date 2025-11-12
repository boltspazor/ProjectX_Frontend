/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import profilePhoto from "../assets/profile-photo.jpg";
import homeIcon from "../assets/home_mobnav_icon.png";
import exploreIcon from "../assets/explore_mobnav_icon.png";
import messageIcon from "../assets/message_mobnav_icon.png";
import shopIcon from "../assets/shop_mobnav_icon.png";

export default function MobileNav({ activeView, setActiveView }) {
  const [showCommunities, setShowCommunities] = React.useState(false);

  const navItems = [
    { id: "home", icon: homeIcon, view: "home" },
    { id: "explore", icon: exploreIcon, view: "explore" },
    { id: "profile", icon: profilePhoto, view: "profile", isProfile: true },
    { id: "messages", icon: messageIcon, view: "messages" },
    { id: "communities", icon: shopIcon, view: "communities", isCommunities: true },
  ];

  const communities = [
    { name: "Music Lovers", members: "2.3k", image: "https://i.pravatar.cc/100?img=50" },
    { name: "Tech Enthusiasts", members: "5.1k", image: "https://i.pravatar.cc/100?img=51" },
    { name: "Photography", members: "1.8k", image: "https://i.pravatar.cc/100?img=52" },
  ];

  const handleNavClick = (view) => {
    if (view === "communities") {
      setShowCommunities(!showCommunities);
    } else {
      setActiveView(view);
      setShowCommunities(false);
    }
  };

  const isActive = (view) => {
    return activeView === view;
  };

  return (
    <>
      {/* Communities Drawer */}
      {showCommunities && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCommunities(false)}
            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8
            }}
            className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-800 rounded-t-3xl z-50 pb-24"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
              <h3 className="text-lg font-semibold text-white mb-4">Your Communities</h3>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {communities.map((community, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-white">{community.name}</p>
                      <p className="text-xs text-gray-400">{community.members} members</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 pb-5 pt-3">
        {/* Background with subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#0a0a0a]/90 to-transparent pointer-events-none"></div>
        
        {/* Navigation Container */}
        <div className="relative flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4">
          {navItems.map((item, index) => {
            const active = isActive(item.view) || (item.isCommunities && showCommunities);
            const isCenter = item.isProfile;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.view)}
                className="relative focus:outline-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Gradient Border Container */}
                <motion.div
                  className={`
                    relative rounded-full
                    ${isCenter ? "w-14 h-14 sm:w-16 sm:h-16 p-[2.5px] sm:p-[3px]" : "w-11 h-11 sm:w-12 sm:h-12 p-[2px] sm:p-[2.5px]"}
                  `}
                  animate={{
                    background: active
                      ? "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)"
                      : "linear-gradient(135deg, rgba(251, 146, 60, 0.4) 0%, rgba(249, 115, 22, 0.4) 50%, rgba(234, 88, 12, 0.4) 100%)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    filter: active 
                      ? "drop-shadow(0 0 10px rgba(251, 146, 60, 0.5)) drop-shadow(0 0 20px rgba(249, 115, 22, 0.4)) drop-shadow(0 0 30px rgba(234, 88, 12, 0.3))" 
                      : "drop-shadow(0 0 5px rgba(251, 146, 60, 0.25))",
                  }}
                >
                  {/* Inner Circle */}
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                    {isCenter ? (
                      <motion.img
                        src={item.icon}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    ) : (
                      <motion.img
                        src={item.icon}
                        alt={item.id}
                        className={`${isCenter ? "w-full h-full" : "w-6 h-6 sm:w-7 sm:h-7"} object-contain`}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        animate={{
                          opacity: active ? 1 : 0.7,
                          scale: active ? 1 : 0.95,
                        }}
                      />
                    )}
                  </div>

                  {/* Subtle inner glow for active state */}
                  {active && !isCenter && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: "radial-gradient(circle at center, rgba(251, 146, 60, 0.12) 0%, transparent 70%)",
                      }}
                    />
                  )}
                </motion.div>

                {/* Subtle pulse ring for active center profile */}
                {active && isCenter && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      border: "2px solid rgba(251, 146, 60, 0.35)",
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
