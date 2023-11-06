const alle_todos_empty = {
    PushUp: {checked: true}
}

// Todo list delet neu nach name löschen so wie bei übungen

function addTODO(){
    let todo_div = appendTemplate("todoAdd-template", "todolist")
    todo_div.id = ""
}

function saveTODO(div, index){
    let todolist = loadFromLocalStorage("alle_todos", {})
    let todo = {}
    let todoValue = div.value 
    todo.checked = false
    if(todoValue !== ""){
        todolist[todoValue] = todo
    }
    localStorage.setItem("alle_todos", JSON.stringify(todolist))
    renderTodoList()
}

function deletTODO(name){
    let todolist = loadFromLocalStorage("alle_todos", {})
    delete todolist[name]
    localStorage.setItem("alle_todos", JSON.stringify(todolist))
    renderTodoList()
}

function changeBackgroundColor() {
    todolist = loadFromLocalStorage("alle_todos", {})
    let todo_per_day = todolist.length
    let checked_div = document.querySelectorAll('input[name="work"]:checked')
    let done_per_day = checked_div.length
    let durchschnite = done_per_day / todo_per_day
    let todo_div = document.getElementById("todo")
    if(todo_per_day === 0){
        todo_div.style.backgroundColor = "#2d2d2d"
    }else if (durchschnite < 0.4){
        todo_div.style.backgroundColor = "#150009"
    } else if (durchschnite < 0.8 && durchschnite >0.3){
        todo_div.style.backgroundColor = "#2d2d2d"
    } else if (durchschnite >= 0.8){
        todo_div.style.backgroundColor = "#001510"
    }
}

function saveTodoFinsihed(){ 
    let todos = loadFromLocalStorage("alle_todos", {})
    let lastUsed = loadFromLocalStorage("lastUSed", "")
    let date = getDate()
    if(lastUsed != date){
        for(let todo in todos){
            todos[todo].checked = false
        }
    }
    let divsFinished = document.querySelectorAll('input[name="work"]:checked')
    divsFinished.forEach(div => {
        let todoName = div.parentElement.id
        for(let todo in todos){
            if(todo == todoName){
                todos[todo].checked = true
            }
        }
    });
    localStorage.setItem("alle_todos", JSON.stringify(todos))
    localStorage.setItem("lastUsed", JSON.stringify(date))
}