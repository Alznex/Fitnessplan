function hatUebung(wochentag) {
    return wochentag.uebungen.length > 0
}

function renderStart() {
    document.getElementById("aktullerTag").innerHTML = ""

    for (let wochentag of alle_wochentage) {
        date = berechneWochentag()
        if (wochentag.tag == date){
            if (!hatUebung(wochentag)) continue
            let wochentag_div = appendTemplate("wochentag-template", "aktullerTag")
            setDataElementValue(wochentag_div, "wochentag", "Heute")
            wochentag_div.id = "Heute"
            
            for (let index = 0 ; index < wochentag.uebungen.length; index++) {
                let uebung_id = wochentag.uebungen[index]
                let uebung = alle_uebungen[uebung_id]
            
                let uebung_div = appendTemplate("uebung-id", "Heute")
                for (const [key, value] of Object.entries(uebung)) {
                    if (key == "ID") {
                        uebung_div.id = value
                    }
                    if (key == "Gewicht") {
                        let value_gewicht = value + "kg"
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
}

function renderTodoList(){
    document.getElementById("todolist").innerHTML = ""

    for (let todo in todolist){
        let todo_div = appendTemplate("todo-template", "todolist")
        setInputElementValue(todo_div, "todo", todolist[todo])
        todo_div.id = todolist[todo];
    }
    document.querySelectorAll('.loeschentodo').forEach((item, key) => {
        item.addEventListener('click', event => {
        key = key - 1
        deletTODO(key)
        })
    })
}

function renderwochentage() {
    document.getElementById("wochentage").innerHTML = ""

    for (let wochentag of alle_wochentage) {
        if (!hatUebung(wochentag)) continue
        let wochentag_div = appendTemplate("wochentag-template", "wochentage")
        setDataElementValue(wochentag_div, "wochentag", wochentag.tag);
        wochentag_div.id = wochentag.tag;
        for (let index = 0 ; index < wochentag.uebungen.length; index++) {
            let uebung_id = wochentag.uebungen[index]
            let uebung = alle_uebungen[uebung_id]
            
            let uebung_div = appendTemplate("uebung-id", wochentag.tag)
            uebung_div.dataset.index = index
            for (const [key, value] of Object.entries(uebung)) {
                if (key == "ID") {
                    uebung_div.id = value;
                }
                if (key == "Gewicht") {
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
}

function bearbeiten(uebung_id) { 
    clearInput()
    let inputs = document.querySelectorAll(".normal_input")
    let checkbox = document.querySelectorAll(".wochentage-selector")
    let selector = document.getElementById("koerperteil")
    let uebungen = alle_uebungen[uebung_id]
    show("uebung")

    for (let input_id in inputs) {
        for (const [key, value] of Object.entries(uebungen)) {
            if (input_id == 0 && key == "Name") {
                inputs[input_id].value = value
            } else if (input_id == 1 && key == "Sets") {
                inputs[input_id].value = value
            } else if (input_id == 2 && key == "Reps") {
                inputs[input_id].value = value
            } else if (input_id == 3 && key == "Gewicht") {
                inputs[input_id].value = value
            } else if (input_id == 4 && key == "Info") {
                inputs[input_id].value = value
            } else if (input_id == 5 && key == "ID") {
                inputs[input_id].value = value
            }
        }
    }
    for (let i = 0; i < checkbox.length; i++) {
        if (uebungen.Wochentag.includes(checkbox[i].value)) {
            checkbox[i].checked = true
        }
    }
    for (let selector_values of selector) {
        if (alle_uebungen[uebung_id].koerperteil == selector_values.label) {
            if (uebungen.koerperteil != "Körperteil"){
            selector.value = uebungen.koerperteil
            }
        }
    }
}

function clearInput() {
    let inputs = document.querySelectorAll(".normal_input")
    let checkbox = document.querySelectorAll(".wochentage-selector")
    let selector = document.getElementById("koerperteil")

    for (let eingabe in inputs) {
        if(eingabe == "1"){
            inputs[eingabe].value = "3"
        }else if (eingabe == "2"){
            inputs[eingabe].value = "15"
        }else if(eingabe == "3"){
            inputs[eingabe].value = "10"
        }else{
            inputs[eingabe].value = ""
        }
    }
    for (let checkboxes in checkbox) {
        checkbox[checkboxes].checked = false
    }
    selector.value = "none"
}