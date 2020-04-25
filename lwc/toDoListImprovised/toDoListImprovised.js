import {
    track
} from 'lwc';

import ToDoListService from './toDoListService.js';

export default class ToDoList extends ToDoListService {

    @track todoList;

    @track userInformation = {};

    constructor() {
        super();

        this.init();

    }

    init = async () => {
        try{
            this.userInformation = await this.fetchUserInformationService();
            if(this.userInformation){
                this.todoList = await this.fetchTodoListForLoggedInUserService(this.userInformation.Id);
                
            }
        } catch(err){
            console.log(err);
        }
    }

    addToDo = async (event) => {
        let todoSpanElem = this.template.querySelector('.todospan')
        let todo = todoSpanElem.innerText;
        console.log(todo);

        if (todo && todo !== 'Enter new Todo') {

            let reccordToInsert = {
                Name: todo
            };
            let addedTodo; 
            try{
                addedTodo = await this.addTodoService(reccordToInsert);
            }catch(err){
                console.log(err);
            }
            this.todoList.push(addedTodo);

            todoSpanElem.innerText = 'Enter new Todo';
        }
    }

    removeToDo = async (event) => {
        let recordId = event.target.dataset.id;

        this.removeTodoService(recordId);

        let updated = this.todoList.filter( (value, index, arr) => {
            return recordId !== value.Id;
        });
        this.todoList = updated;
    }

    saveTodoAndshowAlert = async (todo) => {

        let copiedTodo = {
            Name: todo.Name + ' (copied)'
        };
        let addedTodo = await this.addTodoService(copiedTodo);
        this.todoList.push(addedTodo);
        alert('Todo Copied - ' + addedTodo.Name);
    }

    copyTodo(event) {
        let todoToBeCopied = this.todoList.filter((value, index, arr) => {
            return event.target.dataset.id === value.Id;
        })[0];

        this.saveTodoAndshowAlert(this.copyTodoService(todoToBeCopied));
    }


}