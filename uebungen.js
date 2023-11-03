function deletWochentage(){
  localStorage.removeItem("alle_wochentage")
}

const wochentag_nummern = {
  "Montag": 0,
  "Dienstag": 1,
  "Mittwoch": 2,
  "Donnerstag": 3,
  "Freitag": 4,
  "Samstag": 5,
  "Sonntag": 6,
  "keiner": 7
}

const alle_wochentage_empty = [
  { tag: "Montag", uebungen: []},
  { tag: "Dienstag", uebungen: []},
  { tag: "Mittwoch", uebungen: []},
  { tag: "Donnerstag", uebungen: []},
  { tag: "Freitag", uebungen: []},
  { tag: "Samstag", uebungen: []},
  { tag: "Sonntag", uebungen: []},
]

let alle_uebungen = JSON.parse(localStorage.getItem("alle_uebungen")) || {}
let alle_wochentage = JSON.parse(localStorage.getItem("alle_wochentage")) || alle_wochentage_empty

if (Object.keys(alle_uebungen).length > 0) {
  for (let uebung_id in alle_uebungen) {
    let uebung = alle_uebungen[uebung_id];
    for (let wochentag of uebung.Wochentag) {
        addToWochentage(alle_wochentage, wochentag_nummern[wochentag], uebung_id);
    } 
  }
  localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage));
}

function addToWochentage(wochentage, wochentagNum, uebung_id) {
  if (!wochentage[wochentagNum].uebungen.includes(uebung_id)) {
    wochentage[wochentagNum].uebungen.push(uebung_id);
  }
}

function removeFromAllWochentage(uebungID) {
  for (let wochentag of alle_wochentage) {
    if(wochentag.uebungen.length >0){
      removeItemAll(alle_wochentage[wochentag_nummern[wochentag.tag]].uebungen, uebungID)
    }
  }
}

function save() {
  let uebung = {}
  let inputs = document.querySelectorAll(".normal_input")
  let select_koerperteil = document.getElementById("koerperteil")
  let checkbox_wochentage = document.querySelectorAll('input[name="wochentag"]:checked')

  for (let i = 0; i < inputs.length; i++) {
    let name = inputs[i].name
    if (name == "ID") {
      uebung[name] = inputs[i].value
      if (uebung["ID"] == "") {
        uebung["ID"] = generateUniqueId()
        continue
      }
    } else if (name == "Name") {
      uebung[name] = inputs[i].value.trim()
    } else {
      uebung[name] = inputs[i].value
    }
  }

  for (let i = 0; i < select_koerperteil.length; i++) {
    let name = select_koerperteil.name
    uebung[name] = select_koerperteil.options[select_koerperteil.selectedIndex].label
  }

  let name = "Wochentag"
  uebung[name] = []
  checkbox_wochentage.forEach((checkbox) => {
    uebung[name].push(checkbox.value)
  })
  removeFromAllWochentage(uebung["ID"])
  for (let wochentag of uebung.Wochentag) {
    let wochentagPushZiel = alle_wochentage[wochentag_nummern[wochentag]]
    wochentagPushZiel.uebungen.push(uebung["ID"])
  }

  // Setze die Werte der Übung
  alle_uebungen[uebung["ID"]] = uebung

  // Speichere das Array im Local Storage
  localStorage.setItem("alle_uebungen", JSON.stringify(alle_uebungen))
  localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage))

  renderwochentage()
  renderStart()

  removeAbsolut("uebung")
}

function loeschen(uebung) {
  delete alle_uebungen[uebung]
  removeFromAllWochentage(uebung)
  localStorage.setItem("alle_uebungen", JSON.stringify(alle_uebungen))
  localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage))
  renderwochentage()
  renderStart()
  removeAbsolut("uebung")
}

function bearbeiten(uebung_id) { 
  clearInput()
  let inputs = document.querySelectorAll(".normal_input")
  let checkboxes = document.querySelectorAll(".wochentage-selector")
  let selector = document.getElementById("koerperteil")
  let uebung = alle_uebungen[uebung_id]

  addAbsolut("uebung")

  for (let input_id in inputs) {
      for (const [key, value] of Object.entries(uebung)) {
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
  checkboxes.forEach((checkbox) => {
      if (uebung.Wochentag.includes(checkbox.value)) {
          checkbox.checked = true;
      }
  })
  for (let selector_values of selector) {
      if (alle_uebungen[uebung_id].koerperteil == selector_values.label) {
          if (uebung.koerperteil != "Körperteil"){
          selector.value = uebung.koerperteil
          }
      }
  }
}

function clearInput() {
  let inputs = document.querySelectorAll(".normal_input")
  let checkboxes = document.querySelectorAll(".wochentage-selector")
  let selector = document.getElementById("koerperteil")

  inputs.forEach((input, inputId) => {
      if (inputId === 1) {
          input.value = "3"
      } else if (inputId === 2) {
          input.value = "15"
      } else if (inputId === 3) {
          input.value = "10"
      } else {
          input.value = ""
      }
  })
  
  checkboxes.forEach((checkbox) => {
      checkbox.checked = false
  })
  
  selector.value = "none"
}