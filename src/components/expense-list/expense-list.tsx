import { Component, Host, Prop, State, h } from '@stencil/core';
import { ExpenseData } from '../../types';
import { expenseStore } from '../../store/expense-store';

@Component({
  tag: 'expense-list',
  styleUrl: 'expense-list.css',
  shadow: true,
})
export class ExpenseList {
  @Prop() expenses: ExpenseData[];

  @State() currentPage = 1;
  @State() itemsPerPage = 5;

  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  selectExpense(expense: ExpenseData) {
    expenseStore.setAction('update');
    expenseStore.setCurrentId(expense._id);
    expenseStore.setShowForm(true);
  }

  async deleteExpense(expenseId: string) {
    try {
      await expenseStore.deleteExpenseApi(expenseId);
      await expenseStore.fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  }

  render() {
    const { expenses, currentPage, itemsPerPage } = this;

    if (!expenses || expenses.length === 0) {
      return <h1>No expenses</h1>;
    }

    const sortedExpenses = [...expenses].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentExpenses = sortedExpenses.slice(startIndex, endIndex);

    const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);
    return (
      <Host>
        <div class="table-container">
          <div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Expense Details</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentExpenses.map(expense => (
                  <tr key={expense._id}>
                    <td>{expense.date}</td>
                    <td>{expense.description}</td>
                    <td>{expense.amount}</td>
                    <td class="actions">
                      {' '}
                      <button onClick={() => this.selectExpense(expense)}>Edit</button>
                      <button class="delete" onClick={() => this.deleteExpense(expense._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="pagination">
              <button disabled={currentPage === 1} onClick={() => this.handlePageChange(currentPage - 1)}>
                Prev
              </button>
              <span>{`${currentPage}/${totalPages}`}</span>
              <button disabled={currentPage === totalPages} onClick={() => this.handlePageChange(currentPage + 1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
