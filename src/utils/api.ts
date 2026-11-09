import { create } from 'axios';

export const api = create({
    baseURL: 'https://expense-tracker-rn-f303b-default-rtdb.firebaseio.com'
});