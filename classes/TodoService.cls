public with sharing class TodoService {
    
    @AuraEnabled
    public static User getUserDetails(){
        return [SELECT Name,Id FROM User WHERE id =: UserInfo.getUserId()];
    }

    @AuraEnabled
    public static List<Todo__c> fetchTodoList(Id userId){
        return [SELECT Name,CreatedDate,Id FROM Todo__c WHERE CreatedById =: userId];
    }

    @AuraEnabled
    public static Todo__c addTodo(Todo__c reccordToInsert){
        insert reccordToInsert;
        return [SELECT Name,CreatedDate,Id FROM Todo__c WHERE Id =: reccordToInsert.Id];
    }

    @AuraEnabled
    public static void removeTodo(Id todoId){
        delete new Todo__c(id=todoId);
    }

}