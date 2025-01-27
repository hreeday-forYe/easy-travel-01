import Expense from "../models/ExpenseModel.js";
import TravelGroup from "../models/TravelGroupModel.js";
import User from "../models/UserModel.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler";

class ExpenseController {
  static createExpense = asyncHandler(async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static updateExpense = asyncHandler(async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static deleteExpense = asyncHandler(async (req, res, next) => {});

  static fetchExpenses = asyncHandler(async (req, res, next) => {
    try {
      const { groupId } = req.body;
      const expenses = await Expense.find({ group: groupId });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
}
