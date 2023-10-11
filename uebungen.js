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
  { tag: "keiner", uebungen: []}
]

let alle_uebungen = JSON.parse(localStorage.getItem("alle_uebungen")) || {}
let alle_wochentage = JSON.parse(localStorage.getItem("alle_wochentage")) || alle_wochentage_empty

if (Object.keys(alle_uebungen).length > 0) {
  for (let uebung_id in alle_uebungen) {
    let uebung = alle_uebungen[uebung_id];
    if (uebung.Wochentag.length === 0) {
      addToWochentage(alle_wochentage, wochentag_nummern["keiner"], uebung_id)
    } else {
      for (let wochentag of uebung.Wochentag) {
        addToWochentage(alle_wochentage, wochentag_nummern[wochentag], uebung_id);
      }
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
}

function loeschen(uebung) {
  delete alle_uebungen[uebung]
  removeFromAllWochentage(uebung)
  localStorage.setItem("alle_uebungen", JSON.stringify(alle_uebungen))
  localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage))
  renderwochentage()
}