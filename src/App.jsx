import { useState, useEffect } from "react";
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
import CreateCommunity from "./pages/CreateCommunity";
import CommunityDetailPage from "./pages/CommunityDetailPage";
import NotificationsPage from "./pages/NotificationsPage";
import AddStoryPage from "./pages/AddStoryPage";

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState("login"); // "login" or "signup"

  // Check for existing valid token on mount
  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem("authToken");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (token && tokenExpiry) {
        const expiryTime = parseInt(tokenExpiry, 10);
        const currentTime = Date.now();

        // Check if token is still valid (within 2 hours)
        if (currentTime < expiryTime) {
          setIsAuthenticated(true);
        } else {
          // Token expired, clear storage
          localStorage.removeItem("authToken");
          localStorage.removeItem("tokenExpiry");
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthToken();
  }, []);

  // Handle login
  const handleLogin = () => {
    // Generate a simple token (in production, this would come from backend)
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiryTime = Date.now() + (2 * 60 * 60 * 1000); // 2 hours from now

    // Store token and expiry in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiry", expiryTime.toString());

    setIsAuthenticated(true);
  };

  // Handle signup
  const handleSignup = () => {
    // Generate a simple token (in production, this would come from backend)
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiryTime = Date.now() + (2 * 60 * 60 * 1000); // 2 hours from now

    // Store token and expiry in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiry", expiryTime.toString());

    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
    setIsAuthenticated(false);
    setActiveView("home");
    setAuthView("login");
  };

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

  // Handle view changes with community ID
  const handleViewChange = (view, communityId = null) => {
    setActiveView(view);
    setSelectedCommunityId(communityId);
  };

  // ✅ include createPost view
  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomePage setActiveView={handleViewChange} />;
      case "explore":
        return <ExplorePage />;
      case "messages":
        return <MessagesPage />;
      case "communities":
        return <CommunitiesPage setActiveView={handleViewChange} />;
      case "createCommunity":
        return <CreateCommunity setActiveView={handleViewChange} />;
      case "communityDetail":
        return <CommunityDetailPage setActiveView={handleViewChange} communityId={selectedCommunityId} />;
      case "profile":
        return <ProfilePage onLogout={handleLogout} />;
      case "shop":
        return <ShopPage />;
      case "notifications":
        return <NotificationsPage setActiveView={setActiveView} />;
      case "addStory":
        return <AddStoryPage setActiveView={handleViewChange} />;
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
    <div className="bg-black text-white min-h-screen flex flex-col">
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
