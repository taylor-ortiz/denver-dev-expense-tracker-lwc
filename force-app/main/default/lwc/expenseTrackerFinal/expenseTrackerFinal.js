import { LightningElement, track } from 'lwc';

export default class ExpenseTracker extends LightningElement {
    @track selectedMonth = this.getCurrentMonth();
    @track expenses = [
        { id: 1, amount: 100, date: '2024-01-15', category: 'Food', month: 'January' },
        { id: 2, amount: 200, date: '2024-02-10', category: 'Transport', month: 'February' },
        // Add more expenses as needed
    ];
    @track expenseAmount = 0;
    @track expenseDate = '';
    @track expenseCategory = '';

    get formattedAmount() {
        return `Total Spent: $${this.getTotalSpent()}`;
    }

    get monthOptions() {
        return [
            { label: 'January', value: 'January' },
            { label: 'February', value: 'February' },
            { label: 'March', value: 'March' },
            { label: 'April', value: 'April' },
            { label: 'May', value: 'May' },
            { label: 'June', value: 'June' },
            { label: 'July', value: 'July' },
            { label: 'August', value: 'August' },
            { label: 'September', value: 'September' },
            { label: 'October', value: 'October' },
            { label: 'November', value: 'November' },
            { label: 'December', value: 'December' },
        ];
    }

    get categoryOptions() {
        return [
            { label: 'Food', value: 'Food' },
            { label: 'Transport', value: 'Transport' },
            { label: 'Entertainment', value: 'Entertainment' },
            // Add more categories as needed
        ];
    }

    get filteredExpenses() {
        return this.expenses.filter(expense => expense.month === this.selectedMonth);
    }

    handleMonthChange(event) {
        this.selectedMonth = event.detail.value;
    }

    handleExpenseAmountChange(event) {
        this.expenseAmount = event.target.value;
    }

    handleExpenseDateChange(event) {
        this.expenseDate = event.target.value;
    }

    handleExpenseCategoryChange(event) {
        this.expenseCategory = event.detail.value;
    }

    handleAddExpense() {
        // Logic to add the expense
        const newExpense = {
            id: this.expenses.length + 1,
            amount: this.expenseAmount,
            date: this.expenseDate,
            category: this.expenseCategory,
            month: this.getMonthFromDate(this.expenseDate)
        };
        this.expenses = [...this.expenses, newExpense];
        this.clearExpenseForm();
    }

    getCurrentMonth() {
        const date = new Date();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[date.getMonth()];
    }

    getMonthFromDate(date) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthIndex = new Date(date).getMonth();
        return monthNames[monthIndex];
    }

    getTotalSpent() {
        return this.filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
    }

    clearExpenseForm() {
        this.expenseAmount = 0;
        this.expenseDate = '';
        this.expenseCategory = '';
    }
}
