import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import ShopPage from "./pages/ShopPage";
import CreatePost from "./components/CreatePost"; // ✅ import the new component
import CommunitiesPage from "./pages/CommunitiesPage";
import NotificationsPage from "./pages/NotificationsPage";

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // ✅ include createPost view
  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomePage />;
      case "explore":
        return <ExplorePage />;
      case "messages":
        return <MessagesPage />;
      case "communities":
        return <CommunitiesPage />;
      case "profile":
        return <ProfilePage />;
      case "shop":
        return <ShopPage />;
      case "notifications":
        return <NotificationsPage setActiveView={setActiveView} />;
      case "createPost":
        // Legacy full page view - will be handled by modal now
        return <HomePage />;
      default:
        return <HomePage />;
    }
  };

  // Handle create post button click
  const handleCreatePostClick = () => {
    setIsCreatePostOpen(true);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* ✅ Pass handleCreatePostClick to Navbar */}
      <Navbar setActiveView={setActiveView} onCreatePostClick={handleCreatePostClick} />

      {/* Sidebar + Main Content layout */}
      <div className="flex flex-1 overflow-hidden pb-14 md:pb-0">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        <div className="flex-1 md:ml-80 overflow-hidden">
          {renderView()}
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav activeView={activeView} setActiveView={setActiveView} />

      {/* Create Post Modal */}
      <CreatePost
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        setActiveView={setActiveView}
      />
    </div>
  );
}
