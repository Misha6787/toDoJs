'use strict';

const   todoControl = document.querySelector('.todo-control'),
        headerInput = document.querySelector('.header-input'),
        todoList = document.querySelector('.todo-list'),
        todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

document.addEventListener('DOMContentLoaded', function(){
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
    if((toDoData = JSON.parse(localStorage.getItem('toDoData'))) === null){
        toDoData = [];
    }
});

let toDo;
    toDo = JSON.parse(localStorage.getItem('toDoData'));
    if(toDo !== null){
        toDoData = toDo;
    }

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    toDoData.forEach(function(item, i){
        if(item !== null){
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.innerHTML = ' <span class="text-todo">'+ item.value +'</span>' +
                '<div class="todo-buttons">' + 
                    '<button class="todo-remove"></button>' +
                    '<button class="todo-complete"></button>' +
                '</div>';
            if(item.completed){
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }
            const btnTodoCompleted = li.querySelector('.todo-complete');
            btnTodoCompleted.addEventListener('click', function(){
                item.completed = !item.completed;
                localStorage.setItem('toDoData', JSON.stringify(toDoData));
                render(); 
            });
            const btnTodoRemove = li.querySelector('.todo-remove');
            btnTodoRemove.addEventListener('click', function(){
                delete toDoData[i];
                localStorage.setItem('toDoData', JSON.stringify(toDoData));
                render();
            });
        }
    });
    toDoData = toDoData.filter(item => item !== null);
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value !== ''){
        const newTodo = {
            value: headerInput.value,
            completed: false,
        };
        toDoData.push(newTodo);
        headerInput.value = '';
        localStorage.setItem('toDoData', JSON.stringify(toDoData));
        render();
    } 
});

render();

