function createGoal(name, currentValue, maxValue){
    let targetId = "ziele" 
    let goal = appendTemplate("goals-template", targetId)
    let goalName = goal.querySelector(".goalsfirst")
    let input = goal.querySelector(".goalslider")
    let output = goal.querySelector(".goalslast")
    goalName.innerHTML = name
    input.id = "slider"
    input.max = maxValue
    input.value = currentValue
    output.id = "output"
    slider(maxValue)
}

function slider(maxValue){
    let slider = document.getElementById("slider")
    let output = document.getElementById("output")
    output.innerHTML = slider.value + "/"+maxValue

    slider.oninput = function() {
        output.innerHTML = this.value + "/"+maxValue
    }
}