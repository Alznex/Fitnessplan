function hatUebung(wochentag) {
    return wochentag.uebungen.length > 0;
}
  
function renderStart() {
    document.getElementById("aktullerTag").innerHTML = "";

    for (let wochentag of alle_wochentage) {
        date = berechneWochentag()
        if (wochentag.tag == date){
            if (!hatUebung(wochentag)) continue;
            let wochentag_div = appendTemplate("wochentag-template", "aktullerTag");
            setDataElementValue(wochentag_div, "wochentag", "Heute");
            wochentag_div.id = "Heute";
            for (let index = 0 ; index < wochentag.uebungen.length; index++) {
                let uebung_id = wochentag.uebungen[index];
                let uebung = alle_uebungen[uebung_id];
            
                let uebung_container = appendTemplate("uebung-row-template", "Heute");
                let uebung_div = uebung_container.querySelector("div");
                for (const [key, value] of Object.entries(uebung)) {
                    if (key == "ID") {
                        uebung_container.id = value + "-container";
                        uebung_div.id = value;
                    }
                    if (key == "Gewicht") {
                        let value_gewicht = value + "kg";
                        setDataElementValue(uebung_div, key, value_gewicht);
                    } else if (key == "Sets") {
                        let value_sets = value + " Sets";
                        setDataElementValue(uebung_div, key, value_sets);
                    } else if (key == "Reps") {
                        let value_reps = value + " Reps";
                        setDataElementValue(uebung_div, key, value_reps);
                    } else {
                        setDataElementValue(uebung_div, key, value);
                    }
                }
            }
        }
    }
}

function renderTodoList(){
    document.getElementById("todolist").innerHTML = "";

    for (let todo in todolist){
        let todo_div = appendTemplate("todo-template", "todolist")
        setInputElementValue(todo_div, "todo", todolist[todo])
    }
    document.querySelectorAll('.loeschentodo').forEach((item, key) => {
        item.addEventListener('click', event => {
          key = key - 1
          deletTODO(key)
        })
      })
}

function renderwochentage() {
    document.getElementById("wochentage").innerHTML = "";

    for (let wochentag of alle_wochentage) {
        if (!hatUebung(wochentag)) continue;
        let wochentag_div = appendTemplate("wochentag-template", "wochentage");
        setDataElementValue(wochentag_div, "wochentag", wochentag.tag);
        wochentag_div.id = wochentag.tag;
        for (let index = 0 ; index < wochentag.uebungen.length; index++) {
            let uebung_id = wochentag.uebungen[index];
            let uebung = alle_uebungen[uebung_id];
            
            let uebung_container = appendTemplate("uebung-row-template", wochentag.tag);
            let uebung_div = uebung_container.querySelector("div");
            uebung_div.dataset.index = index
            for (const [key, value] of Object.entries(uebung)) {
                if (key == "ID") {
                    uebung_container.id = value + "-container";
                    uebung_div.id = value;
                }
                if (key == "Gewicht") {
                let value_gewicht = value + "kg";
                setDataElementValue(uebung_div, key, value_gewicht);
                } else if (key == "Sets") {
                let value_sets = value + " Sets";
                setDataElementValue(uebung_div, key, value_sets);
                } else if (key == "Reps") {
                let value_reps = value + " Reps";
                setDataElementValue(uebung_div, key, value_reps);
                } else {
                setDataElementValue(uebung_div, key, value);
                }
            }
            uebung_div.addEventListener('dragstart', dragStart(wochentag, index));
            uebung_div.addEventListener('dragend', dragEnd(index));

            uebung_container.addEventListener('dragover', dragOver(index));
            uebung_container.addEventListener('dragenter', dragEnter(index));
            uebung_container.addEventListener('dragleave', dragLeave(index));
            uebung_container.addEventListener('drop', dragDrop(wochentag_nummern[wochentag.tag], index));

            uebung_div.addEventListener('touchstart', touchStart(index));
            uebung_div.addEventListener('touchend', touchEnd(wochentag_nummern[wochentag.tag], index));
            uebung_div.addEventListener('touchmove', touchMove);
        }
    }
}
