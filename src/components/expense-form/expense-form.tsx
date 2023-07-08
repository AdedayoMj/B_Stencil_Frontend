import { Component, State, h, Element, Prop } from '@stencil/core';
import { CreateExpenseData } from '../../types';
import { expenseStore } from '../../store/expense-store';

@Component({
  tag: 'expense-form',
  styleUrl: 'expense-form.css',
  shadow: true,
})
export class ExpenseForm {
  @Prop() showForm = false;
  @State() action: string = expenseStore.getState().action;
  @State() _id: string = expenseStore.getState().currentId;

  @State() formData: CreateExpenseData = {
    date: '',
    description: '',
    amount: null,
  };

  @State() formErrors: { [key: string]: string } = {};
  @Element() element: HTMLElement;

  connectedCallback() {
    if (this.action === 'update' && this._id) {
      const expense = expenseStore.getExpenseById(this._id);
      if (expense) {
        this.formData = {
          date: expense.date,
          description: expense.description,
          amount: expense.amount,
        };
      } else {
        throw new Error(`Expense not found for _id: ${this._id}`);
      }
    }
    this.element.addEventListener('modalClose', () => {
      this.resetForm();
    });
  }

  handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const { name, value } = inputElement;

    this.formData = {
      ...this.formData,
      [name]: value,
    };

    this.formErrors[name] = '';
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    // Validate form fields
    const { date, description, amount } = this.formData;
    let formIsValid = true;

    if (!date) {
      this.formErrors.date = 'Date is required';
      formIsValid = false;
    }

    if (!description) {
      this.formErrors.description = 'Expense Details is required';
      formIsValid = false;
    }

    if (!amount) {
      this.formErrors.amount = 'Amount is required';
      formIsValid = false;
    }

    if (formIsValid) {
      if (this.action === 'create') {
        await expenseStore.createExpense(this.formData);
      }

      if (this.action === 'update') {
        await expenseStore.updateExpenseApi(this._id, this.formData);
      }

      await expenseStore.fetchExpenses();
      this.resetForm();
    }
  }

  resetForm() {
    this.formData = {
      date: '',
      description: '',
      amount: null,
    };
    expenseStore.setCurrentId('');
    expenseStore.setShowForm(false);
    expenseStore.setAction('create');
  }

  render() {
    return (
      <app-modal isOpen={this.showForm}>
        <form class="form" onSubmit={e => this.handleSubmit(e)}>
          <div class="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={this.formData.date} name="date" onInput={e => this.handleInput(e)} class={this.formErrors.date ? 'error' : ''} />
            {this.formErrors.date && <div class="error-message">{this.formErrors.date}</div>}
          </div>
          <div class="form-group">
            <label htmlFor="description">Expense Details</label>
            <textarea
              id="description"
              value={this.formData.description}
              name="description"
              rows={5}
              onInput={e => this.handleInput(e)}
              class={this.formErrors.description ? 'error' : ''}
            />
            {this.formErrors.description && <div class="error-message">{this.formErrors.description}</div>}
          </div>
          <div class="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={this.formData.amount} name="amount" onInput={e => this.handleInput(e)} class={this.formErrors.amount ? 'error' : ''} />
            {this.formErrors.amount && <div class="error-message">{this.formErrors.amount}</div>}
          </div>
          <div class="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </app-modal>
    );
  }
}
