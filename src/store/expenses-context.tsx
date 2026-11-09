import { DUMMY_EXPENSES } from "@/data/dummy-expenses";
import { expenseSerice } from "@/services/expenseService";
import { Expense, ExpenseInputDto } from "@/types/Expense";
import { createContext, ReactNode, useReducer } from "react";

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: ExpenseInputDto) => void;
  updateExpense: (id: string, expense: ExpenseInputDto) => void;
  deleteExpense: (id: string) => void;
};

type ExpensesAction =
  | { type: "ADD"; payload: Expense }
  | { type: "UPDATE"; payload: { id: string; expense: ExpenseInputDto } }
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

  async function addExpense(expense: ExpenseInputDto) {
    const firebaseId = await expenseSerice.add(expense);

    const newExpense: Expense = {
      id: firebaseId,
      ...expense,
    };

    dispatch({
      type: "ADD",
      payload: newExpense,
    });
  }

  function updateExpense(id: string, expense: ExpenseInputDto) {
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
