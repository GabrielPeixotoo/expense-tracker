import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    ExpenseOverview: NavigatorScreenParams<BottomTabsParamList>;
    ManageExpense: { expenseId: string } | undefined;
}

export type BottomTabsParamList = {
    RecentExpenses: undefined;
    AllExpenses: undefined;
}