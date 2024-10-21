import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCurrentMonthBudget from '@salesforce/apex/ExpenseTrackerControllerFinal.getCurrentMonthBudget';
import getExpenses from '@salesforce/apex/ExpenseTrackerControllerFinal.getExpenses';
// TODO: import the expense object here using the '@salesforce/schema/' module. You will reference this in your record-edit-form in your HTML.

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

export default class ExpenseTrackerFinal extends LightningElement {

    // TODO: add a reference to the expense object that you imported here
    // Hint: we want to set our expenseObject variable below equal to what we imported above
    expenseObject;

    selectedMonth = this.getCurrentMonth();
    expenses = [];

    columns = columns;
    expenseAmount = 0;
    expenseDate = '';
    expenseCategory = '';
    totalExpensesAmount;
    budgetId;
    wiredBudgetResult;
    wiredExpensesResult;
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
                this.totalExpensesAmount = 0.00;
                this.budgetId = '';

                // TODO: there is a bug with setting totalExpensesAmount to 0 and it not showing up in the UI if result data is not detected. can you figure out why?
            }
        } else if (result.error) {
            console.log('show error: ', result.error)
        }
    }

    @wire(getExpenses, {budgetId: '$budgetId'})
    wiredExpenses(result) {
        // TODO: warning, this is more challenging. you need to store your result so that you can utilize refresh apex when new expenses are added in the interface.
        // Hint: there is already a pattern for you to reference and copy in this file. Look closely :)
        if (result.data) {
            // TODO: set your response data to the expenses array at the top
        } else if (result.error) {
            console.log('show error: ', result.error)
        }
    }

    async handleExpenseCreated(event) {
        console.log(event.detail)

        // TODO: create a toast event that will notify when a an expense has been successfully created.
        // Hint: there is an example of a toast event that you can use in the handleRowAction function.


        const inputFields = this.template.querySelectorAll("lightning-input-field");
        if (inputFields) {
            inputFields.forEach((field) => {
                field.reset();
            });
        }
        // Refresh the roll-up summary after record is created successfully
        await refreshApex(this.wiredBudgetResult);
        // TODO: refresh the expenses array after a new expense has been added
    }

    async handleRowAction(event) {
        const actionName = event.detail.action.name;
        console.log('what is action name? ', actionName)

        // TODO: get the row Id of the deleted record from the event
        const row = event.detail.row;
        console.log('what is row? ', row.Id)

        try {
            // TODO: use the deleteRecord() imported module above using the row Id to delete the record
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Expense deleted',
                    variant: 'success'
                })
            );
            await refreshApex(this.wiredBudgetResult);
            // TODO: refresh the expenses array after a new expense has been added

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
