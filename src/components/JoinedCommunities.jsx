import React from "react";

const joinedCommunities = [
  {
    id: 1,
    name: "Music Lovers",
    description: "Weekly jam sessions, playlist drops, and gear swaps.",
    members: "2.3K members",
    cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=800&q=80",
    avatar: "https://i.pravatar.cc/100?img=50",
    badges: ["Live Sessions", "Events"],
  },
  {
    id: 2,
    name: "Tech Enthusiasts",
    description: "Build, break, and ship together with the latest in tech.",
    members: "5.1K members",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    avatar: "https://i.pravatar.cc/100?img=51",
    badges: ["Hackathons", "AI"],
  },
  {
    id: 3,
    name: "Photography Club",
    description: "Share your shots, get feedback, and plan photo walks.",
    members: "1.8K members",
    cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    avatar: "https://i.pravatar.cc/100?img=52",
    badges: ["Critique", "Workshops"],
  },
  {
    id: 4,
    name: "Design Playground",
    description: "UI drops, Figma files, and daily inspiration threads.",
    members: "3.4K members",
    cover: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    avatar: "https://i.pravatar.cc/100?img=53",
    badges: ["Figma", "Inspiration"],
  },
];

export default function JoinedCommunities({ setActiveView }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Communities you&apos;re in
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-2 max-w-2xl">
            Pick up where you left off, join live sessions, or explore what&apos;s trending inside your circles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg border border-gray-700 bg-[#161616] text-sm text-gray-300 hover:border-orange-500 hover:text-white transition-all duration-300">
            Discover more
          </button>
          <button 
            onClick={() => setActiveView("createCommunity")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-sm font-medium text-black hover:shadow-[0_0_24px_rgba(249,115,22,0.35)] transition-all duration-300"
          >
            Create community
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2">
        {joinedCommunities.map((community) => (
          <article
            key={community.id}
            className="group relative rounded-3xl border border-gray-800 bg-[#121212] transition-all duration-500 hover:border-orange-500 hover:shadow-[0_0_35px_rgba(249,115,22,0.15)]"
          >
            <div className="relative h-40 overflow-hidden rounded-t-3xl">
              <img
                src={community.cover}
                alt={`${community.name} cover`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
            </div>

            <div className="relative pt-12 pb-6 px-6">
              <div className="absolute -top-8 left-6">
                <div className="w-16 h-16 rounded-2xl border-4 border-[#121212] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
                  <img
                    src={community.avatar}
                    alt={`${community.name} avatar`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{community.name}</h2>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    {community.description}
                  </p>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-orange-400 bg-orange-500/10 border border-orange-500/40 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="text-gray-400">{community.members}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <div className="flex flex-wrap items-center gap-2">
                  {community.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded-full text-xs font-medium text-orange-300 bg-orange-500/10 border border-orange-500/30"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button className="flex-1 rounded-xl border border-gray-700 px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:border-orange-500 hover:text-white">
                  View latest posts
                </button>
                <button className="rounded-xl bg-[#1f1f1f] px-4 py-2 text-sm text-gray-200 transition-all duration-300 hover:bg-orange-500 hover:text-black">
                  Open chat
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}