import ExpensesOutput from "@/components/ExpensesOutput";
import { DUMMY_EXPENSES } from "@/data/dummy-expenses";

export default function RecentExpenses() {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} period={"Last 7 Days"} />;
}
