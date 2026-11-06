import { Expense } from "@/types/Expense";
import { getFormattedDate } from "@/utils/date";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";
import Input from "./Input";

type ExpenseFormState = {
  amount: string;
  date: string;
  description: string;
};

type ExpenseFormProps = {
  submitButtonLabel: string;
  onSubmit: (expense: Omit<Expense, "id">) => void;
  onCancel: () => void;
  initialExpense?: Omit<Expense, "id">;
};

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  initialExpense,
}: ExpenseFormProps) {
  const [inputValues, setInputValues] = useState<ExpenseFormState>({
    amount: initialExpense?.amount?.toString() ?? "",
    date: getFormattedDate(initialExpense?.date ?? new Date()) ?? "",
    description: initialExpense?.description?.toString() ?? "",
  });

  function amountChangedHandler(
    inputIdentifier: keyof ExpenseFormState,
    enteredAmount: string,
  ) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredAmount,
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    const isFormValid = amountIsValid && dateIsValid && descriptionIsValid;

    if (!isFormValid) {
      Alert.alert("Invalid input", "Please check your input values.");
      return;
    }
    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={(value) => amountChangedHandler("amount", value)}
          style={styles.rowInput}
          value={inputValues.amount}
        />
        <Input
          label="Date"
          placeholder="2026-10-31"
          maxLength={10}
          onChangeText={(value) => amountChangedHandler("date", value)}
          style={styles.rowInput}
          value={inputValues.date}
        />
      </View>
      <Input
        label="Description"
        multiline={true}
        onChangeText={(value) => amountChangedHandler("description", value)}
        value={inputValues.description}
      />
      <View style={styles.buttons}>
        <CustomButton style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
