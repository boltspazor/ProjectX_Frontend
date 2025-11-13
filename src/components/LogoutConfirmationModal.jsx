import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoutConfirmationModal({ isOpen, onClose, onConfirm }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Modal Container - Centers the modal */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
              className="w-full max-w-[320px] sm:max-w-[360px] bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                  Log out
                </h2>

                {/* Message */}
                <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8 leading-relaxed">
                  You will be returned to the login screen.
                </p>

                {/* Buttons */}
                <div className="flex border-t border-gray-800 pt-4 md:pt-5">
                  {/* Cancel Button */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 md:px-5 py-2.5 md:py-3 text-orange-500 font-medium text-sm md:text-base hover:text-orange-400 transition-colors text-center"
                  >
                    Cancel
                  </motion.button>

                  {/* Divider */}
                  <div className="w-px bg-gray-800 mx-1"></div>

                  {/* Logout Button */}
                  <motion.button
                    onClick={handleConfirm}
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 md:px-5 py-2.5 md:py-3 text-orange-500 font-medium text-sm md:text-base hover:text-orange-400 transition-colors text-center"
                  >
                    Log out
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}