import React, { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

export default function MessagesPage() {
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

  const chats = [
    { id: 1, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=10", time: "2h", unread: true },
    { id: 2, username: "Rohan Kumar", lastMessage: "Rohan has sent a post", image: "https://i.pravatar.cc/100?img=11", time: "5h", unread: false },
    { id: 3, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=12", time: "1d", unread: false },
    { id: 4, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=13", time: "2d", unread: false },
    { id: 5, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=14", time: "3d", unread: false },
    { id: 6, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=15", time: "4d", unread: false },
    { id: 7, username: "Shreyanne D'Souza", lastMessage: "Shreyanne has sent a message", image: "https://i.pravatar.cc/100?img=16", time: "5d", unread: false },
  ];

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

  const handleChatClick = (chat) => {
    setActiveChat(chat);
  };

  const handleBackClick = () => {
    setActiveChat(null);
  };

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
                    <img
                      src={chat.image}
                      alt={chat.username}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                    />
                    {chat.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm md:text-base text-white truncate">
                        {chat.username}
                      </h3>
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
            <div className="flex items-center gap-3 p-4 border-b border-gray-800 bg-[#0f0f0f]">
              <button
                onClick={handleBackClick}
                className="md:hidden p-2 hover:bg-gray-800 rounded-full transition"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <img
                src={activeChat.image}
                alt={activeChat.username}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <h2 className="font-semibold text-base md:text-lg text-white">
                {activeChat.username}
              </h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'sender' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-2 ${
                      message.sender === 'sender'
                        ? 'bg-orange-600/40 text-white'
                        : 'bg-orange-500/30 text-white'
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
