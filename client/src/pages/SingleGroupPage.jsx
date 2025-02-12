import { useState } from "react";
import {
  Calendar,
  Users,
  PlusCircle,
  Ticket,
  Laugh,
  Building2,
  ArrowRight,
} from "lucide-react";

import AddExpenses from "../components/Group/AddExpenses";
const expenses = [
  {
    id: 1,
    date: "Sep 05, 22",
    title: "Museum Fare",
    amount: 7500,
    paidBy: "You",
    participants: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&fit=crop&crop=faces",
    ],
    icon: Building2,
  },
  {
    id: 2,
    date: "Sep 05, 22",
    title: "Cricket Match Tickets",
    amount: 10000,
    paidBy: "Om Budhiraja",
    participants: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&fit=crop&crop=faces",
    ],
    icon: Ticket,
  },
  {
    id: 3,
    date: "Sep 05, 22",
    title: "Standup Comedy Event",
    amount: 6000,
    paidBy: "You",
    participants: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces",
    ],
    icon: Laugh,
  },
];

const settlements = [
  {
    id: 1,
    from: {
      name: "Om Budhiraja",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces",
      color: "bg-blue-500",
    },
    to: {
      name: "You",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
    },
    amount: 3500,
  },
  {
    id: 2,
    from: {
      name: "Om Budhiraja",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces",
      color: "bg-pink-500",
    },
    to: {
      name: "You",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
    },
    amount: 4950,
  },
  {
    id: 3,
    from: {
      name: "Internet Nerd",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&fit=crop&crop=faces",
      color: "bg-gray-500",
    },
    to: {
      name: "You",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
    },
    amount: 7950,
  },
];

function SingleGroupPage() {
  const [activeTab, setActiveTab] = useState("activity");
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleGroupDetails = () => {
    setShowGroupDetails(true);
    alert("Group Details clicked! Add your modal or navigation logic here.");
  };

  const handleInviteUsers = () => {
    setShowInviteModal(true);
    alert("Invite Users clicked! Add your modal or navigation logic here.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Bangalore Trip
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleGroupDetails}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              GROUP DETAILS
            </button>
            <button
              onClick={handleInviteUsers}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Users className="w-4 h-4" />
              INVITE USERS
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-8 py-3 rounded-full font-medium transition-colors ${
              activeTab === "activity"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-8 py-3 rounded-full font-medium transition-colors ${
              activeTab === "summary"
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Your Summary
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "activity" ? (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <expense.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {expense.date}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900">
                        {expense.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {expense.paidBy} paid for
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹ {expense.amount.toLocaleString()}
                    </p>
                    <div className="flex -space-x-2 mt-2">
                      {expense.participants.map((avatar, index) => (
                        <img
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src={avatar}
                          alt="Participant"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Grid */}
            <div className="grid grid-cols-2 gap-4 bg-slate-800 rounded-xl p-8 text-white">
              <div className="text-center">
                <div className="text-gray-400 mb-2">Total Expenses</div>
                <div className="text-2xl font-semibold">₹ 35800</div>
              </div>
              <div className="text-center border-l border-gray-700">
                <div className="text-gray-400 mb-2">Your Expenses</div>
                <div className="text-2xl font-semibold">₹ 10450</div>
              </div>
              <div className="text-center border-t border-gray-700 pt-4">
                <div className="text-gray-400 mb-2">You owe People</div>
                <div className="text-2xl font-semibold">₹ 0</div>
              </div>
              <div className="text-center border-l border-t border-gray-700 pt-4">
                <div className="text-gray-400 mb-2">People owe you</div>
                <div className="text-2xl font-semibold">₹ 16400</div>
              </div>
            </div>

            {/* Settlement List */}
            <div className="space-y-3">
              {settlements.map((settlement) => (
                <div
                  key={settlement.id}
                  className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${settlement.from.color} flex items-center justify-center text-white font-semibold`}
                    >
                      {settlement.from.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{settlement.from.name}</div>
                      <div className="text-sm text-gray-500">
                        ₹ {settlement.amount}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <img
                      src={settlement.to.avatar}
                      alt={settlement.to.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() =>
          alert("Add Expense clicked! Add your modal or navigation logic here.")
        }
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#FE9935] text-white rounded-full shadow-lg hover:bg-[#FE9935]/90 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusCircle className="w-6 h-6" />
      </button>
      <AddExpenses />
    </div>
  );
}

export default SingleGroupPage;
