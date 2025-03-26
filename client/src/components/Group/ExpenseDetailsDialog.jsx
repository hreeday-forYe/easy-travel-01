import { X, Receipt, Users, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";

export default function ExpenseDetailsDialog({
  expense,
  isOpen,
  onClose,
  currency,
}) {
  if (!isOpen) return null;

  const userId = useSelector((state) => state.auth.user._id)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-700">
            Expense Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                {expense.description}
              </h3>
              <div className="text-xl font-bold text-green-600">
                {currency} {expense.amount?.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Category</span>
                <p className="font-medium">{expense.category}</p>
              </div>
              <div>
                <span className="text-gray-500">Date</span>
                <p className="font-medium">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Paid By</span>
                <p className="font-medium">{expense.paidBy.name}</p>
              </div>
              <div>
                <span className="text-gray-500">Status</span>
                <p className={`${expense.status === "Pending" ? "bg-yellow-100": "bg-green-100"}font-medium capitalize`}>{expense.status}</p>
              </div>
            </div>
          </div>

          {/* Split Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Split Details
            </h3>
            <div className="space-y-3">
              {expense.splitBetween.map((person) => (
                <div
                  key={person.user._id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-medium">
                        {person.user.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium">{person.user.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {currency}{" "}
                      {person.share}
                    </div>
                    <div className="text-sm text-gray-500">
                      {person._id === expense.paidBy._id ? "Paid" : "Owes"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Receipt */}
          {expense.receipt && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Receipt
              </h3>
              <div className="border rounded-lg overflow-hidden">
                {
                  expense.receipt.url ? (
                    <img
                      src={expense.receipt.url}
                      alt="Expense receipt"
                      className="w-full h-auto"
                    />
                  ):(
                    <p className="text-sm">Receipt not Available</p>
                  )
                }
              </div>
            </div>
          )}

          {/* Notes */}
          {expense.notes && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Notes
              </h3>
              <p className="text-gray-600">{expense.notes}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
