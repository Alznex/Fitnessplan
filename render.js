function renderTodoList(){
    document.getElementById("todolist").innerHTML = ""
    let Date = getDate()
    let todolist = loadFromLocalStorage("alle_todos", {})

    if (!todolist || todolist.length === 0 || todolist == 0) {
        addTODO()
        addEventSaveTodo()
        changeBackgroundColor()
        return
    }
    for(todo in todolist){
        let todoDiv = appendTemplate("todo-template", "todolist")
        setInputElementValue(todoDiv, "todo", todolist[todo].name)
        todoDiv.id = todo
        if(todolist[todo].checked == true){
            todoDiv.querySelector(".todochecker").checked = true
        }
    }
    addEventDeletTodo()
    addTODO()
    addEventSaveTodo()
    addEventTodochecker()
    changeBackgroundColor()
}

function renderGoals(){
    let goals = alle_goals
    let ElementId = "ziele"
    document.getElementById(ElementId).innerHTML = ""
    for(let goal in goals){
        createGoal(goals[goal].Name, goals[goal].currentValue, goals[goal].maxValue,)
    }
    addEventGoals()
    addGoal()
}

function hatUebung(wochentag){ return wochentag.uebungen.length > 0 }

function renderStart() {
    document.getElementById("aktullerTag").innerHTML = ""
    renderTodoList()
    checkForUebungen()
    let uebungen = loadFromLocalStorage("alle_uebungen", {})
    let wochentage = loadFromLocalStorage("alle_wochentage", alle_wochentage_empty)
    for (let wochentag of wochentage) {
        date = berechneWochentag()
        if (wochentag.tag == date){
            let wochentagDiv = appendTemplate("wochentag-template", "aktullerTag")
            let uebungenTarget = wochentagDiv.querySelector("#uebungen")
            uebungenTarget.id = "uebungenHeute"
            setDataElementValue(wochentagDiv, "wochentag", "")
            wochentagDiv.id = "Heute"
            if (!hatUebung(wochentag)){
                setDataElementValue(wochentagDiv, "leer", "No Gym today?")
            }
            for (let index = 0 ; index < wochentag.uebungen.length; index++) {
                let uebungId = wochentag.uebungen[index]
                let uebung = uebungen[uebungId]
                let uebungDiv = appendTemplate("uebung-row-template", "uebungenHeute")
                for (const [key, value] of Object.entries(uebung)) {
                    if (key == "ID") {
                        uebungDiv.id = value;
                    }else if (key == "Gewicht") {
                        setDataElementValue(uebungDiv, key, value+" kg")
                    } else if (key == "Sets") {
                        setDataElementValue(uebungDiv, key, value+" Sets")
                    } else if (key == "Reps") {
                        setDataElementValue(uebungDiv, key, value+" Reps")
                    } else {
                        setDataElementValue(uebungDiv, key, value)
                    }
                }
            }
        }
    }
    addEventUebung()
    renderGoals()
    show("home")
}

