# Denver Salesforce Developer Group - Salesforce Expense Tracker LWC:

Inflation and its effects have you in a tizzy! You recently got a higher than normal water bill and you screamed at the mail man. You think to yourself that you wish you had a way to track your expenses so that you can create more visibility into what you are spending. Being proficient in Salesforce as a developer, you decide to build an expense tracker Lightning Web Component that allows you to enter and track your expenses. 

## Setup Steps
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
