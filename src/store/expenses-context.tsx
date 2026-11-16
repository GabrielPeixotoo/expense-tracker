import { expenseService } from "@/services/expenseService";
import { Expense, ExpenseInputDto } from "@/types/Expense";
import { createContext, ReactNode, useEffect, useReducer } from "react";

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: ExpenseInputDto) => void;
  updateExpense: (id: string, expense: ExpenseInputDto) => void;
  deleteExpense: (id: string) => void;
  getExpenses: () => Promise<Expense[]>;
};

type ExpensesAction =
  | { type: "ADD"; payload: Expense }
  | { type: "UPDATE"; payload: { id: string; expense: ExpenseInputDto } }
  | { type: "DELETE"; payload: string }
  | { type: "SET"; payload: Expense[] };

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  getExpenses: async () => [],
});

function expensesReducer(state: Expense[], action: ExpensesAction): Expense[] {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...action.payload.expense, id: expense.id };
        }
        return expense;
      });

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

export default function ExpensesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  async function addExpense(expense: ExpenseInputDto) {
    const firebaseId = await expenseService.add(expense);

    const newExpense: Expense = {
      id: firebaseId,
      ...expense,
    };

    dispatch({
      type: "ADD",
      payload: newExpense,
    });
  }

  async function updateExpense(id: string, expense: ExpenseInputDto) {
    dispatch({
      type: "UPDATE",
      payload: {
        id: id,
        expense: expense,
      },
    });
    await expenseService.update(id, expense);
  }

  async function deleteExpense(id: string) {
    dispatch({
      type: "DELETE",
      payload: id,
    });

    await expenseService.delete(id);
  }

  async function getExpenses(): Promise<Expense[]> {
    const expenses = await expenseService.get();

    dispatch({
      type: "SET",
      payload: expenses,
    });

    return expenses;
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenses,
  };

  useEffect(() => {
    getExpenses().catch(console.error);
  }, []);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
