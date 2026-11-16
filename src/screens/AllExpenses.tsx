import ExpensesOutput from "@/components/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { useContext } from "react";

export default function AllExpenses() {
  const { expenses } = useContext(ExpensesContext);

  const sorted = [...expenses].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  return <ExpensesOutput expenses={sorted} period={"Total"} />;
}
