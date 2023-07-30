window.onload = function() {
    changeBackgroundColor()
};

function addTODO(){
    let todo_div = appendTemplate("todo-template", "todolist")
    todo_div.id = ""
    todo_div.querySelector.focus() //Todo funktionrt nicht
}

var todolist;
let todolist_string = localStorage.getItem("alle_todos")
if (todolist_string) {
  todolist = JSON.parse(todolist_string)
}

function saveTODO(){
    let todolist =[]
    let todos = document.querySelectorAll('[data-id="todo"]')
    for (let todo in todos){
        let todo_value = todos[todo].value 
        if (todo_value != null && todo_value !== 'undefined' && todo_value !== "") {
            todolist.push(todo_value)
         }
    }
    localStorage.setItem("alle_todos", JSON.stringify(todolist))

}

function deletTODO(value){
    todolist.splice(value, 1)
    localStorage.setItem("alle_todos", JSON.stringify(todolist))
    renderTodoList()
}


function changeBackgroundColor() {
    let todo_per_day = todolist.length
    let checked_div = document.querySelectorAll('input[name="work"]:checked')
    let done_per_day = checked_div.length

    let durchschnite = done_per_day / todo_per_day
    let todo_div = document.getElementById("todo")
    if (durchschnite < 0.4){
        todo_div.style.backgroundColor = "red"
    } else if (durchschnite <= 0.5 && durchschnite >0.3){
        todo_div.style.backgroundColor = "orange"
    } else if (durchschnite > 0.6 && durchschnite < 0.8){
        todo_div.style.backgroundColor = "#2d2d2d"
    } else if (durchschnite >= 0.8){
        todo_div.style.backgroundColor = "green"
    }
}