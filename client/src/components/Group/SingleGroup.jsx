import { useState } from "react";
import {
  Calendar,
  Users,
  PlusCircle,
} from "lucide-react";
import {
  useGetTravelExpensesQuery,
  useGetSingleTravelGroupQuery,
} from "@/app/slices/travelGroupApiSlice";
import { useParams } from "react-router-dom";
import AddExpenses from "./AddExpenses";
import { useLocation } from "react-router-dom";


function SingleGroup() {
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
  const location = useLocation();
  const dataReceived = location.state;
  const { id } = useParams();
  const { data } = useGetTravelExpensesQuery(id);
  const { data: groupData } =
    useGetSingleTravelGroupQuery(id);
  const expenses = Array.isArray(data?.expenses) ? data.expenses : [];
  const getData = expenses.length ? [...expenses].reverse() : [];
  console.log(groupData);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {dataReceived.charAt(0).toUpperCase() + dataReceived.slice(1)}
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
                ? "bg-gray-200 text-gray-900"
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
            {getData && getData.length > 0 ? (
              getData.map((expense) => (
                <div
                  key={expense.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col ">
                      <span className="text-md font-medium text-black">
                        {expense.description}
                      </span>
                      <div>
                        <div className="flex gap-10 mt-2">
                          <div className="flex items-center gap-28">
                            <span className="text-sm text-gray-500">
                              <Calendar className="w-4 h-4 inline mr-1 text-orange-400" />
                              {new Date(expense.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Paid by : {expense.paidBy.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Category :{" "}
                            {expense.category.charAt(0).toUpperCase() +
                              expense.category.slice(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {expense.amount.value} {expense.amount.currency}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                <p className="font-bold text-xl my-[20%]">No data available</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-slate-800 rounded-xl p-8 text-white">
              <div className="text-center">
                <div className="text-gray-400 mb-2">Total Expenses</div>

                <div className="text-2xl font-semibold ">
                  <span>{groupData.group.currency}</span>{" "}
                  <span className="text-xl font-medium">
                    {groupData.group.totalExpenses}
                  </span>
                </div>
              </div>
              <div className="text-center border-l border-gray-700">
                <div className="text-gray-400 mb-2">Total Budget</div>
                <div className="">
                  <span className="text-2xl font-semibold">
                    {groupData.group.currency}
                  </span>{" "}
                  <span className="text-xl font-medium">
                    {groupData.group.budget}
                  </span>
                </div>
              </div>
              <div className="text-center border-t border-gray-700 pt-4">
                <div className="text-gray-400 mb-2">You owe People</div>
                <div className="text-2xl font-semibold">USD 0</div>
              </div>
              <div className="text-center border-l border-t border-gray-700 pt-4">
                <div className="text-gray-400 mb-2">People owe you</div>
                <div className="text-2xl font-semibold">USD 16400</div>
              </div>
            </div>

            {/* Settlement List */}
            <div className="space-y-3">
              {/* {settlements.map((settlement) => (
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
              ))} */}
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

export default SingleGroup;
