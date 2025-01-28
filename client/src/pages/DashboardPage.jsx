import { Dashboard, SideBar } from "../components/index";
const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <div>
        <SideBar />
      </div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
