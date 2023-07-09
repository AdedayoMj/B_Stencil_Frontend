import { newSpecPage } from '@stencil/core/testing';
import { ExpenseForm } from '../expense-form';
// import { expenseStore } from '../../store/expense-store';

describe('ExpenseForm', () => {
  it('should render expense form correctly', async () => {
    const page = await newSpecPage({
      components: [ExpenseForm],
      html: `<expense-form></expense-form>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should update form data on input change', async () => {
    const page = await newSpecPage({
      components: [ExpenseForm],
      html: `<expense-form show-form="true"></expense-form>`,
    });

    await page.waitForChanges();

    const expenseForm = page.rootInstance as ExpenseForm;

    const inputElement = page.root.shadowRoot.querySelector('input[name="date"]') as HTMLInputElement;
    inputElement.value = '2023-07-09';
    inputElement.dispatchEvent(new Event('input'));

    expect(expenseForm.formData.date).toBe('2023-07-09');
  });

  it('should display form errors correctly', async () => {
    const page = await newSpecPage({
      components: [ExpenseForm],
      html: `<expense-form show-form="true"></expense-form>`,
    });
    await page.waitForChanges();
    const expenseForm = page.rootInstance as ExpenseForm;

    const formElement = page.root.shadowRoot.querySelector('.form');
    formElement.dispatchEvent(new Event('submit'));

    await page.waitForChanges();

    expect(expenseForm.formErrors.date).toBe('Date is required');
    expect(expenseForm.formErrors.description).toBe('Expense Details is required');
    expect(expenseForm.formErrors.amount).toBe('Amount is required');
  });
});
