import { Expense } from "@/types/Expense";
import { getFormattedDate } from "@/utils/date";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import CustomButton from "../buttons/CustomButton";
import Input from "./Input";

type ExpenseFormState = {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
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
    amount: {
      value: initialExpense?.amount?.toString() ?? "",
      isValid: true,
    },
    date: {
      value: getFormattedDate(initialExpense?.date ?? new Date()) ?? "",
      isValid: true,
    },
    description: {
      value: initialExpense?.description?.toString() ?? "",
      isValid: true,
    },
  });

  function amountChangedHandler(
    inputIdentifier: keyof ExpenseFormState,
    enteredAmount: string,
  ) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredAmount, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    const isFormValid = amountIsValid && dateIsValid && descriptionIsValid;

    if (!isFormValid) {
      setInputValues((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          invalid={!inputValues.amount.isValid}
          onChangeText={(value) => amountChangedHandler("amount", value)}
          style={styles.rowInput}
          value={inputValues.amount.value}
        />
        <Input
          label="Date"
          placeholder="2026-10-31"
          maxLength={10}
          invalid={!inputValues.date.isValid}
          onChangeText={(value) => amountChangedHandler("date", value)}
          style={styles.rowInput}
          value={inputValues.date.value}
        />
      </View>
      <Input
        label="Description"
        multiline={true}
        invalid={!inputValues.description.isValid}
        onChangeText={(value) => amountChangedHandler("description", value)}
        value={inputValues.description.value}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    margin: 8,
    color: GlobalStyles.colors.error500,
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
