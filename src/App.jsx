import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import HomePage from "./pages/home/HomePage";
import ExplorePage from "./pages/explore/ExplorePage";
import MessagesPage from "./pages/messages/MessagesPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ShopPage from "./pages/shop/ShopPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AuthCallback from "./pages/auth/AuthCallback";
import CreatePost from "./components/CreatePost";
import CommunitiesPage from "./pages/communities/CommunitiesPage";
import CreateCommunity from "./components/CreateCommunity";
import CommunityDetail from "./components/CommunityDetail";
import CommunitySettings from "./components/CommunitySettings";
import Notifications from "./components/Notifications";
import AddStory from "./components/AddStory";
import OtherUserProfile from "./components/OtherUserProfile";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

export default function App() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0);

  // Swipe gesture detection for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
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
  if (!isAuthenticated && location.pathname !== '/auth/callback' && location.pathname !== '/register' && location.pathname !== '/forgot-password') {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Handle OAuth callback route separately
  if (location.pathname === '/auth/callback') {
    return <AuthCallback />;
  }

  // Swipe gesture handlers for mobile navigation
  const handleTouchStart = (e) => {
    if (window.innerWidth >= 768) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (window.innerWidth >= 768) return;
    touchEndX.current = e.changedTouches[0].clientX;
    touchEndY.current = e.changedTouches[0].clientY;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const swipeThreshold = 75;
    const verticalThreshold = 50;
    
    const horizontalDistance = touchStartX.current - touchEndX.current;
    const verticalDistance = Math.abs(touchStartY.current - touchEndY.current);
    
    if (verticalDistance > verticalThreshold) return;
    
    const swipeablePages = ["/home", "/explore", "/messages", "/communities"];
    const currentIndex = swipeablePages.indexOf(location.pathname);
    
    if (currentIndex === -1) return;
    
    if (horizontalDistance > swipeThreshold) {
      const nextIndex = Math.min(currentIndex + 1, swipeablePages.length - 1);
      if (nextIndex !== currentIndex) {
        setSwipeDirection(-1);
        navigate(swipeablePages[nextIndex]);
      }
    }
    
    if (horizontalDistance < -swipeThreshold) {
      const prevIndex = Math.max(currentIndex - 1, 0);
      if (prevIndex !== currentIndex) {
        setSwipeDirection(1);
        navigate(swipeablePages[prevIndex]);
      }
    }
  };

  const handleCreatePostClick = () => {
    setIsCreatePostOpen(true);
  };

  const handleViewUserProfile = (username) => {
    navigate(`/user/${username}`);
  };

  const handleOpenMessage = (username) => {
    navigate(`/messages?user=${username}`);
  };

  const isStoryPage = location.pathname === "/story/add";

  // Wrapper components to pass navigation props
  const HomePageWrapper = () => <HomePage onViewUserProfile={handleViewUserProfile} />;
  const ExplorePageWrapper = () => <ExplorePage onViewUserProfile={handleViewUserProfile} />;
  const MessagesPageWrapper = () => {
    const params = new URLSearchParams(location.search);
    const selectedChatUsername = params.get('user');
    return <MessagesPage onViewUserProfile={handleViewUserProfile} selectedChatUsername={selectedChatUsername} />;
  };
  const ProfilePageWrapper = () => <ProfilePage onLogout={handleLogout} onViewUserProfile={handleViewUserProfile} />;
  const CommunitiesPageWrapper = () => <CommunitiesPage onViewUserProfile={handleViewUserProfile} />;
  const NotificationsWrapper = () => <Notifications onViewUserProfile={handleViewUserProfile} />;
  const UserProfileWrapper = () => {
    const { username } = useParams();
    return <OtherUserProfile username={username} onViewUserProfile={handleViewUserProfile} />;
  };
  const CommunityDetailWrapper = () => {
    const { id } = useParams();
    return <CommunityDetail communityId={id} onViewUserProfile={handleViewUserProfile} />;
  };
  const CommunitySettingsWrapper = () => {
    const { id } = useParams();
    return <CommunitySettings communityId={id} onViewUserProfile={handleViewUserProfile} />;
  };

  return (
    <div 
      className="bg-[#fffcfa] dark:bg-black text-black dark:text-white min-h-screen flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!isStoryPage && (
        <>
          <Navbar onCreatePostClick={handleCreatePostClick} />

          <div className="flex flex-1 overflow-hidden pb-14 md:pb-0">
            <Sidebar onLogout={handleLogout} />

            <div className="flex-1 md:ml-80 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={location.pathname}
                  initial={{ 
                    x: swipeDirection === 0 ? 0 : swipeDirection > 0 ? -50 : 50,
                    opacity: 0 
                  }}
                  animate={{ 
                    x: 0, 
                    opacity: 1 
                  }}
                  exit={{ 
                    x: swipeDirection === 0 ? 0 : swipeDirection > 0 ? 50 : -50,
                    opacity: 0 
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                  }}
                  className="h-full"
                >
                  <Routes>
                    <Route path="/home" element={<HomePageWrapper />} />
                    <Route path="/explore" element={<ExplorePageWrapper />} />
                    <Route path="/messages" element={<MessagesPageWrapper />} />
                    <Route path="/profile" element={<ProfilePageWrapper />} />
                    <Route path="/user/:username" element={<UserProfileWrapper />} />
                    <Route path="/communities" element={<CommunitiesPageWrapper />} />
                    <Route path="/communities/create" element={<CreateCommunity />} />
                    <Route path="/communities/:id" element={<CommunityDetailWrapper />} />
                    <Route path="/communities/:id/settings" element={<CommunitySettingsWrapper />} />
                    <Route path="/notifications" element={<NotificationsWrapper />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <MobileNav />
        </>
      )}

      {isStoryPage && (
        <Routes>
          <Route path="/story/add" element={<AddStory />} />
        </Routes>
      )}

      <CreatePost
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
}
