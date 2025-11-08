import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import MobileNav from "./components/MobileNav";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      
      {/* Full-width navbar */}
      <Navbar />

      {/* Sidebar + Feed layout */}
      <div className="flex flex-1">
        <Sidebar />
        <Feed />
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
