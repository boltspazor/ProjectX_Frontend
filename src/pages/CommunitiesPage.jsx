import React, { useState } from "react";
import JoinedCommunities from "../components/JoinedCommunities";
import DiscoverCommunitiesPage from "./DiscoverCommunitiesPage";

export default function CommunitiesPage({ setActiveView }) {
  const [showDiscover, setShowDiscover] = useState(false);

  // Show discover page if active
  if (showDiscover) {
    return <DiscoverCommunitiesPage onBack={() => setShowDiscover(false)} />;
  }

  return (
    <main className="min-h-full w-full bg-[#0b0b0b]">
      <JoinedCommunities setActiveView={setActiveView} onDiscoverClick={() => setShowDiscover(true)} />
    </main>
  );
}