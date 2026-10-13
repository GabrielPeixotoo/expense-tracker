import type { Expense } from "@/types/Expense";

function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "Pair of shoes",
    amount: 59.9,
    date: daysAgo(0),
  },
  {
    id: "e2",
    description: "Pair of trousers",
    amount: 82.29,
    date: daysAgo(1),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 5.99,
    date: daysAgo(3),
  },
  {
    id: "e4",
    description: "Book",
    amount: 14.99,
    date: daysAgo(6),
  },
  {
    id: "e5",
    description: "Groceries",
    amount: 120.45,
    date: daysAgo(10),
  },
  {
    id: "e6",
    description: "Coffee",
    amount: 4.5,
    date: daysAgo(15),
  },
  {
    id: "e7",
    description: "Gym membership",
    amount: 49.0,
    date: daysAgo(30),
  },
  {
    id: "e8",
    description: "Headphones",
    amount: 199.99,
    date: daysAgo(45),
  },
];
