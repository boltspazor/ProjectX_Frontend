import React, { useState } from "react";
import JoinedCommunities from "../../components/JoinedCommunities";
import DiscoverCommunities from "../../components/DiscoverCommunities";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function CommunitiesPage({ setActiveView }) {
  const [showDiscover, setShowDiscover] = useState(false);

  // Show discover page if active
  if (showDiscover) {
    return (
      <ErrorBoundary>
        <DiscoverCommunities onBack={() => setShowDiscover(false)} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <main className="min-h-full w-full bg-[#fffcfa] dark:bg-[#0b0b0b]">
        <JoinedCommunities setActiveView={setActiveView} onDiscoverClick={() => setShowDiscover(true)} />
      </main>
    </ErrorBoundary>
  );
}