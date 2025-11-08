import React from "react";

export default function Messages() {
  const chats = [
    { id: 1, username: "sheryanne_xoxo", lastMessage: "Found that's guitar I saw last rly as a rockstar. Still waiting for my negro to learn what a Ghost is.", image: "https://i.pravatar.cc/100?img=10", time: "2h", unread: true },
    { id: 2, username: "samad_123", lastMessage: "Hey! How are you?", image: "https://i.pravatar.cc/100?img=11", time: "5h", unread: false },
    { id: 3, username: "john_doe", lastMessage: "Let's catch up soon!", image: "https://i.pravatar.cc/100?img=12", time: "1d", unread: false },
    { id: 4, username: "jane_smith", lastMessage: "Thanks for the help!", image: "https://i.pravatar.cc/100?img=13", time: "2d", unread: false },
    { id: 5, username: "mike_ross", lastMessage: "See you tomorrow", image: "https://i.pravatar.cc/100?img=14", time: "3d", unread: false },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-black h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
      <div className="max-w-3xl mx-auto p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Messages</h1>

        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-[#0f0f0f] border border-gray-800 hover:border-gray-600 cursor-pointer transition"
            >
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                <img
                  src={chat.image}
                  alt={chat.username}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                />
                {chat.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full border-2 border-black"></div>
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
    </main>
  );
}