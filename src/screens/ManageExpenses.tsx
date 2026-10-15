import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Text } from "react-native";
import { useRoute } from "../types/routes";

export default function ManageExpense() {
  const navigation = useNavigation();

  const route = useRoute<"ManageExpense">();

  const expenseId = route.params?.expenseId;

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  return <Text>Manage Expense Screen</Text>;
}
