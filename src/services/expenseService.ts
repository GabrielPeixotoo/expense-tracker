import { Expense, ExpenseInputDto } from "@/types/Expense";
import { api } from "@/utils/api";


type FirebaseExpenseItem = {
    amount: number;
    date: string;
    description: string;
};

type FirebaseExpenseResponse = Record<string, FirebaseExpenseItem> | null;

const RESOURCE = '/expenses.json';

export const expenseService = {
    async add(expense: ExpenseInputDto) {
        const response = await api.post(RESOURCE, expense);
        return response.data.name;
    },

    async update(id: string, expense: ExpenseInputDto) {
        api.put(`/expenses/${id}.json`, expense);
    },

    async delete(id: string) {
        api.delete(`/expenses/${id}.json`);
    },

    async get(): Promise<Expense[]> {
        const { data } = await api.get<FirebaseExpenseResponse>(RESOURCE)
        const expenses: Expense[] = [];
        if (!data) {
            return expenses;
        }
        for (const key in data) {
            const item = data[key];

            expenses.push({
                id: key,
                amount: item?.amount ?? 0,
                date: item !== null ? new Date(item.date) : new Date(),
                description: item?.description ?? '',
            })
        }

        return expenses;
    }
}