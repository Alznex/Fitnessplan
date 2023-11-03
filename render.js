function renderTodoList(){
    let todolist = loadTODOList()
    document.getElementById("todolist").innerHTML = ""

    if (todolist === null || todolist === undefined || todolist.length === 0) {
        addTODO()
        addEventSaveTodo()
        changeBackgroundColor()
        return
    }

    todolist.forEach((todo, index) => {
        const todo_div = appendTemplate("todo-template", "todolist")
        setInputElementValue(todo_div, "todo", todo)
        todo_div.id = todo

        let deleteButton = todo_div.querySelector(".svgDelet")
        deleteButton.addEventListener('click', () => deletTODO(index))
    })
    addTODO()
    addEventSaveTodo()
    addEventTodochecker()
    changeBackgroundColor()
}

function renderGoals(){
    let goals = alle_goals
    let ElementId = "ziele"
    document.getElementById(ElementId).innerHTML = ""
    for(let goale in goals){
        createGoal(goals[goale].Name, goals[goale].currentValue, goals[goale].maxValue,)
    }
    addEventGoals()
    addGoal()
}

function hatUebung(wochentag) { return wochentag.uebungen.length > 0 }

function renderStart() {
    document.getElementById("aktullerTag").innerHTML = ""
    for (let wochentag of alle_wochentage) {
        date = berechneWochentag()
        if (wochentag.tag == date){
            let wochentag_div = appendTemplate("wochentag-template", "aktullerTag")
            let uebungenTarget = wochentag_div.querySelector("#uebungen")
            uebungenTarget.id = "uebungenHeute"
            setDataElementValue(wochentag_div, "wochentag", "")
            wochentag_div.id = "Heute"
            if (!hatUebung(wochentag)){
                setDataElementValue(wochentag_div, "leer", "No Gym today?")
            }
            for (let index = 0 ; index < wochentag.uebungen.length; index++) {
                let uebung_id = wochentag.uebungen[index]
                let uebung = alle_uebungen[uebung_id]
                
                let uebung_div = appendTemplate("uebung-row-template", "uebungenHeute")
                for (const [key, value] of Object.entries(uebung)) {
                    if (key == "ID") {
                        uebung_div.id = value;
                    }else if (key == "Gewicht") {
                    let value_gewicht = value + " kg"
                    setDataElementValue(uebung_div, key, value_gewicht)
                    } else if (key == "Sets") {
                    let value_sets = value + " Sets"
                    setDataElementValue(uebung_div, key, value_sets)
                    } else if (key == "Reps") {
                    let value_reps = value + " Reps"
                    setDataElementValue(uebung_div, key, value_reps)
                    } else {
                    setDataElementValue(uebung_div, key, value)
                    }
                }
            }
        }
    }
    addEventUebung()
    renderTodoList()
    renderGoals()
}

function renderwochentage() {
    document.getElementById("wochentage").innerHTML = ""
    for (let wochentag of alle_wochentage) {
        if (!hatUebung(wochentag)) continue
        let wochentag_div = appendTemplate("wochentag-template", "wochentage")
        let uebungenTarget = wochentag_div.querySelector("#uebungen")
        uebungenTarget.id = "uebungen" + wochentag.tag
        setDataElementValue(wochentag_div, "wochentag", wochentag.tag)
        wochentag_div.id = wochentag.tag
        for (let index = 0 ; index < wochentag.uebungen.length; index++) {
            let uebung_id = wochentag.uebungen[index]
            let uebung = alle_uebungen[uebung_id]
            
            let uebung_div = appendTemplate("uebung-row-template", "uebungen" + wochentag.tag)
            uebung_div.dataset.index = index
            for (const [key, value] of Object.entries(uebung)) {
                if (key == "ID") {
                    uebung_div.id = value;
                }else if (key == "Gewicht") {
                let value_gewicht = value + " kg"
                setDataElementValue(uebung_div, key, value_gewicht)
                } else if (key == "Sets") {
                let value_sets = value + " Sets"
                setDataElementValue(uebung_div, key, value_sets)
                } else if (key == "Reps") {
                let value_reps = value + " Reps"
                setDataElementValue(uebung_div, key, value_reps)
                } else {
                setDataElementValue(uebung_div, key, value)
                }
            }
            uebung_div.addEventListener('dragstart', dragStart(index))
            uebung_div.addEventListener('dragend', dragEnd(wochentag_nummern[wochentag.tag], index))
        
            uebung_div.addEventListener('dragover', dragOver(index))
            uebung_div.addEventListener('dragenter', dragEnter(index))
            uebung_div.addEventListener('dragleave', dragLeave(index))
            uebung_div.addEventListener('drop', dragDrop(wochentag_nummern[wochentag.tag], index))
        
            uebung_div.addEventListener('touchstart', touchStart(index))
            uebung_div.addEventListener('touchend', touchEnd(wochentag_nummern[wochentag.tag], index))
            uebung_div.addEventListener('touchmove', touchMove)
        }
    }
    addEventUebung()
    addEventUebersicht()
}

function renderAlleUebungen(){
    document.getElementById("wochentage").innerHTML = ""
    for(let uebung in alle_uebungen){
        let uebung_div = appendTemplate("uebung-row-template", "wochentage")
        for (const [key, value] of Object.entries(alle_uebungen[uebung])) {
            if (key == "ID") {
                uebung_div.id = value;
            }else if (key == "Gewicht") {
            let value_gewicht = value + " kg"
            setDataElementValue(uebung_div, key, value_gewicht)
            } else if (key == "Sets") {
            let value_sets = value + " Sets"
            setDataElementValue(uebung_div, key, value_sets)
            } else if (key == "Reps") {
            let value_reps = value + " Reps"
            setDataElementValue(uebung_div, key, value_reps)
            } else {
            setDataElementValue(uebung_div, key, value)
            }
        }
    }
    addEventUebung()
}