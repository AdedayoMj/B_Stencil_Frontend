interface ExpenseData {
  _id?: string;
  date: string;
  description: string;
  amount: number;
}

interface CreateExpenseData {
  date: string;
  description: string;
  amount: number;
}

export { ExpenseData, CreateExpenseData };
