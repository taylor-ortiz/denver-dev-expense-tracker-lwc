# Denver Salesforce Developer Group - Salesforce Expense Tracker LWC:

Inflation and its effects have you in a tizzy! You recently got a higher than normal water bill and you screamed at the mail man. You think to yourself that you wish you had a way to track your expenses so that you can create more visibility into what you are spending. Being proficient in Salesforce as a developer, you decide to build an expense tracker Lightning Web Component that allows you to enter and track your expenses. 

# Setup Steps
1. **Clone the Repo:** Clone the repository from github by using git clone or downloading the zip file
    - Open the terminal and go to a folder you want to store code in and run the following command: ```git clone https://github.com/taylor-ortiz/denver-dev-expense-tracker-lwc.git```
    - If you do not have github and do not have git -> download this zip file "[denver-dev-expense-tracker-lwc.zip](https://github.com/taylor-ortiz/denver-dev-expense-tracker-lwc/raw/refs/heads/main/denver-dev-expense-tracker-lwc.zip)" and extract the contents.
    - Then, regardless of the method you used, open the denver-dev-expense-tracker-lwc folder in VS Code.
1. **Authorize your dev org:** If you have not already "Authorized an Org" in your VS Code environment, click "No Default Org Set" in the VS Code Status bar (bottom bar) and authorize your dev org.
    - If you don't have a dev org, you can create a scratch org by running ```sf org create scratch -d -f config/project-scratch-def.json -a expense-tracker-lwc```
1. **Deploy the repo:** Once authorized, navigate to force-app/main/default, right click, and select "SFDX: Deploy This Source To Org"
1. **Assign the Expense Tracker permissions:** Give your user the Expense Tracker permission set via setup or by running the following command:
    - ```sf org assign permset --name Expense_Tracker```
1. **Create some test records:** Now let's create a budget for October and some test records. You can go to the Expense Tracker app and create them yourself, or import our example data using the following command.
    - ```sf data import tree --files Budget__c-Expense__c.json```

## Here is what we will be building

![Screenshot 2024-10-18 at 4 43 53 PM](https://github.com/user-attachments/assets/f8e41bc5-b78e-4367-9b80-a3e8f49fa503)

# Requirements

## 1. Lightning Combobox for Month Selection
- Add a lightning combobox that uses the `monthOptions` variable from the JavaScript file.
- Add an `onchange` event to the combobox to handle month selection and call the `handleMonthChange` function from the JavaScript file.

## 2. Display and Styling for Total Spent
- Add a CSS class to the total spent section to give the amount a larger font size and center alignment.
- Make the total spent amount dynamic by using the `totalExpensesAmount` variable from the JavaScript file. Ensure that the value is checked and loaded before referencing it in the HTML.

## 3. Lightning Input Fields for Expense Creation
- Add the `Amount__c` and `Budget__c` fields as `lightning-input-field` components, similar to the `Name` field. Ensure consideration of how the `Budget__c` field is rendered, possibly by referencing an existing getter method from the JavaScript file.
- Add the `Date` and `Category` fields from the expense object as `lightning-input-field` components.

## 4. Expense Object Import and Reference
- Import the expense object using the `@salesforce/schema/` module in the JavaScript file. This will be used in the record-edit-form in the HTML template.
- Add a reference to the imported expense object in the JavaScript class and set the `expenseObject` variable equal to the imported object.

## 5. Expense Object for Record Form
- Now that you have imported the expense object in your JS file, replace the hardcoded object reference in the `<lightning-record-edit-form>` with the dynamically imported `Expense__c` object from the JavaScript file.

## 6. Apex: Query for Expenses Based on Budget ID
- Write a SOQL query that retrieves all expenses related to the given `budgetId` and orders them by `Transaction_Date__c` in ascending order.

## 7. Set response data from Apex expenses query to expense array
- TODO: set your response data to the expenses array at the top of the JS file

## 8. Wiring Data and Refreshing Apex
- In the `wiredExpenses` function, store the result data so that it can be used for refreshing Apex when new expenses are added.
    - **Hint**: There is already a pattern in the file for storing results (see `wiredBudget`).

## 9. Handling Expense Creation
- Create a toast event to notify the user when a new expense has been successfully created.
    - **Hint**: You can reference the `ShowToastEvent` example in the `handleRowAction` method.
- After successfully creating an expense, refresh the `expenses` array to show the updated data.

## 10. Get row ID of the deleted record from the event
- TODO: Get the row ID of the deleted record from the event.

## 11. Handling Row Action for Deleting Expense
- In the `handleRowAction` method, get the row ID of the record that needs to be deleted from the event details.
- Use the `deleteRecord()` method to delete the expense record based on the row ID.
- After successfully deleting the record, refresh the `expenses` array to reflect the updated data.

## 12. Bug!
-  When switching to a month with no expenses, the totalExpensesAmount variable is not showing 0. What could be causing this?