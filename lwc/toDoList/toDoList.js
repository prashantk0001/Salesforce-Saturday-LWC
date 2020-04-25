import {
    LightningElement,
    track
} from 'lwc';

import fetchTodoListApex from '@salesforce/apex/TodoService.fetchTodoList';
import getUserDetailsApex from '@salesforce/apex/TodoService.getUserDetails';
import addTodoApex from '@salesforce/apex/TodoService.addTodo';
import removeTodoApex from '@salesforce/apex/TodoService.removeTodo';

export default class ToDoList extends LightningElement {

    @track todoList;

    @track userInformation = {};

    constructor() { // thread 1
        super();
        getUserDetailsApex()
            .then(result => {       //thread 2 
                this.userInformation = result;
                fetchTodoListApex({
                        userId: this.userInformation.Id
                    }).then(result => {     //thread 3
                        this.todoList = result;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });

    }

    init = async () => {    //thread 1
        try{
            this.userInformation = await getUserDetailsApex();
            if(this.userInformation){
                this.todoList = await fetchTodoListApex({
                    userId : this.userInformation.Id
                });
                
            }
        } catch(err){
            console.log(err);
        }
    }


    addToDo(event) {
        let todo = this.template.querySelector('.todospan').innerText;
        console.log(todo);

        if (todo && todo !== 'Enter new Todo') {
            addTodoApex({
                    reccordToInsert: {
                        Name: todo
                    }
                }).then(result => {
                    this.todoList.push(result);
                    console.log(this.todoList);
                })
                .catch(error => {
                    console.log(error);
                });

            this.template.querySelector('.todospan').innerText = 'Enter new Todo';
        }
    }

    removeToDo(event) {

        removeTodoApex({
                todoId: event.target.dataset.id
            }).then(() => {})
            .catch(error => {
                console.log(error);
            });
        let updated = this.todoList.filter(function (value, index, arr) {
            return event.target.dataset.id !== value.Id;
        });
        this.todoList = updated;
    }

    @track todoToBeCopied;

    saveTodoAndshowAlert(todo) {
        addTodoApex({
                reccordToInsert: {
                    Name: todo.Name + ' (copied)'
                }
            }).then(result => {
                this.todoList.push(result);
                alert('Todo Copied - ' + result.Name);
                console.log(this.todoList);
            })
            .catch(error => {
                console.log(error);
            });
    }

    copyTodo(event) {

        this.todoToBeCopied = this.todoList.filter(function (value, index, arr) {
            return event.target.dataset.id === value.Id;
        })[0];

        var copiedTodo = {};
        Object.keys(this.todoToBeCopied).forEach(function (key) {
            console.log('this reference: ', this);
            copiedTodo[key] = this.todoToBeCopied[key]; 

            if (key == 'Name') {
                this.saveTodoAndshowAlert(copiedTodo);
            }

        });

    }

    copyTodoArrow(event) {
        this.todoToBeCopied = this.todoList.filter(function (value, index, arr) {
            return event.target.dataset.id === value.Id;
        })[0];
        let copiedTodo = {};
        Object.keys(this.todoToBeCopied).forEach((key) => { //arrow methods do not change the context i.e. "this"
            console.log('this reference: ', this);
            copiedTodo[key] = this.todoToBeCopied[key];
            if (key == 'Name') {
                this.saveTodoAndshowAlert(copiedTodo);
            }
        });
    }


    copyTodoWithClosure(event) {
        this.todoToBeCopied = this.todoList.filter(function (value, index, arr) {
            return event.target.dataset.id === value.Id;
        })[0];
        
        var copiedTodo = {};
        var javascriptControllerInstance = this; //Notice 'var' here, we're creating a closure here!!

        //a closure gives you access to an outer function’s scope from an inner function.

        Object.keys(this.todoToBeCopied).forEach(function (key) {
            console.log('this reference: ', this);
            console.log('javascriptControllerInstance: ', javascriptControllerInstance);

            copiedTodo[key] = javascriptControllerInstance.todoToBeCopied[key];
            if (key == 'Name') {
                javascriptControllerInstance.saveTodoAndshowAlert(copiedTodo.Name);
                /*
                use "context" variable enclosed in the closure to call methods/access variables 
                in this js controller as shown above
               */
            }
        });

    }

    

}