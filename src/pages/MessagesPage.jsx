import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send } from "lucide-react";
import LiveProfilePhoto from "../components/LiveProfilePhoto";
import { getProfileVideoUrl } from "../utils/profileVideos";
import themeIcon from "../assets/theme.svg";
import catTheme from "../assets/cat_theme.jpg";
import xoxoTheme from "../assets/xoxo_theme.jpg";

export default function MessagesPage({ onViewUserProfile, selectedChatUsername }) {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you doing?", sender: "receiver", time: "10:30 AM" },
    { id: 2, text: "I'm good! Thanks for asking", sender: "sender", time: "10:32 AM" },
    { id: 3, text: "What about you?", sender: "sender", time: "10:32 AM" },
    { id: 4, text: "I'm doing great! Working on a new project", sender: "receiver", time: "10:35 AM" },
    { id: 5, text: "That sounds exciting! Tell me more about it", sender: "sender", time: "10:36 AM" },
    { id: 6, text: "It's a social media app with some cool features", sender: "receiver", time: "10:38 AM" },
  ]);
  const [chatThemes, setChatThemes] = useState({}); // key: chat id -> theme key
  const [showThemePicker, setShowThemePicker] = useState(false);
  const themePickerRef = useRef(null);

  const themes = {
    default: {
      backgroundStyle: { backgroundColor: "#000" },
      senderBubble: "bg-orange-600/40 text-white",
      receiverBubble: "bg-orange-500/30 text-white",
    },
    cat: {
      backgroundStyle: {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${catTheme})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      senderBubble: "bg-gray-200 text-black",
      receiverBubble: "bg-gray-500/80 text-white",
    },
    xoxo: {
      backgroundStyle: {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${xoxoTheme})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      senderBubble: "bg-black/80 text-white",
      receiverBubble: "bg-red-900/80 text-white",
    },
  };

  const chats = [
    { id: 1, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=10", time: "2h", unread: true },
    { id: 2, username: "Rohan Kumar", lastMessage: "Rohan has sent a post", image: "https://i.pravatar.cc/100?img=11", time: "5h", unread: false },
    { id: 3, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=12", time: "1d", unread: false },
    { id: 4, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=13", time: "2d", unread: false },
    { id: 5, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=14", time: "3d", unread: false },
    { id: 6, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=15", time: "4d", unread: false },
    { id: 7, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=16", time: "5d", unread: false },
  ];

  // Auto-open chat when selectedChatUsername is provided
  useEffect(() => {
    if (selectedChatUsername) {
      // Check if chat already exists (case-insensitive comparison)
      const existingChat = chats.find(chat => 
        chat.username.toLowerCase() === selectedChatUsername.toLowerCase() ||
        chat.username === selectedChatUsername
      );
      
      if (existingChat) {
        // Open existing chat
        setActiveChat(existingChat);
      } else {
        // Create new chat entry for this user
        const newChat = {
          id: Date.now(), // Use timestamp for unique ID
          username: selectedChatUsername,
          lastMessage: "No messages yet",
          image: `https://i.pravatar.cc/100?u=${encodeURIComponent(selectedChatUsername)}`,
          time: "now",
          unread: false,
        };
        setActiveChat(newChat);
        // Reset messages for new chat
        setMessages([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatUsername]);

  // Close theme picker on outside click
  useEffect(() => {
    if (!showThemePicker) return;
    const handler = (e) => {
      if (themePickerRef.current && !themePickerRef.current.contains(e.target)) {
        setShowThemePicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showThemePicker]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageInput,
        sender: "sender",
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  const handleSelectTheme = (key) => {
    if (!activeChat) return;
    const chatKey = activeChat.id || activeChat.username;
    setChatThemes((prev) => ({ ...prev, [chatKey]: key }));
    setShowThemePicker(false);
  };

  const handleChatClick = (chat) => {
    setActiveChat(chat);
  };

  const handleBackClick = () => {
    setActiveChat(null);
  };

  const activeChatKey = activeChat?.id || activeChat?.username;
  const currentTheme = activeChatKey ? chatThemes[activeChatKey] || "default" : "default";

  return (
    <main className={`flex-1 overflow-hidden bg-black ${activeChat ? 'fixed inset-0 z-[70] md:relative md:z-auto md:h-[calc(100vh-4rem)]' : 'h-[calc(100vh-7.5rem)] md:h-[calc(100vh-4rem)]'}`}>
      <div className="h-full flex">
        {/* Left Side - Chat List */}
        <div className={`${activeChat ? 'hidden md:block' : 'block'} w-full md:w-96 border-r border-gray-800 overflow-y-auto`}>
          <div className="p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Messages</h1>

            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatClick(chat)}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-[#0f0f0f] border border-gray-800 hover:border-orange-500 cursor-pointer transition"
                >
                  {/* Profile Picture */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden">
                      <LiveProfilePhoto
                        imageSrc={chat.image}
                        videoSrc={getProfileVideoUrl(chat.image, chat.username)}
                      alt={chat.username}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full"
                    />
                    </div>
                    {chat.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewUserProfile && onViewUserProfile(chat.username);
                        }}
                        className="font-semibold text-sm md:text-base text-white truncate hover:opacity-70 transition-opacity cursor-pointer"
                      >
                        {chat.username}
                      </button>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {chat.time}
                      </span>
                    </div>
                    <p className={`text-xs md:text-sm truncate ${chat.unread ? 'text-white font-medium' : 'text-gray-400'}`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Chat Window */}
        {activeChat && (
          <div className="flex-1 flex flex-col bg-black">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#0f0f0f] relative">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackClick}
                  className="md:hidden p-2 hover:bg-gray-800 rounded-full transition"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                  <LiveProfilePhoto
                    imageSrc={activeChat.image}
                    videoSrc={getProfileVideoUrl(activeChat.image, activeChat.username)}
                    alt={activeChat.username}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                  />
                </div>
                <button
                  onClick={() => onViewUserProfile && onViewUserProfile(activeChat.username)}
                  className="font-semibold text-base md:text-lg text-white hover:opacity-70 transition-opacity cursor-pointer"
                >
                  {activeChat.username}
                </button>
              </div>
              <div className="relative" ref={themePickerRef}>
                <button
                  onClick={() => setShowThemePicker((s) => !s)}
                  className="p-2 rounded-full hover:bg-gray-800 transition flex items-center justify-center"
                  aria-label="Change chat theme"
                >
                  <img src={themeIcon} alt="theme" className="w-5 h-5 invert" />
                </button>
                {showThemePicker && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-2xl p-3 z-20">
                    <p className="text-sm text-gray-300 mb-3">Chat themes</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSelectTheme("cat")}
                        className={`w-14 h-14 rounded-full border-2 overflow-hidden flex-shrink-0 ${currentTheme === "cat" ? "border-orange-500" : "border-gray-700"}`}
                        style={{ backgroundImage: `url(${catTheme})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        aria-label="Cat theme"
                      />
                      <button
                        onClick={() => handleSelectTheme("xoxo")}
                        className={`w-14 h-14 rounded-full border-2 overflow-hidden flex-shrink-0 ${currentTheme === "xoxo" ? "border-orange-500" : "border-gray-700"}`}
                        style={{ backgroundImage: `url(${xoxoTheme})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        aria-label="XOXO theme"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
              style={themes[currentTheme]?.backgroundStyle || themes.default.backgroundStyle}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'sender' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-2 ${
                      message.sender === 'sender'
                        ? themes[currentTheme]?.senderBubble || themes.default.senderBubble
                        : themes[currentTheme]?.receiverBubble || themes.default.receiverBubble
                    }`}
                  >
                    <p className="text-sm md:text-base">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-800 p-4 bg-[#0f0f0f]">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#2f2f2f] border border-gray-800 rounded-full px-4 py-2 md:py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-2 md:p-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full transition"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State (when no chat is selected on desktop) */}
        {!activeChat && (
          <div className="hidden md:flex flex-1 items-center justify-center bg-black">
            <div className="text-center text-gray-500">
              <p className="text-lg">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}