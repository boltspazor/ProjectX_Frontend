import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Home from "./components/Home";
import Messages from "./components/Messages";
import MobileNav from "./components/MobileNav";

export default function App() {
  const [activeView, setActiveView] = useState("home");

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <Home />;
      case "explore":
        return <Feed />;
      case "messages":
        return <Messages />;
      case "profile":
        return <div className="flex-1 p-8 text-center text-gray-400">Profile Coming Soon</div>;
      default:
        return <Home />;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      
      {/* Full-width navbar */}
      <Navbar />

      {/* Sidebar + Main Content layout */}
      <div className="flex flex-1 overflow-hidden pb-14 md:pb-0">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 md:ml-80 overflow-hidden">
          {renderView()}
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}