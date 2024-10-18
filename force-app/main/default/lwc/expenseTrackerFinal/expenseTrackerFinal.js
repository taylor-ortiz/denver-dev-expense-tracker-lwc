import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCurrentMonthBudget from '@salesforce/apex/ExpenseTrackerController.getCurrentMonthBudget';
import getExpenses from '@salesforce/apex/ExpenseTrackerController.getExpenses';
import EXPENSE_OBJECT from "@salesforce/schema/Expense__c";
import EXPENSE_NAME from "@salesforce/schema/Expense__c.Name";
import EXPENSE_AMOUNT from "@salesforce/schema/Expense__c.Amount__c";
import EXPENSE_DATE from "@salesforce/schema/Expense__c.Transaction_Date__c";
import EXPENSE_CATEGORY from "@salesforce/schema/Expense__c.Transaction_Category__c";

const actions = [
    { label: 'Delete', name: 'delete' },
];

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Amount', fieldName: 'Amount__c', type: 'currency' },
    { label: 'Date', fieldName: 'Transaction_Date__c', type: 'date' },
    { label: 'Category', fieldName: 'Transaction_Category__c', type: 'picklist' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class ExpenseTracker extends LightningElement {

    expenseObject = EXPENSE_OBJECT;
    expenseName = EXPENSE_NAME;
    expenseAmount = EXPENSE_AMOUNT;
    expenseDate = EXPENSE_DATE;
    expenseCategory = EXPENSE_CATEGORY;

    expenseFields = [EXPENSE_NAME, EXPENSE_AMOUNT, EXPENSE_DATE, EXPENSE_CATEGORY]

    @track selectedMonth = this.getCurrentMonth();
    @track expenses = [];

    @track columns = columns;
    @track expenseAmount = 0;
    @track expenseDate = '';
    @track expenseCategory = '';
    @track totalExpensesAmount;
    @track budgetId;
    @track wiredBudgetResult;
    @track wiredExpensesResult;
    currentMonth = 'October'

    @wire(getCurrentMonthBudget, { selectedMonth: '$selectedMonth' })
    wiredBudget(result) {
        console.log(result.data)
        this.wiredBudgetResult = result;
        if (result.data) {
            console.log('what is result data? ', result.data)
            if (result.data.length > 0) {
                this.totalExpensesAmount = result.data[0].Total__c;
                this.budgetId = result.data[0].Id;
            } else {
                this.totalExpensesAmount = 0;
                this.budgetId = '';
            }
        } else if (result.error) {
            // Handle errors
            console.log('show error: ', result.error)
        }
    }

    @wire(getExpenses, {budgetId: '$budgetId'})
    wiredExpenses(result) {
        this.wiredExpensesResult = result;
        if (result.data) {
            this.expenses = result.data;
        } else if (result.error) {
            // Handle errors
            console.log('show error: ', result.error)
        }
    }

    async handleExpenseCreated(event) {
        console.log(event.detail)

        const inputFields = this.template.querySelectorAll("lightning-input-field");
        if (inputFields) {
            inputFields.forEach((field) => {
                field.reset();
            });
        }
        // Refresh the roll-up summary after record is created successfully
        await refreshApex(this.wiredBudgetResult);
        await refreshApex(this.wiredExpensesResult);
    }

    async handleRowAction(event) {
        const actionName = event.detail.action.name;
        console.log('what is action name? ', actionName)
        const row = event.detail.row;
        console.log('what is row? ', row.Id)

        try {
            await deleteRecord(row.Id);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Expense deleted',
                    variant: 'success'
                })
            );
            await refreshApex(this.wiredBudgetResult);
            await refreshApex(this.wiredExpensesResult);

        } catch (error) {
            
        }
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


    get getTotalExpensesAmount() {
        return this.totalExpensesAmount;
    }

    get getBudgetId() {
        return this.budgetId;
    }

    get getExpenses() {
        return this.expenses;
    }

    handleMonthChange(event) {
        this.selectedMonth = event.detail.value;
    }

    getCurrentMonth() {
        const date = new Date();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[date.getMonth()];
    }
}
