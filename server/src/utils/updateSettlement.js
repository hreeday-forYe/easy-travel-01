import Expense from "../models/ExpenseModel.js";
import User from "../models/UserModel.js";
import ErrorHandler from "./ErrorHandler.js";
const updateSettlement = async (data) => {
  // console.log(data); expenseId, notes,  userId
  const expenseId = data.expenseId;
  const note = data.note;
  const userId = data.userId;
  const user = await User.findById(userId);
  // Find the expense with group and user details populated
  const expense = await Expense.findById(expenseId)
    .populate("paidBy", "name")
    .populate("splitBetween.user", "name");

  if (!expense) {
    return next(new ErrorHandler("Expense not found", 404));
  }

  // Check if user is in splitBetween
  const userSplit = expense.splitBetween.find((split) =>
    split.user.equals(userId)
  );

  if (!userSplit) {
    return next(new ErrorHandler("User not part of this expense split", 400));
  }

  // Store original status for comparison
  const originalStatus = userSplit.status;

  // Update user's share and status
  userSplit.share = 0;
  userSplit.status = "paid";

  // If user was disputing, add resolution note
  if (originalStatus === "dispute") {
    expense.notes.push(
      `${user.name}: Resolved their dispute and marked as paid. Note: ${
        note || "No resolution notes provided"
      }`
    );
  } else {
    expense.notes.push(`${user.name}: ${note || "No notes provided"}`);
  }

  // Calculate expense status based on all splits
  const paidCount = expense.splitBetween.filter(
    (split) => split.status === "paid" || split.share === 0
  ).length;

  const disputeCount = expense.splitBetween.filter(
    (split) => split.status === "dispute"
  ).length;

  const allPaid = paidCount === expense.splitBetween.length;
  const anyDispute = disputeCount > 0;

  // Determine new expense status
  if (allPaid) {
    expense.status = "settled";
  } else if (anyDispute) {
    expense.status = "disputed";
  } else {
    expense.status = "pending";
  }

  await expense.save();

  return { allPaid, expense, originalStatus };
};

export { updateSettlement };