function renderwochentage() {
    document.getElementById("wochentage").innerHTML = ""
    checkForUebungen()
    let uebungen = loadFromLocalStorage("alle_uebungen", {})
    let wochentage = loadFromLocalStorage("alle_wochentage", alle_wochentage_empty)
    for (let wochentag of wochentage) {
        if (!hatUebung(wochentag)) continue
        let wochentagDiv = appendTemplate("wochentag-template", "wochentage")
        let uebungenTarget = wochentagDiv.querySelector("#uebungen")
        uebungenTarget.id = "uebungen" + wochentag.tag
        setDataElementValue(wochentagDiv, "wochentag", wochentag.tag)
        wochentagDiv.id = wochentag.tag
        for (let index = 0 ; index < wochentag.uebungen.length; index++) {
            let uebungId = wochentag.uebungen[index]
            let uebung = uebungen[uebungId]
            
            let uebungDiv = appendTemplate("uebung-row-template", "uebungen" + wochentag.tag)
            uebungDiv.dataset.index = index
            for (const [key, value] of Object.entries(uebung)) {
                if (key == "ID") {
                    uebungDiv.id = value;
                }else if (key == "Gewicht") {
                    setDataElementValue(uebungDiv, key, value+" kg")
                } else if (key == "Sets") {
                    setDataElementValue(uebungDiv, key, value+" Sets")
                } else if (key == "Reps") {
                    setDataElementValue(uebungDiv, key, value+" Reps")
                } else {
                    setDataElementValue(uebungDiv, key, value)
                }
            }
            uebungDiv.addEventListener('dragstart', dragStart(index))
            uebungDiv.addEventListener('dragend', dragEnd(wochentagNummern[wochentag.tag], index))
            uebungDiv.addEventListener('dragover', dragOver(index))
            uebungDiv.addEventListener('dragenter', dragEnter(index))
            uebungDiv.addEventListener('dragleave', dragLeave(index))
            uebungDiv.addEventListener('drop', dragDrop(wochentagNummern[wochentag.tag], index))
            uebungDiv.addEventListener('touchstart', touchStart(index))
            uebungDiv.addEventListener('touchend', touchEnd(wochentagNummern[wochentag.tag], index))
            uebungDiv.addEventListener('touchmove', touchMove)
        }
    }
    addEventUebung()
    addEventUebersicht()
    show("ShownWochentage") 
}

function renderAlleUebungen(){
    document.getElementById("alleUebungen").innerHTML = ""
    let uebungen = loadFromLocalStorage("alle_uebungen", {})
    for(let uebung in uebungen){
        let uebungDiv = appendTemplate("uebung-row-template", "alleUebungen")
        for (const [key, value] of Object.entries(uebungen[uebung])) {
            if (key == "ID") {
                uebungDiv.id = value;
            }else if (key == "Gewicht") {
                setDataElementValue(uebungDiv, key, value+" kg")
            } else if (key == "Sets") {
                setDataElementValue(uebungDiv, key, value+" Sets")
            } else if (key == "Reps") {
                setDataElementValue(uebungDiv, key, value+" Reps")
            } else {
                setDataElementValue(uebungDiv, key, value)
            }
        }
    }
    addEventUebung()
    show("showAlleUebungen")
}

function renderUebungenKoerperteile(koerperteil){
    let selectet = document.getElementById("kategorienSuche")
    document.getElementById("alleUebungen").innerHTML = ""
    let uebungen = loadFromLocalStorage("alle_uebungen", {})
    for(let uebung in uebungen){
        if(selectet.value == "none"){
            let uebungDiv = appendTemplate("uebung-row-template", "alleUebungen")
            for (const [key, value] of Object.entries(uebungen[uebung])) {
                if (key == "ID") {
                    uebungDiv.id = value;
                }else if (key == "Gewicht") {
                    setDataElementValue(uebungDiv, key, value+" kg")
                } else if (key == "Sets") {
                    setDataElementValue(uebungDiv, key, value+" Sets")
                } else if (key == "Reps") {
                    setDataElementValue(uebungDiv, key, value+" Reps")
                } else {
                    setDataElementValue(uebungDiv, key, value)
                }
            }
        }else if(uebungen[uebung].koerperteil == selectet.value){
            let uebungDiv = appendTemplate("uebung-row-template", "alleUebungen")
            for (const [key, value] of Object.entries(uebungen[uebung])) {
                if (key == "ID") {
                    uebungDiv.id = value;
                }else if (key == "Gewicht") {
                    setDataElementValue(uebungDiv, key, value+" kg")
                } else if (key == "Sets") {
                    setDataElementValue(uebungDiv, key, value+" Sets")
                } else if (key == "Reps") {
                    setDataElementValue(uebungDiv, key, value+" Reps")
                } else {
                    setDataElementValue(uebungDiv, key, value)
                }
            }
        }
    }
    addEventUebung()
}