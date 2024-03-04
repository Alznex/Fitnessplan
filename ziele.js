let alle_goals = JSON.parse(localStorage.getItem("alle_goals")) || {}

function createGoal(name, currentValue, maxValue){
    let targetId = "ziele" 
    let goal = appendTemplate("goals-template", targetId)
    goal.id = name
    let goalName = goal.querySelector(".goalsfirst")
    let input = goal.querySelector(".goalslider")
    let output = goal.querySelector(".goalslast")

    goalName.innerHTML = name
    input.max = maxValue
    input.value = currentValue
    output.innerHTML = currentValue + "/"+maxValue

    input.oninput = function() {
        output.innerHTML = this.value + "/"+maxValue
    }
}

function addGoal(){
    let div = appendTemplate("goals-template", "ziele")
    div.id = "goalAdd"
    let output = div.querySelector(".alignItems")
    output.innerHTML = "+Hinzufügen"
    div.addEventListener("click", () => {
        addAbsolut("goal")
        clearInput("goal")
    })
}

function saveGoal(){
    let goal = {}
    let inputs = document.querySelectorAll("input.goal_input")
    for (let i = 0; i < inputs.length; i++) {
        let name = inputs[i].name
        goal[name] = inputs[i].value
    }
    alle_goals[goal["Name"]] = goal
    localStorage.setItem("alle_goals", JSON.stringify(alle_goals))
    renderGoals()
}


function saveFromSlider(name, value){
    let alle_goals = JSON.parse(localStorage.getItem("alle_goals")) || {}
    goal["currentValue"] = value
    goal["Name"] = name
    goal["maxValue"] = alle_goals[name["maxValue"]] 
    alle_goals[goal["Name"]] = goal
    localStorage.setItem("alle_goals", JSON.stringify(alle_goals))
}
function deletGoal(goal){
    delete alle_goals[goal]
    localStorage.setItem("alle_goals", JSON.stringify(alle_goals))
    renderGoals()
}

function bearbeitenGoals(goalName){
    let inputs = document.querySelectorAll(".goal_input")
    let goal = alle_goals[goalName]

    for(let input in inputs){
        if(inputs[input].name == "Name"){
            inputs[input].value = goal.Name
        }else if(inputs[input].name == "maxValue"){
            inputs[input].value = goal.maxValue
        }else if(inputs[input].name == "currentValue"){
            inputs[input].value = goal.currentValue
        }
    }
}
