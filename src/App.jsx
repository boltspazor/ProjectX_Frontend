import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./components/CreatePost"; // ✅ import the new component

export default function App() {
  const [activeView, setActiveView] = useState("home");

  // ✅ include createPost view
  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomePage />;
      case "explore":
        return <ExplorePage />;
      case "messages":
        return <MessagesPage />;
      case "profile":
        return <ProfilePage />;
      case "createPost":
        return <CreatePost setActiveView={setActiveView} />; // pass back function for "←" navigation
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* ✅ Pass setActiveView to Navbar */}
      <Navbar setActiveView={setActiveView} />

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
