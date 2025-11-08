import React from "react";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 text-white flex justify-around py-3 text-sm">
      <button>Home</button>
      <button>Explore</button>
      <button>Messages</button>
      <button>Profile</button>
    </div>
  );
}
