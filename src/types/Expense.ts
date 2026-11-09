export type Expense = {
    id: string;
    date: Date;
    description: string
    amount: number;
}

export type ExpenseInputDto = Omit<Expense, "id">