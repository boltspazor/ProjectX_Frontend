/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from "../assets/profile-photo.jpg";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("store");

  return (
    <main className="flex-1 overflow-y-auto h-[calc(100vh-7.5rem)] md:h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("store")}
            className={`relative pb-4 text-lg font-medium transition-colors duration-300 ${
              activeTab === "store" ? "text-white" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Store
            {activeTab === "store" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`relative pb-4 text-lg font-medium transition-colors duration-300 ${
              activeTab === "history" ? "text-white" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            History
            {activeTab === "history" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "store" && (
            <motion.div
              key="store"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl overflow-hidden bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-6 md:p-12 text-center"
              >
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    Enjoy the integration of AI with Just One Click
                  </h2>
                  <p className="text-xs md:text-sm lg:text-base text-white/90 max-w-3xl mx-auto leading-relaxed">
                    Don't miss out on features like AI avatar, image, caption, bio, and theme generation and many exciting features
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 md:mt-6 px-6 py-2.5 md:py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </motion.div>

              {/* Buy Credits Section */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Buy Credits</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Pay-per-use model (1 credit = ₹0.1)
                </p>

                {/* Credit Packages */}
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  {/* Large Package - Left Side */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="md:w-1/4 bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 cursor-pointer hover:border-orange-500 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-lg"></div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Package Name</h4>
                        <p className="text-gray-400 text-sm">Credits</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Smaller Packages - Right Side */}
                  <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + item * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 cursor-pointer hover:border-orange-500 transition-all duration-300"
                      >
                        <div className="space-y-3">
                          <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
                          <div>
                            <h4 className="text-base font-semibold text-white mb-1">Package</h4>
                            <p className="text-gray-400 text-xs">Credits</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rewards & Offers Section */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Rewards & Offers</h3>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 text-center text-gray-400">
                  <p>No rewards or offers available at the moment</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Credit Balance Section */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Credit Balance</h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                >
                  <div className="bg-[#1a1a1a] rounded-[10px] p-6 md:p-8 h-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                      <div className="space-y-1 md:space-y-2">
                        <p className="text-gray-400 text-sm md:text-base">You currently have:</p>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">700 Credits</p>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4">
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-700 flex-shrink-0"
                        />
                        <div className="text-left md:text-right">
                          <p className="text-white font-medium text-sm md:text-base">Rahul Chauhan</p>
                          <p className="text-gray-400 text-xs md:text-sm">UPI ID: rahul@okaxisbank</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Credit History Section */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Credit History</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: item * 0.05 }}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 min-h-[80px]"
                    >
                      {/* Empty placeholder - will be filled with actual history data */}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

