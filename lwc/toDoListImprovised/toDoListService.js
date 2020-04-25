import {
    LightningElement
} from 'lwc';
import fetchTodoListApex from '@salesforce/apex/TodoService.fetchTodoList';
import addTodoApex from '@salesforce/apex/TodoService.addTodo';
import removeTodoApex from '@salesforce/apex/TodoService.removeTodo';

import {getUserInfo} from 'c/utilityMethods';


export default class ToDoListService extends LightningElement {

    fetchUserInformationService = async () => {
        return await getUserInfo();
    }

    fetchTodoListForLoggedInUserService = async (userId) => {
        return await fetchTodoListApex({
            userId : userId
        });
    }

    addTodoService = async (record) => {
        return await addTodoApex({
            reccordToInsert : record
        });
    }
    
    removeTodoService = (recordId) => {
        removeTodoApex({
            todoId : recordId
        });
    }

    copyTodoService = (recordToBeCopied) =>{
        let copiedTodo = {};
        Object.keys(recordToBeCopied).forEach((key) => {
            console.log('this reference: ', this);
            copiedTodo[key] = recordToBeCopied[key];
        });
        return copiedTodo;
    }

}