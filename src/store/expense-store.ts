import { createStore } from '@stencil/store';
import { CreateExpenseData, ExpenseData } from '../types';

interface AppState {
  expenses: ExpenseData[];
  theme: string;
  showForm: boolean;
  currentId: string;
  action: string;
}

const intialState: AppState = {
  expenses: [],
  theme: 'light',
  showForm: false,
  currentId: '',
  action: 'create',
};

const apiUrl = 'https://betsson-backend-ed81ddb5eddb.herokuapp.com/expense';
// const apiUrl = process.env.API_URL;
const { state, onChange } = createStore(intialState);

const CAHCE_EXPIRATION = 60 * 5;

const setCache = (key: string, value: ExpenseData[]) => {
  const expirationTime = Date.now() + CAHCE_EXPIRATION * 1000;
  const cacheObject = { value, expirationTime };
  localStorage.setItem(key, JSON.stringify(cacheObject));
};

const getCache = (key: string) => {
  const cacheData = localStorage.getItem(key);
  if (cacheData) {
    const { value, expirationTime } = JSON.parse(cacheData);
    if (expirationTime > Date.now()) {
      return value;
    } else {
      localStorage.removeItem(key);
    }
  }
  return null;
};

export const expenseStore = {
  getState: () => state,
  subscribe: onChange,

  setExpense: (expenses: ExpenseData[]) => {
    state.expenses = expenses;
    setCache('expenses', expenses);
  },

  addExpense: (expense: ExpenseData) => {
    state.expenses = [...state.expenses, expense];
    setCache('expenses', state.expenses);
  },

  deleteExpense: (expenseId: string) => {
    state.expenses = state.expenses.filter(expense => expense._id !== expenseId);
    setCache('expenses', state.expenses);
  },
  
  updateExpense: (expenseId: string, updatedExpense: ExpenseData) => {
    state.expenses = state.expenses.map(expense => (expense._id === expenseId ? { ...expense, ...updatedExpense } : expense));
    setCache('expenses', state.expenses);
  },

  setTheme: (theme: string) => {
    state.theme = theme;
    localStorage.setItem('theme', theme);
  },
  setShowForm: (showForm: boolean) => {
    state.showForm = showForm;
  },
  setAction: (action: string) => {
    state.action = action;
  },
  setCurrentId: (id: string) => {
    state.currentId = id;
  },

  fetchExpenses: async () => {
    const cachedExpenses = getCache('expenses');
    const cachedTheme = localStorage.getItem('theme');
    
    if (cachedTheme) {
      expenseStore.setTheme(cachedTheme);
    } else {
      expenseStore.setTheme('light'); 
    }
  
    if (cachedExpenses) {
      expenseStore.setExpense(cachedExpenses);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      expenseStore.setExpense(data.expenses);

      setCache('expenses', data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  },

  createExpense: async (requestData: CreateExpenseData) => {
    try {
      const response = await fetch(`${apiUrl}/createExpense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        console.error('Error creating expense:', response.statusText);
        throw new Error('Error creating expense');
      }
      const data = await response.json();
      expenseStore.addExpense(data.expense);
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },

  deleteExpenseApi: async (expenseId: string) => {
    try {
      const response = await fetch(`${apiUrl}/${expenseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error deleting expense:', response.statusText);
        throw new Error('Error deleting expense');
      }
      expenseStore.deleteExpense(expenseId);
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  },
  updateExpenseApi: async (expenseId: string, updatedExpense: CreateExpenseData) => {
    try {
      const response = await fetch(`${apiUrl}/update/${expenseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });
      if (!response.ok) {
        console.error('Error updating expense:', response.statusText);
        throw new Error('Error updating expense');
      }

      expenseStore.updateExpense(expenseId, updatedExpense);
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  },

  getExpenseById: (expenseId: string): ExpenseData | undefined => {
    return state.expenses.find(expense => expense._id === expenseId);
  },
};
