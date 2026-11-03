import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";
import Input from "./Input";

type ExpenseFormProps = {
  submitButtonLabel: string;
  onCancel: () => void;
};

export default function ExpenseForm({
  onCancel,
  submitButtonLabel,
}: ExpenseFormProps) {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  function amountChangedHandler(
    inputIdentifier: string,
    enteredAmount: string,
  ) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredAmount,
      };
    });
  }

  function submitHandler() {}

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
        />
      </View>
      <Input
        label="Description"
        multiline={true}
        onChangeText={(value) => amountChangedHandler("description", value)}
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
