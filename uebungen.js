const wochentagNummern = {
  "Montag": 0,
  "Dienstag": 1,
  "Mittwoch": 2,
  "Donnerstag": 3,
  "Freitag": 4,
  "Samstag": 5,
  "Sonntag": 6,
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

function checkForUebungen(){
  let alle_uebungen = JSON.parse(localStorage.getItem("alle_uebungen")) || default_uebungen
  let alle_wochentage = JSON.parse(localStorage.getItem("alle_wochentage")) || alle_wochentage_empty

  if (Object.keys(alle_uebungen).length > 0) {
    for (let uebung_id in alle_uebungen) {
      let uebung = alle_uebungen[uebung_id];
      for (let wochentag of uebung.Wochentag) {
          if (!alle_wochentage[wochentagNummern[wochentag]].uebungen.includes(uebung_id)) {
            alle_wochentage[wochentagNummern[wochentag]].uebungen.push(uebung_id);
          }
      } 
    }
    localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage));
  }

}
function saveUebung() {
  let uebung = {}
  let uebungen = loadFromLocalStorage("alle_uebungen", {})
  let inputs = document.querySelectorAll(".normal_input")
  let select_koerperteil = document.getElementById("koerperteil")
  let checkbox_wochentage = document.querySelectorAll('input[name="wochentag"]:checked')
  let startIndex = ""

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
    }else if(name == "index"){
      startIndex = inputs[i].value
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
  let wochentage = loadFromLocalStorage("alle_wochentage", alle_wochentage_empty)
  for (let wochentag in wochentagNummern){
    let wochentagUebungen = wochentage[wochentagNummern[wochentag]].uebungen
    if(wochentagUebungen.includes(uebung["ID"]) && !uebung.Wochentag.includes(wochentag)){
      removeItemAll(wochentage[wochentagNummern[wochentag]].uebungen, uebung["ID"])
    }else if(!wochentagUebungen.includes(uebung["ID"]) && uebung.Wochentag.includes(wochentag)){
      let wochentagPushZiel = wochentage[wochentagNummern[wochentag]]
      wochentagPushZiel.uebungen.push(uebung["ID"])
    }
  }


  // Setze die Werte der Übung
  uebungen[uebung["ID"]] = uebung

  // Speichere das Array im Local Storage
  localStorage.setItem("alle_uebungen", JSON.stringify(uebungen))
  localStorage.setItem("alle_wochentage", JSON.stringify(wochentage))
  let currentPage = document.querySelector(".active")
  if(currentPage.id == "home"){
    renderStart()
  }else{
    renderwochentage()
  }
  removeAbsolut("uebung")
}

function loeschenUebung(uebung) {
  let uebungen = loadFromLocalStorage("alle_uebungen", {})
  let currentPage = document.querySelector(".active")
  delete uebungen[uebung]
  removeFromAllWochentage(uebung)
  localStorage.setItem("alle_uebungen", JSON.stringify(uebungen))
  if(currentPage.id == "home"){
    renderStart()
  }else{
    renderwochentage()
  }

  removeAbsolut("uebung")
}

function bearbeitenUebung(uebung_id) { 
  clearInputUebungen()
  let uebungen = loadFromLocalStorage("alle_uebungen", {})
  let inputs = document.querySelectorAll(".normal_input")
  let checkboxes = document.querySelectorAll(".wochentage-selector")
  let selector = document.getElementById("koerperteil")
  let uebung = uebungen[uebung_id]

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
  for (let selectorValues of selector) {
      if (uebungen[uebung_id].koerperteil == selectorValues.label) {
          if (uebung.koerperteil != "Körperteil"){
          selector.value = uebung.koerperteil
          }
      }
  }
}

function clearInputUebungen() {
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

function removeFromAllWochentage(uebungID) {
  let wochentage = loadFromLocalStorage("alle_wochentage", alle_wochentage_empty)
  for (let wochentag of wochentage) {
    if(wochentag.uebungen.length >0){
      removeItemAll(wochentage[wochentagNummern[wochentag.tag]].uebungen, uebungID)
      localStorage.setItem("alle_wochentage", JSON.stringify(wochentage))
    }
  }
}