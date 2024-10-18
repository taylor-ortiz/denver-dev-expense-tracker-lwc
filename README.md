# Denver Salesforce Developer Group - Salesforce Expense Tracker LWC:

Inflation and its effects have you in a tizzy! You recently got a higher than normal water bill and you screamed at the mail man. You think to yourself that you wish you had a way to track your expenses so that you can create more visibility into what you are spending. Being proficient in Salesforce as a developer, you decide to build an expense tracker Lightning Web Component that allows you to enter and track your expenses. 

## Setup Steps
- If you are planning on cloning the repo from Github -> Clone the repository from github into VS Code using the following command in your terminal
    - git clone https://github.com/taylor-ortiz/denver-dev-expense-tracker-lwc.git
- If you do not have github and do not have git -> Find the file in the public github repo called "denver-dev-expense-tracker-lwc"
    - Click on it
    - Select "View Raw" (this should auto download it)
    - Open this folder in VS Code
- If you have not already "Authorized an Org" in your VS Code environment, please do so
- Once authorized, navigate to force-app/main/default, right click, and select "SFDX: Deploy This Source To Org"
- We will do a cursory look here to make sure everything made it in okay
- Once confirmed, lets use either the UI in Salesforce or the CLI to create a Budget__c record
    - If creating in the UI, navigate in the 'Expense Tracker' app to the Budget tab, select New and fill in the following attributes:
        - Name: 'October Budget'
        - Month: 'October'
    - If creating using the CLI, just navigate to your terminal and run the following command:
        - sfdx force:data:record:create -s Budget__c -v "Name='October Budget' Month__c='October'" --json
- Once we have created the Budget__c record, we can go ahead and create some Expense records in the UI under the Budget__c record you just created so we have something show up in the list view when we load the component on the Home page


## Here is what we will be building
![Screenshot 2024-10-18 at 4 40 55 PM](https://github.com/user-attachments/assets/9617c0f8-0351-489b-ad9f-ad79bdd23d91)
