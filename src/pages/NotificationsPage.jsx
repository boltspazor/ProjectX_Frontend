import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import LiveProfilePhoto from "../components/LiveProfilePhoto";
import { getProfileVideoUrl } from "../utils/profileVideos";

export default function NotificationsPage({ setActiveView }) {
  const [notifications, setNotifications] = useState({
    today: [
      {
        id: 1,
        type: "follow",
        avatar: "https://i.pravatar.cc/100?img=50",
        message: "pxhf_12 started following you",
        action: "Follow Back",
        actionType: "follow_back",
        isFollowing: false,
      },
      {
        id: 2,
        type: "story_like",
        avatar: "https://i.pravatar.cc/100?img=51",
        message: "xsd_hgf and 12 others liked your story",
        action: null,
      },
      {
        id: 3,
        type: "comment",
        avatar: "https://i.pravatar.cc/100?img=52",
        message: "shane_xd commented on your post: padhle bhai..",
        action: null,
      },
    ],
    yesterday: [
      {
        id: 4,
        type: "follow_request",
        avatar: "https://i.pravatar.cc/100?img=53",
        message: "garvv_pvt requested to follow you",
        action: "Confirm",
        actionType: "confirm_request",
        showDismiss: true,
      },
      {
        id: 5,
        type: "follow_request",
        avatar: "https://i.pravatar.cc/100?img=54",
        message: "masooom requested to follow you",
        action: "Confirm",
        actionType: "confirm_request",
        showDismiss: true,
      },
    ],
    thisWeek: [
      {
        id: 6,
        type: "follow",
        avatar: "https://i.pravatar.cc/100?img=51",
        message: "xsd_hgf started following you",
        action: "Following",
        actionType: "following",
        isFollowing: true,
      },
      {
        id: 7,
        type: "follow_request",
        avatar: "https://i.pravatar.cc/100?img=53",
        message: "garvv_pvt requested to follow you",
        action: "Confirm",
        actionType: "confirm_request",
        showDismiss: true,
      },
      {
        id: 8,
        type: "community_post",
        avatar: "https://via.placeholder.com/48",
        icon: "code",
        message: "72daysdesign posted in community: Ways to capture the..",
        action: null,
      },
      {
        id: 9,
        type: "community_post",
        avatar: "https://via.placeholder.com/48",
        icon: "code",
        message: "72daysdesign posted in community: Ways to capture the..",
        action: null,
      },
      {
        id: 10,
        type: "community_post",
        avatar: "https://via.placeholder.com/48",
        icon: "code",
        message: "72daysdesign posted in community:",
        action: null,
      },
    ],
  });

  const handleAction = (notificationId, section, actionType) => {
    setNotifications((prev) => {
      const updated = { ...prev };
      const notification = updated[section].find((n) => n.id === notificationId);

      if (actionType === "follow_back" || actionType === "confirm_request") {
        notification.isFollowing = true;
        notification.action = "Following";
        notification.actionType = "following";
        notification.showDismiss = false;
      } else if (actionType === "dismiss") {
        updated[section] = updated[section].filter((n) => n.id !== notificationId);
      }

      return updated;
    });
  };

  const renderNotification = (notification, section) => (
    <motion.div
      key={notification.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3 px-4 py-3 rounded-xl border border-gray-800 bg-[#0f0f0f] hover:border-gray-700 transition-all duration-300"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {notification.icon === "code" ? (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <LiveProfilePhoto
              imageSrc={notification.avatar}
              videoSrc={getProfileVideoUrl(notification.avatar, null)}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        )}
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white leading-relaxed">{notification.message}</p>
      </div>

      {/* Action Button */}
      {notification.action && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => handleAction(notification.id, section, notification.actionType)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              notification.isFollowing
                ? "bg-gray-800 text-gray-400 border border-gray-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {notification.action}
          </button>
          {notification.showDismiss && (
            <button
              onClick={() => handleAction(notification.id, section, "dismiss")}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </motion.div>
  );

  const renderSection = (title, sectionKey) => {
    const sectionNotifications = notifications[sectionKey];
    if (sectionNotifications.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 px-4">{title}</h3>
        <div className="space-y-3">
          {sectionNotifications.map((notification) =>
            renderNotification(notification, sectionKey)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black border-b border-gray-800 md:hidden">
        <div className="flex items-center gap-4 px-4 py-3">
          <button
            onClick={() => setActiveView("home")}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-white">Notifications</h1>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Notifications</h1>
          <button
            onClick={() => setActiveView(null)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            title="Close"
          >
            <X className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 overflow-y-auto scrollbar-hide">
        {renderSection("Today", "today")}
        {renderSection("Yesterday", "yesterday")}
        {renderSection("This Week", "thisWeek")}
      </div>
    </div>
  );
}