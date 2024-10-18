public with sharing class ExpenseTrackerControllerFinal {
    
    @AuraEnabled (cacheable=true)
    public static List<Budget__c> getCurrentMonthBudget(String selectedMonth) {
        try {
            return [SELECT Id, Name, Total__c FROM Budget__c WHERE Month__c =: selectedMonth ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled (cacheable=true)
    public static List<Expense__c> getExpenses(String budgetId){
        try {
            return [SELECT Name, Amount__c, Transaction_Date__c, Transaction_Category__c FROM Expense__c WHERE Budget__c =: budgetId ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}