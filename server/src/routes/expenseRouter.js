import express from "express";
import ExpenseController from "../controllers/expenseController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const expenseRouter = express.Router();

expenseRouter.post("/", isAuthenticated, ExpenseController.createExpense);

expenseRouter.get("/", isAuthenticated, ExpenseController.fetchExpenses);


expenseRouter.get(
  "/:id",
  isAuthenticated,
  ExpenseController.fetchSingleExpense
);

expenseRouter.get(
  "/expense-summary/:id",
  isAuthenticated,
  ExpenseController.expenseSummary
);


expenseRouter.post(
  "/request-money/:id",
  isAuthenticated,
  ExpenseController.requestSettlement
);

expenseRouter.put("/:id", isAuthenticated, ExpenseController.updateExpense);

expenseRouter.delete("/:id", isAuthenticated, ExpenseController.deleteExpense);



export default expenseRouter;
