import ErrorOverlay from "@/components/ErrorOverlay";
import ExpensesOutput from "@/components/ExpensesOutput";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ExpensesContext } from "@/store/expenses-context";
import { getDateMinusDays } from "@/utils/date";
import { useContext } from "react";

export default function RecentExpenses() {
  const { expenses, isLoading, error, clearError } =
    useContext(ExpensesContext);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={clearError} />;
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  const sorted = recentExpenses.sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
  return <ExpensesOutput expenses={sorted} period={"Last 7 Days"} />;
}
