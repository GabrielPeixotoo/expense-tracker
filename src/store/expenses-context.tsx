import { DUMMY_EXPENSES } from "@/data/dummy-expenses";
import { Expense } from "@/types/Expense";
import * as Crypto from "expo-crypto";
import { createContext, ReactNode, useReducer } from "react";

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
};

type ExpensesAction =
  | { type: "ADD"; payload: Expense }
  | { type: "UPDATE"; payload: { id: string; expense: Omit<Expense, "id"> } }
  | { type: "DELETE"; payload: string };

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
});

function expensesReducer(state: Expense[], action: ExpensesAction): Expense[] {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload.expense, id: expense.id };
        }
        return expense;
      });

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expense: Omit<Expense, "id">) {
    const newId = Crypto.randomUUID();

    const newExpense: Expense = {
      id: newId,
      ...expense,
    };

    dispatch({
      type: "ADD",
      payload: newExpense,
    });
  }

  function updateExpense(id: string, expense: Omit<Expense, "id">) {
    dispatch({
      type: "UPDATE",
      payload: {
        id: id,
        expense: expense,
      },
    });
  }

  function deleteExpense(id: string) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
