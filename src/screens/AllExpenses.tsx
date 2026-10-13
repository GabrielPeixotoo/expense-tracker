import ExpensesOutput from "@/components/ExpensesOutput";
import { DUMMY_EXPENSES } from "@/data/dummy-expenses";

export default function AllExpenses() {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} period={"Total"} />;
}
