import { expenseService } from "@/services/expenseService";
import { Expense, ExpenseInputDto } from "@/types/Expense";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: ExpenseInputDto) => Promise<void>;
  updateExpense: (id: string, expense: ExpenseInputDto) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  clearError: () => void;
  isLoading: boolean;
  error: string | undefined;
};

type ExpensesAction =
  | { type: "ADD"; payload: Expense }
  | { type: "UPDATE"; payload: { id: string; expense: ExpenseInputDto } }
  | { type: "DELETE"; payload: string }
  | { type: "SET"; payload: Expense[] };

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: async () => {},
  updateExpense: async () => {},
  deleteExpense: async () => {},
  isLoading: false,
  error: undefined,
  clearError: () => {},
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  async function addExpense(expense: ExpenseInputDto) {
    try {
      setIsLoading(true);
      const firebaseId = await expenseService.add(expense);

      const newExpense: Expense = {
        id: firebaseId,
        ...expense,
      };

      dispatch({
        type: "ADD",
        payload: newExpense,
      });
    } catch {
      setError("An error occurred while adding expense.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateExpense(id: string, expense: ExpenseInputDto) {
    try {
      setIsLoading(true);
      dispatch({
        type: "UPDATE",
        payload: {
          id: id,
          expense: expense,
        },
      });
      await expenseService.update(id, expense);
    } catch {
      setError("An error occurred while updating expense.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteExpense(id: string) {
    try {
      setIsLoading(true);
      dispatch({
        type: "DELETE",
        payload: id,
      });

      await expenseService.delete(id);
    } catch {
      setError("An error occurred while deleting expense.");
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError("");
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
    isLoading,
    error,
    clearError,
  };

  useEffect(() => {
    async function load() {
      try {
        const expenses = await expenseService.get();

        dispatch({
          type: "SET",
          payload: expenses,
        });

        return expenses;
      } catch {
        setError("An error occurred while getting expenses.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
