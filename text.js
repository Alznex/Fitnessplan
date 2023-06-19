document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("speichern").addEventListener('click', e =>{
        save();
    });
    
    addEventUebung()
  });

function addEventUebung(){
    document.querySelectorAll(".uebungen").forEach(div => {
        div.addEventListener('click', e => {
          let name = div.id;
          name = name.replace(/-/g, " ")
          bearbeiten(name);
        });
      });
}
const wochentage = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag"
];
  
let alle_uebungen = {};
  
if (localStorage.getItem("alle_uebungen")) {
    alle_uebungen = JSON.parse(localStorage.getItem("alle_uebungen"));
}
  
function save() {
    let uebung = {};
    let inputs = document.querySelectorAll(".normal_input");
    let select_koerperteil = document.getElementById("koerperteil");
    let checkbox_wochentage = document.querySelectorAll('input[name="wochentag"]:checked');

    for (let i = 0; i < inputs.length; i++){
        let name = inputs[i].name;
        if (name == "ID"){
            if (uebung["ID"] == ""){
                uebung["ID"] = generateUniqueId();
                continue;
            }
            uebung[name] = inputs[i].value;
        }else if(name == "Name"){
            uebung[name] = inputs[i].value.trim();
        }else if(name == "Gewicht"){
            uebung[name] = inputs[i].value;
        }else if(name == "Sets"){
            uebung[name] = inputs[i].value;
        }else if(name == "Reps"){
            uebung[name] = inputs[i].value;
        }else {
            uebung[name] = inputs[i].value;
        }
    }

    for (let i = 0; i < select_koerperteil.length; i++){
        let name = select_koerperteil.name;
        uebung[name] = select_koerperteil.options[select_koerperteil.selectedIndex].text;
    }

    let name = "Wochentag";
    uebung[name] = [];
    checkbox_wochentage.forEach((checkbox) => {
        uebung[name].push(checkbox.value);
    })

    // Setze die Werte der Übung
    alle_uebungen[uebung["ID"]] = uebung;

    // Speichere das Array im Local Storage
    localStorage.setItem("alle_uebungen", JSON.stringify(alle_uebungen));

    render()
    addEventUebung()
}

function bearbeiten(uebung){ //funktionirt nicht
    let inputs = document.querySelectorAll(".normal_input")
    let checkbox = document.querySelectorAll(".wochentage-selector")
    let selector = document.getElementById("koerperteil")
    show("uebung")
    for (let uebungen in alle_uebungen){
        if (alle_uebungen[uebungen].Name == uebung){
            document.getElementById("loeschen").addEventListener('click', e =>{
                loeschen(uebungen)
            });
            for (input_id in inputs){
                for (const [key, value] of Object.entries(alle_uebungen[uebungen])){
                    if (input_id == 0 && key == "Name"){
                        inputs[input_id].value = value
                    }else if(input_id == 1 && key == "Sets"){
                        inputs[input_id].value = value.replace(/\D/g,'');
                    }else if(input_id == 2 && key == "Reps"){
                        inputs[input_id].value = value.replace(/\D/g,'');
                    }else if(input_id == 3 && key == "Gewicht"){  
                        inputs[input_id].value = value.replace(/\D/g,'');
                    }else if(input_id == 4 && key == "Info"){
                        inputs[input_id].value = value
                    }else if(input_id == 5 && key == "ID"){
                        inputs[input_id].value = value
                    }
                }
            }
            for (let checkboxes of checkbox){
                for (let uebung in alle_uebungen){
                        if (alle_uebungen[uebung].Wochentag == checkboxes.value){
                            checkbox[checkboxes.childElementCount].checked = true;
                        }
                }
            }
            for (selector_values of selector){
                for (let uebung in alle_uebungen){
                    if (alle_uebungen[uebung].koerperteil == selector_values.label){
                        selector.value = alle_uebungen[uebung].koerperteil
                    }
                }
            }
            
        }
    }
}

function loeschen(uebung) {
    delete alle_uebungen[uebung];
    localStorage.setItem("alle_uebungen", JSON.stringify(alle_uebungen));
    render()
}
  
function generateUniqueId() {
    let timestamp = new Date().getTime();
    const uniqueId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (timestamp + Math.random() * 16) % 16 | 0;
        timestamp = Math.floor(timestamp / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uniqueId;
}