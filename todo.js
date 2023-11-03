function loadTODOList() {
    const todoListString = localStorage.getItem("alle_todos");
    return todoListString ? JSON.parse(todoListString) : [];
}

function addTODO(){
    let todo_div = appendTemplate("todoAdd-template", "todolist")
    todo_div.id = ""
}

function saveTODO(div, index){
    let todolist = loadTODOList()
    let todoValue = div.value 
    if(todoValue !== ""){
        todolist[index-2] = todoValue
    }
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
    if(todo_per_day === 0){
        todo_div.style.backgroundColor = "#2d2d2d"
    }else if (durchschnite < 0.4){
        todo_div.style.backgroundColor = "#800020"
    } else if (durchschnite < 0.8 && durchschnite >0.3){
        todo_div.style.backgroundColor = "#2d2d2d"
    } else if (durchschnite >= 0.8){
        todo_div.style.backgroundColor = "#023020"
    }
}

function saveTodoFinsihed(){
    let finishedToDo = []
    let date = getDate()
    let divsFinished = document.querySelectorAll('input[name="work"]:checked')
    divsFinished.forEach(div => {
        let todo = div.parentElement.id
        finishedToDo.push(todo) 
    });
    localStorage.setItem(date, JSON.stringify(finishedToDo))
}