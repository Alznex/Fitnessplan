window.onload = function() {
    changeBackgroundColor(perzent_done_per_day)
};

function addTODO(){
    let todo_div = appendTemplate("todo-template", "todolist")
    todo_div.id = ""
}

var todo_per_day = 10
var done_per_day = 9
var perzent_done_per_day = done_per_day / todo_per_day


function changeBackgroundColor(durchschnite_todo) {
    let durchschnite = durchschnite_todo
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