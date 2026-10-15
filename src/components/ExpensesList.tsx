import { Expense } from "@/types/Expense";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

type ExpensesListProps = {
  expenses: Expense[];
};

export default function ExpensesList({ expenses }: ExpensesListProps) {
  const navigation = useNavigation();

  function goToManageExpense(id: string) {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }

  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => (
        <ExpenseItem
          expense={item}
          onPress={() => goToManageExpense(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
