import { useState } from "react";
import {
  Calendar,
  Users,
  PieChart,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  BanknoteIcon,
  Eye,
} from "lucide-react";
import {
  useGetTravelExpensesQuery,
  useGetSingleTravelGroupQuery,
} from "@/app/slices/travelGroupApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import AddExpenses from "./AddExpenses";
import ExpenseDetailsDialog from "./ExpenseDetailsDialog";
import {
  useGetExpenseSummaryQuery,
  useRequestMoneyMutation,
} from "../../app/slices/expenseApiSlice";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "react-toastify";
import GroupNav from "./GroupNav";
import { useSelector } from "react-redux";

const StatusBadgeConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    iconColor: "text-yellow-500",
  },
  settled: {
    icon: CheckCircle2,
    color: "bg-green-50 text-green-700 border-green-200",
    iconColor: "text-green-500",
  },
  disputed: {
    icon: AlertCircle,
    color: "bg-red-50 text-red-700 border-red-200",
    iconColor: "text-red-500",
  },
};

const StatusBadge = ({ status }) => {
  const config =
    StatusBadgeConfig[status.toLowerCase()] || StatusBadgeConfig.pending;
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex mt-1 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${config.color}`}
    >
      <Icon className={`w-4 h-4  ${config.iconColor}`} />
      {status}
    </div>
  );
};

function SingleGroup() {
  const [activeTab, setActiveTab] = useState("activity");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: expensesData, isLoading: expensesLoading } =
    useGetTravelExpensesQuery(id);
  const {
    data: groupData,
    refetch,
    isLoading: groupLoading,
  } = useGetSingleTravelGroupQuery(id);

  const { data: summaryData, isLoading: summaryLoading } =
    useGetExpenseSummaryQuery(id);

  const [requestMoney, { isLoading: requestMoneyLoading }] =
    useRequestMoneyMutation();
  const userdata = useSelector((state) => state.auth?.user?._id);

  const handleSettleExpense = (expenseId) => {
    // Handle settle expense logic
    navigate(`/groups/settlement/${expenseId}`, {
      state: { groupId: id },
    });
  };

  const handleRequestMoney = async (expenseId) => {
    try {
      const response = await requestMoney(expenseId).unwrap();
      toast.success("Email sent to all the debtors");
      if (response.success) {
        toast.success("Email sent to all the debtors");
      }
    } catch (error) {
      toast.error("Failed to send email");
      console.error("Error requesting money:", error);
    }
  };

  const handleViewDetails = (expense) => {
    setSelectedExpense(expense);
    setIsDetailsOpen(true);
  };

  if (groupLoading || expensesLoading) return <div>Loading...</div>;

  const expenses = Array.isArray(expensesData?.expenses)
    ? expensesData.expenses
    : [];
  const reversedExpenses = [...expenses].reverse();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <GroupNav id={id} />
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-8 py-3 rounded-full font-medium ${
              activeTab === "activity"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-8 py-3 rounded-full font-medium ${
              activeTab === "summary"
                ? "bg-[#FE9935]/80 text-black"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Your Summary
          </button>
        </div>
        <ScrollArea className="h-[calc(100vh-220px)]">
          {activeTab === "activity" ? (
            <div className="space-y-4">
              {reversedExpenses.length > 0 ? (
                reversedExpenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="bg-white rounded-xl p-6 border border-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex justify-between mb-3">
                          <span className="text-lg font-semibold">
                            {expense.description}
                          </span>
                          <StatusBadge status={expense.status} />
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            {new Date(expense.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4 text-green-500" />
                            Paid by: {expense.paidBy.name}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <PieChart className="w-4 h-4 text-orange-500 " />
                            {expense.category.charAt(0).toUpperCase() +
                              expense.category.slice(1)}
                          </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="mt-4 flex gap-3">
                          <button
                            onClick={() => handleViewDetails(expense)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          {expense.status !== "settled" && (
                            <>
                              {expense.splitBetween.some(
                                (entry) =>
                                  String(entry.user._id) === String(userdata)
                              ) &&
                                expense.paidBy._id !== String(userdata) && (
                                  <button
                                    onClick={() =>
                                      handleSettleExpense(expense._id)
                                    }
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                                  >
                                    <Send className="w-4 h-4" />
                                    Settle Expense
                                  </button>
                                )}
                              {expense.paidBy._id === userdata && (
                                <button
                                  onClick={() =>
                                    handleRequestMoney(expense._id)
                                  }
                                  disabled={requestMoneyLoading}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                  {requestMoneyLoading ? (
                                    <>Requesting...</>
                                  ) : (
                                    <>
                                      <BanknoteIcon className="w-4 h-4" />
                                      Request Money
                                    </>
                                  )}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="ml-6">
                        <p className="text-md font-bold flex gap-2 bg-green-100 text-green-700 p-1.5 rounded-2xl ">
                          <Wallet />
                          {expense.amount?.toFixed(2)}{" "}
                          {groupData?.group?.currency}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 text-gray-400 mx-auto mb-4">
                    <Wallet className="w-full h-full" />
                  </div>
                  <p className="text-xl font-semibold text-gray-500">
                    No expenses recorded yet
                  </p>
                  <p className="text-gray-400 mt-2">
                    Add your first expense using the button below
                  </p>
                </div>
              )}
              <AddExpenses />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#1c4dd3] to-[#061d5b] rounded-2xl p-1">
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-8">
                <div className="grid grid-cols-4 gap-8">
                  {/* Total Expenses */}
                  <div className="flex flex-col items-center p-6 rounded-lg bg-white/10 border border-white/20  ">
                    <Wallet className="w-6 h-6 mb-2 text-white/80" />
                    <h3 className="text-white/60 text-sm font-medium mb-2">
                      Total Group Expenses
                    </h3>
                    <div className="text-white">
                      <span className="text-2xl font-semibold">
                        {groupData.group.currency}{" "}
                        {groupData.group.totalExpenses}
                      </span>
                    </div>
                  </div>

                  {/* Total Budget */}
                  <div className="flex flex-col items-center p-6 rounded-lg bg-white/10 border border-white/20">
                    <PiggyBank className="w-6 h-6 mb-2 text-white/80" />
                    <h3 className="text-white/60 text-sm font-medium mb-2">
                      Group Budget
                    </h3>
                    <div className="text-white">
                      <span className="text-2xl font-semibold">
                        {groupData.group.currency} {groupData.group.budget}
                      </span>
                    </div>
                  </div>

                  {/* You Owe */}
                  <div className="flex flex-col items-center p-6 rounded-lg bg-white/10 border border-white/20">
                    <ArrowUpRight className="w-6 h-6 mb-2 text-red-300" />
                    <h3 className="text-white/60 text-sm font-medium mb-2">
                      You Owe
                    </h3>

                    <div className="text-white">
                      <span className="text-2xl font-semibold">
                        {groupData.group.currency} {""}
                        {summaryData.data.totals.totalOwed}
                      </span>
                    </div>
                  </div>

                  {/* People Owe You */}
                  <div className="flex flex-col items-center p-6 rounded-lg bg-white/10 border border-white/20">
                    <ArrowDownRight className="w-6 h-6 mb-2 text-green-300" />
                    <h3 className="text-white/60 text-sm font-medium mb-2">
                      Owed to You
                    </h3>
                    <div className="text-white">
                      <span className="text-2xl font-semibold">
                        {groupData.group.currency} {""}
                        {summaryData.data.totals.totalToReceive}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </main>

      {/* Expense Details Dialog */}
      <ExpenseDetailsDialog
        expense={selectedExpense}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        currency={groupData?.group?.currency}
      />
    </div>
  );
}

export default SingleGroup;
