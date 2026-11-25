import ErrorOverlay from "@/components/ErrorOverlay";
import ExpensesOutput from "@/components/ExpensesOutput";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ExpensesContext } from "@/store/expenses-context";
import { useContext } from "react";

export default function AllExpenses() {
  const { expenses, isLoading, error, clearError } =
    useContext(ExpensesContext);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={clearError} />;
  }

  const sorted = [...expenses].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  return <ExpensesOutput expenses={sorted} period={"Total"} />;
}
