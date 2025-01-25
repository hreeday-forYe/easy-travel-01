import React from "react";

const JournalsPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Side_bar />

      <div className=" px-10 py-8">
        <h1 className="text-3xl font-bold mb-6">My Journals</h1>
        <NewJournalDialog />
        <JournalList />
      </div>
    </div>
  );
};

export default JournalsPage;
