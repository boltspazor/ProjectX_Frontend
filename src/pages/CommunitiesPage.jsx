import React from "react";
import JoinedCommunities from "../components/JoinedCommunities";

export default function CommunitiesPage({ setActiveView }) {
  return (
    <main className="min-h-full w-full bg-[#0b0b0b]">
      <JoinedCommunities setActiveView={setActiveView} />
    </main>
  );
}