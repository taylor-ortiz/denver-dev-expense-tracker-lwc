public with sharing class ExpenseTrackerController {
    
    @AuraEnabled (cacheable=true)
    public static List<Budget__c> getCurrentMonthBudget(String selectedMonth) {
        try {
            return [SELECT Id, Name, Total__c FROM Budget__c WHERE Month__c =: selectedMonth ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled // TODO: make this method cacheable
    public static List<Expense__c> getExpenses(String budgetId){
        try {
            // TODO: write a query that pulls all of your expenses for a given month and orders them by Transaction Date ASC
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}