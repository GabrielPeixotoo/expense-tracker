import { Expense } from "@/types/Expense";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

type ExpensesListProps = {
  expenses: Expense[];
};

export default function ExpensesList({ expenses }: ExpensesListProps) {
  const navigation = useNavigation();

  function goToManageExpense() {
    navigation.navigate("ManageExpense");
  }

  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => (
        <ExpenseItem expense={item} onPress={goToManageExpense} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
