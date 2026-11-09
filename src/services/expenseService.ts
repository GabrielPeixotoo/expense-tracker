import { Expense, ExpenseInputDto } from "@/types/Expense";
import { api } from "@/utils/api";

export const expenseSerice = {
    async add(expense: ExpenseInputDto) {
        const response = await api.post('/expenses.json', expense);
        return response.data.name;
    },

    async update(expense: Expense) {

    },

    async get() {
        const response = await api.post('/expenses.json');
        console.log(response);
    }
}