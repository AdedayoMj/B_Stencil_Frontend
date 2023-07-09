import { newSpecPage } from '@stencil/core/testing';
import { ExpenseList } from '../expense-list';
import { expenseStore } from '../../../store/expense-store';
import { mockExpenses } from '../../../utils/mock-data';

describe('ExpenseList', () => {
  it('should render expense list correctly', async () => {
    jest.spyOn(expenseStore, 'fetchExpenses').mockImplementation(async () => {
      expenseStore.setExpense(mockExpenses);
    });
    const page = await newSpecPage({
      components: [ExpenseList],
      html: `<expense-list></expense-list>`,
      supportsShadowDom: true,
    });

    expect(page.root).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should display "No expenses" message when no expenses are provided', async () => {
    const expenses = [];
    jest.spyOn(expenseStore, 'fetchExpenses').mockImplementation(async () => {
      expenseStore.setExpense(expenses);
    });

    const page = await newSpecPage({
      components: [ExpenseList],
      html: `<expense-list></expense-list>`,
      supportsShadowDom: true,
    });

    const noExpensesMessage = page.root.shadowRoot.querySelector('h1');
    expect(noExpensesMessage).toBeTruthy();
    expect(noExpensesMessage.textContent).toBe('No expenses');
  });

  it('should handle pagination correctly', async () => {
    jest.spyOn(expenseStore, 'fetchExpenses').mockImplementation(async () => {
      expenseStore.setExpense(mockExpenses);
    });
    const page = await newSpecPage({
      components: [ExpenseList],
      html: `<expense-list></expense-list>`,
    });

    await page.waitForChanges();

    const expenseList = page.rootInstance as ExpenseList;

    expect(page.root).toMatchSnapshot();
    expect(expenseList.currentPage).toBe(1);

    expenseList.handlePageChange(2);

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
    expect(expenseList.currentPage).toBe(2);
  });
});
