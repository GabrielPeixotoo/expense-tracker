import { Expense } from "@/types/Expense";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

type ExpensesOutputProps = {
  expenses: Expense[];
  period: string;
};

export default function ExpensesOutput({
  expenses,
  period,
}: ExpensesOutputProps) {
  return expenses.length > 0 ? (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} />
      <ExpensesList expenses={expenses} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.emptyText}>No registered expenses found!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  emptyText: {
    textAlign: "center",
    color: "white",
    margin: 32,
  },
});
