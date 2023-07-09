import { newSpecPage } from '@stencil/core/testing';
import { AppRoot } from '../app-root';
import { expenseStore } from '../../../store/expense-store';
import { mockExpenses } from '../../../utils/mock-data';

describe('AppRoot', () => {
  beforeAll(() => {
    // Mock the fetchExpenses method
    jest.spyOn(expenseStore, 'fetchExpenses').mockImplementation(async () => {
      expenseStore.setExpense(mockExpenses);
    });
  });

  it('should toggle the theme correctly and also open form', async () => {
    const page = await newSpecPage({
      components: [AppRoot],
      html: '<app-root></app-root>',
    });

    const appRoot = page.rootInstance as AppRoot;

    // Wait for the component to update
    await page.waitForChanges();

    appRoot.toggleTheme();
    expect(expenseStore.getState().theme).toBe('dark');

    appRoot.toggleTheme();
    expect(expenseStore.getState().theme).toBe('light');

    //trigger button to open form
    const createExpenseButton = page.root.shadowRoot.querySelector('.createExpenseButton') as HTMLElement;

    createExpenseButton.click();

    await page.waitForChanges();

    const expenseForm = page.root.shadowRoot.querySelector('expense-form');
    expect(expenseForm).toBeTruthy();
    expect(appRoot.showForm).toBe(true);
  });
});
