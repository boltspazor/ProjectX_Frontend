import React, { useState } from "react";

export default function CreatePost({ setActiveView }) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md text-center">
        {/* Back Button */}
        <div
          onClick={() => setActiveView("home")}
          className="flex items-center gap-2 mb-10 cursor-pointer justify-center text-white hover:opacity-90 transition"
        >
          <span className="text-2xl font-medium">←</span>
          <span className="text-lg font-medium">Create a Post</span>
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-3 text-sm md:text-base mb-6 focus:outline-none focus:border-purple-500 placeholder-gray-400"
        />

        {/* Generate Button with gradient border */}
        <button className="w-full relative rounded-md p-[1.5px] bg-gradient-to-r from-teal-400 via-purple-400 to-pink-500 hover:opacity-90 transition mb-6">
          <span className="block w-full bg-[#0f0f0f] rounded-md py-3 text-sm md:text-base font-medium text-white">
            Generate for 100 Credits
          </span>
        </button>

        {/* Divider */}
        <div className="text-gray-400 text-sm uppercase tracking-widest mb-6">
          or
        </div>

        {/* Upload Image Box */}
        <label className="block relative w-full border border-gray-700 rounded-md text-gray-300 py-10 text-sm md:text-base cursor-pointer hover:border-purple-400 transition">
          Upload Image
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}
