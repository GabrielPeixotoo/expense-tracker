import IconButton from "@/components/buttons/IconButton";
import ExpenseForm from "@/components/form/ExpenseForm";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ExpensesContext } from "@/store/expenses-context";
import { Expense } from "@/types/Expense";
import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useRoute } from "../types/routes";

export default function ManageExpense() {
  const navigation = useNavigation();

  const route = useRoute<"ManageExpense">();

  const expenseId = route.params?.expenseId ?? "";

  const isEditing = !!expenseId;

  const expenseCtx = useContext(ExpensesContext);

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === expenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  async function deleteExpenseHandler() {
    await expenseCtx.deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expense: Omit<Expense, "id">) {
    if (isEditing) {
      await expenseCtx.updateExpense(expenseId, expense);
    } else {
      await expenseCtx.addExpense(expense);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={(expense) => confirmHandler(expense)}
        initialExpense={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
      {expenseCtx.isLoading && (
        <View style={styles.loadingOverlay}>
          <LoadingOverlay />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
