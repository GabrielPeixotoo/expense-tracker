import IconButton from "@/components/buttons/IconButton";
import ExpenseForm from "@/components/form/ExpenseForm";
import { ExpensesContext } from "@/store/expenses-context";
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    if (isEditing) {
      expenseCtx.updateExpense("", {
        id: "",
        date: new Date(),
        description: "",
        amount: 1,
      });
    } else {
      expenseCtx.addExpense({
        id: "",
        date: new Date(),
        description: "",
        amount: 1,
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
