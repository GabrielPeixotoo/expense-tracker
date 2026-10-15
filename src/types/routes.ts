import { NavigatorScreenParams, RouteProp, useRoute as useNativeRoute } from "@react-navigation/native";


export type RootStackParamList = {
    ExpenseOverview: NavigatorScreenParams<BottomTabsParamList>;
    ManageExpense: { expenseId: string } | undefined;
}

export type BottomTabsParamList = {
    RecentExpenses: undefined;
    AllExpenses: undefined;
}


export function useRoute<T extends keyof RootStackParamList>() {
    return useNativeRoute<RouteProp<RootStackParamList, T>>();
}