import { Expense } from "@/types/Expense";
import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

type ExpensesListProps = {
  expenses: Expense[];
};

function renderExpenseItem(item: Expense) {
  return <ExpenseItem expense={item} />;
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => renderExpenseItem(item)}
      keyExtractor={(item) => item.id}
    />
  );
}
