import { BellDotIcon, UserCircleIcon } from "lucide-react";

const AdminNavbar = () => {
  return (
    <nav className="bg-white max-h-20 shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <input
            type="search"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BellDotIcon className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-600" />
            <span className="text-gray-700">Admin User</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
