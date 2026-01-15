import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full border-2 border-primary bg-transparent overflow-hidden transition-all duration-300 hover:opacity-80"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-1"
        animate={{ x: theme === "dark" ? 0 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Sun Icon */}
        <div className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ${theme === "light" ? "bg-primary" : "bg-transparent"
          }`}>
          <Sun className={`w-3.5 h-3.5 ${theme === "light" ? "text-white" : "text-primary"
            }`} />
        </div>

        {/* Moon Icon */}
        <div className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ${theme === "dark" ? "bg-primary" : "bg-transparent"
          }`}>
          <Moon className={`w-3.5 h-3.5 ${theme === "dark" ? "text-white" : "text-primary"
            }`} />
        </div>
      </motion.div>
    </button>
  );
}