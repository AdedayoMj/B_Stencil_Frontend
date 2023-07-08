import { Component, h, Method, JSX, State } from '@stencil/core';

import lightIcon from '../../assets/sunshine.svg';
import darkIcon from '../../assets/moon.svg';
import { ExpenseData } from '../../types';

import { expenseStore } from '../../store/expense-store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() theme: string = expenseStore.getState().theme;
  @State() expenses: ExpenseData[] = [];
  @State() showForm: boolean = expenseStore.getState().showForm;
  @State() isLoading = false;

  @Method()
  async toggleTheme() {
    const currentTheme = expenseStore.getState().theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    expenseStore.setTheme(newTheme);
  }

  toggleForm() {
    const currentShowForm = expenseStore.getState().showForm;
    expenseStore.setShowForm(!currentShowForm);
  }

  connectedCallback() {
    const cachedTheme = localStorage.getItem('theme');
    if (cachedTheme) {
      this.theme = cachedTheme;
    } else {
      this.theme = 'light';
    }
    expenseStore.subscribe('isLoading', () => {
      this.isLoading = expenseStore.isLoading();
    });
    this.isLoading = expenseStore.isLoading();

    expenseStore.fetchExpenses().then(() => {
      this.expenses = expenseStore.getState().expenses;
    });

    expenseStore.subscribe('expenses', () => {
      this.expenses = expenseStore.getState().expenses;
    });
    this.expenses = expenseStore.getState().expenses;
    expenseStore.subscribe('theme', () => {
      this.theme = expenseStore.getState().theme;
    });
    expenseStore.subscribe('showForm', () => {
      this.showForm = expenseStore.getState().showForm;
    });
  }

  renderIcon(): JSX.Element {
    const toggleIcon = this.theme === 'light' ? lightIcon : darkIcon;
    return (
      <div class="iconContainer">
        <img class="iconImage" src={toggleIcon} alt="Toggle Icon" />
      </div>
    );
  }

  render() {
    const themeClasses = this.theme === 'light' ? 'app-light' : 'app-dark';

    return (
      <main class={themeClasses}>
        <header>
          <h1>Betsson Task</h1>
          <div class="toggleIcon" onClick={() => this.toggleTheme()}>
            {this.renderIcon()}
          </div>
        </header>

        <div class="container">
          <button class="createExpenseButton" onClick={() => this.toggleForm()}>
            {this.showForm ? 'Close Form' : 'Create Expense'}
          </button>

          {this.showForm ? <expense-form></expense-form> : null}
          <expense-list expenses={this.expenses}></expense-list>
          <expense-chart expenses={this.expenses}></expense-chart>
          {this.isLoading && <wave-loading></wave-loading>}
        </div>
      </main>
    );
  }
}
