import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreatePost from "./components/CreatePost";
import CommunitiesPage from "./pages/CommunitiesPage";
import CreateCommunity from "./components/CreateCommunity";
import CommunityDetail from "./components/CommunityDetail";
import Notifications from "./components/Notifications";
import AddStory from "./components/AddStory";
import OtherUserProfile from "./components/OtherUserProfile";

export default function App() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [activeView, setActiveView] = useState("home");
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [viewedUsername, setViewedUsername] = useState(null);
  const [selectedChatUsername, setSelectedChatUsername] = useState(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [authView, setAuthView] = useState("login"); // "login" or "signup"

  // Handle login success
  const handleLogin = () => {
    // Auth context already handles the login, just need to reset view
    setAuthView("login");
  };

  // Handle signup success
  const handleSignup = () => {
    // Auth context already handles the signup, just need to reset view
    setAuthView("login");
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setActiveView("home");
    setAuthView("login");
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#fdecdf] dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login/signup
  if (!isAuthenticated) {
    if (authView === "login") {
      return (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthView("signup")}
        />
      );
    } else {
      return (
        <SignupPage
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthView("login")}
        />
      );
    }
  }

  // Handle view changes with community ID or username
  const handleViewChange = (view, communityId = null, username = null, chatUsername = null) => {
    setActiveView(view);
    setSelectedCommunityId(communityId);
    setViewedUsername(username);
    // Set or clear selectedChatUsername based on whether we're navigating to messages
    if (view === "messages" && chatUsername !== undefined) {
      setSelectedChatUsername(chatUsername);
    } else if (view !== "messages") {
      // Clear selectedChatUsername when navigating away from messages
      setSelectedChatUsername(null);
    }
  };
  
  // Handle viewing user profile
  const handleViewUserProfile = (username) => {
    setActiveView("userProfile");
    setViewedUsername(username);
  };

  // Handle opening message with specific user
  const handleOpenMessage = (username) => {
    setActiveView("messages");
    setSelectedChatUsername(username);
  };

  // ✅ include createPost view
  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomePage setActiveView={handleViewChange} onViewUserProfile={handleViewUserProfile} />;
      case "explore":
        return <ExplorePage onViewUserProfile={handleViewUserProfile} />;
      case "messages":
        return <MessagesPage onViewUserProfile={handleViewUserProfile} selectedChatUsername={selectedChatUsername} />;
      case "communities":
        return <CommunitiesPage setActiveView={handleViewChange} onViewUserProfile={handleViewUserProfile} />;
      case "createCommunity":
        return <CreateCommunity setActiveView={handleViewChange} />;
      case "communityDetail":
        return <CommunityDetail setActiveView={handleViewChange} communityId={selectedCommunityId} onViewUserProfile={handleViewUserProfile} />;
      case "profile":
        return <ProfilePage onLogout={handleLogout} onViewUserProfile={handleViewUserProfile} />;
      case "shop":
        return <ShopPage />;
      case "notifications":
        return <Notifications setActiveView={setActiveView} onViewUserProfile={handleViewUserProfile} />;
      case "addStory":
        return <AddStory setActiveView={handleViewChange} />;
      case "userProfile":
        return <OtherUserProfile username={viewedUsername} setActiveView={handleViewChange} onViewUserProfile={handleViewUserProfile} />;
      case "createPost":
        // Legacy full page view - will be handled by modal now
        return <HomePage setActiveView={handleViewChange} />;
      default:
        return <HomePage setActiveView={handleViewChange} />;
    }
  };

  // Handle create post button click
  const handleCreatePostClick = () => {
    setIsCreatePostOpen(true);
  };

  // Full screen for story page
  const isStoryPage = activeView === "addStory";

  return (
    <div className="bg-[#fffcfa] dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
      {/* Hide Navbar/Sidebar for Story Page */}
      {!isStoryPage && (
        <>
          {/* ✅ Pass handleCreatePostClick to Navbar */}
          <Navbar setActiveView={setActiveView} onCreatePostClick={handleCreatePostClick} />

      {/* Sidebar + Main Content layout */}
      <div className="flex flex-1 overflow-hidden pb-14 md:pb-0">
            <Sidebar activeView={activeView} setActiveView={handleViewChange} onLogout={handleLogout} />

        <div className="flex-1 md:ml-80 overflow-hidden">
          {renderView()}
        </div>
      </div>

      {/* Mobile bottom navigation */}
          <MobileNav activeView={activeView} setActiveView={handleViewChange} />
        </>
      )}

      {/* Story Page - Full Screen */}
      {isStoryPage && renderView()}

      {/* Create Post Modal */}
      <CreatePost
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        setActiveView={setActiveView}
      />
    </div>
  );
}
