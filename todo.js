document.addEventListener("DOMContentLoaded", function () {
    const todoList = loadTODOList()
    changeBackgroundColor()
})

function loadTODOList() {
    const todoListString = localStorage.getItem("alle_todos");
    return todoListString ? JSON.parse(todoListString) : [];
}

function addTODO(){
    let todo_div = appendTemplate("todo-template", "todolist")
    todo_div.id = ""
}

function saveTODO(){
    let todolist = []
    let todos = document.querySelectorAll('[data-id="todo"]')
    todos.forEach((todo) => {
        let todoValue = todo.value 
        if(todoValue !== ""){
            todolist.push(todoValue)
        }
    })
    localStorage.setItem("alle_todos", JSON.stringify(todolist))
    renderTodoList()
}

function deletTODO(index){
    let todolist = loadTODOList()
    todolist.splice(index, 1)
    localStorage.setItem("alle_todos", JSON.stringify(todolist))
    renderTodoList()
}

function changeBackgroundColor() {
    todolist = loadTODOList()
    let todo_per_day = todolist.length
    let checked_div = document.querySelectorAll('input[name="work"]:checked')
    let done_per_day = checked_div.length

    let durchschnite = done_per_day / todo_per_day
    let todo_div = document.getElementById("todo")
    if (durchschnite < 0.4){
        todo_div.style.backgroundColor = "#800020"
    } else if (durchschnite < 0.8 && durchschnite >0.3){
        todo_div.style.backgroundColor = "#2d2d2d"
    } else if (durchschnite >= 0.8){
        todo_div.style.backgroundColor = "#023020"
    }
}