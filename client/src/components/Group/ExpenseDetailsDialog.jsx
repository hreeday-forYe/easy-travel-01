import {
  X,
  Receipt,
  Users,
  AlertCircle,
  Calendar,
  Tag,
  Wallet,
  User,
  Clock,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ExpenseDetailsDialog({
  expense,
  isOpen,
  onClose,
  currency,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Expense Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {expense.description}
                </h3>
                <p className="text-gray-500 mt-1">{expense.category}</p>
              </div>
              <div className="text-2xl font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                {currency} {expense.amount?.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Paid By</p>
                  <p className="font-medium">{expense.paidBy.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium capitalize">{expense.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p
                    className={`font-medium capitalize ${
                      expense.status === "Pending"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {expense.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Split Details */}
          <div className="bg-gray-50 rounded-xl p-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 px-4 pt-3">
              <Users className="w-5 h-5 text-blue-600" />
              Split Details
            </h3>
            <div className="space-y-2">
              {expense.splitBetween.map((person) => (
                <div
                  key={person.user._id}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    person._id === expense.paidBy._id
                      ? "bg-blue-50"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        person._id === expense.paidBy._id
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={person.user?.avatar?.url} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {person.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <span className="font-medium">{person.user.name}</span>
                      {person._id === expense.paidBy._id && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Paid
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-semibold ${
                        person._id === expense.paidBy._id
                          ? "text-blue-800"
                          : "text-gray-900"
                      }`}
                    >
                      {currency} {person.share}
                    </div>
                    {person._id !== expense.paidBy._id && (
                      <div className="text-xs text-gray-500">
                        Owes {currency} {person.share}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Receipt */}
          {expense.receipt && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-indigo-600" />
                Receipt
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {expense.receipt.url ? (
                  <img
                    src={expense.receipt.url}
                    alt="Expense receipt"
                    className="w-full h-auto max-h-64 object-contain bg-gray-100"
                  />
                ) : (
                  <div className="p-8 text-center bg-gray-50">
                    <p className="text-gray-500">No receipt available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {expense.notes && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Notes
              </h3>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <p className="text-gray-700">{expense.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
