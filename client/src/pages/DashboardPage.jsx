import React from "react";
import { Dashboard, Side_bar } from "../components/index";
const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div>
        <Side_bar />
      </div>
      <Dashboard/>
    </div>
  );
};

export default DashboardPage;
