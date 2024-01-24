/*
  Source : lwcFactory.com
*/
public with sharing class JQueryDataTableCtrl {
  // Apex method to fetch Opportunites records
  @AuraEnabled
  public static list<Opportunity> fetchOpportunity() {
    return [
      SELECT Name, Type, StageName, Amount, CloseDate
      FROM Opportunity
      LIMIT 500
    ];
  }
}