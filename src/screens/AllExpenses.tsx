import ExpensesOutput from "@/components/ExpensesOutput";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ExpensesContext } from "@/store/expenses-context";
import { useContext } from "react";

export default function AllExpenses() {
  const { expenses, isLoading } = useContext(ExpensesContext);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const sorted = [...expenses].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  return <ExpensesOutput expenses={sorted} period={"Total"} />;
}
