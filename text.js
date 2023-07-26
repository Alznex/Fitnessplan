document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("speichern").addEventListener("click", (e) => {
    save();
  });

  document.getElementById("loeschen").addEventListener("click", (e) => {
    let uebungen_loeschen = document.getElementById("ID");
    loeschen(uebungen_loeschen.value);
  });

  addEventUebung();
});

function addEventUebung() {
  document.querySelectorAll(".rows").forEach((div) => {
    div.addEventListener("click", (e) => {
      if (div.classList.contains("rows")) {
        let div_id = div.id;
        bearbeiten(div_id);
      }
    });
  });
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
];

function swap_uebungen(uebungen, index1, index2){
    const uebung_id = uebungen[index1]
    uebungen[index1]= uebungen[index2]
    uebungen[index2] = uebung_id
}

let alle_uebungen;
let alle_uebungen_string = localStorage.getItem("alle_uebungen")
if (alle_uebungen_string) {
  alle_uebungen = JSON.parse(alle_uebungen_string);
}
if (!alle_uebungen) {
  alle_uebungen = {}
}

let alle_wochentage
let alle_wochentage_string = localStorage.getItem("alle_wochentage")
if (alle_wochentage_string) {
  alle_wochentage = JSON.parse(alle_wochentage_string);
}
if (!alle_wochentage) {
  alle_wochentage = alle_wochentage_empty
  if (alle_uebungen) {
    for (let uebung_id in alle_uebungen) {
      let uebung = alle_uebungen[uebung_id]
      if (uebung.Wochentag.length == 0) {
        alle_wochentage[wochentag_nummern["keiner"]].uebungen.push(uebung_id)
      } else {
        for (let wochentag of uebung.Wochentag) {
          alle_wochentage[wochentag_nummern[wochentag]].uebungen.push(uebung_id)
        }
      }
    }
  }
  localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage));
}

function save() {
  let uebung = {};
  let inputs = document.querySelectorAll(".normal_input");
  let select_koerperteil = document.getElementById("koerperteil");
  let checkbox_wochentage = document.querySelectorAll(
    'input[name="wochentag"]:checked'
  );

  for (let i = 0; i < inputs.length; i++) {
    let name = inputs[i].name;
    if (name == "ID") {
      uebung[name] = inputs[i].value;
      if (uebung["ID"] == "") {
        uebung["ID"] = generateUniqueId();
        continue;
      }
    } else if (name == "Name") {
      uebung[name] = inputs[i].value.trim();
    } else {
      uebung[name] = inputs[i].value;
    }
  }

  for (let i = 0; i < select_koerperteil.length; i++) {
    let name = select_koerperteil.name;
    uebung[name] =
      select_koerperteil.options[select_koerperteil.selectedIndex].label;
  }

  let name = "Wochentag";
  uebung[name] = [];
  checkbox_wochentage.forEach((checkbox) => {
    uebung[name].push(checkbox.value);
    if (uebung.Wochentag.length == 0) {
      for (let wochentage of alle_wochentage){
        removeItemAll(alle_wochentage[wochentag_nummern["keiner"]].uebungen, uebung.ID)
      }
      alle_wochentage[wochentag_nummern["keiner"]].uebungen.push(uebung.ID)
    } else {
      for (let wochentag of uebung.Wochentag) {
        for (let wochentage of alle_wochentage){
          removeItemAll(alle_wochentage[wochentag_nummern[wochentage.tag]].uebungen, uebung.ID)
        }
        alle_wochentage[wochentag_nummern[wochentag]].uebungen.push(uebung.ID)
      }
    }
  });

  // Setze die Werte der Übung
  alle_uebungen[uebung["ID"]] = uebung;

  // Speichere das Array im Local Storage
  localStorage.setItem("alle_uebungen", JSON.stringify(alle_uebungen));
  localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage));

  renderwochentage();
  addEventUebung();
}

function bearbeiten(uebung_id) { 
  clearInput();
  let inputs = document.querySelectorAll(".normal_input");
  let checkbox = document.querySelectorAll(".wochentage-selector");
  let selector = document.getElementById("koerperteil");
  let uebungen = alle_uebungen[uebung_id]
  show("uebung");

  for (let input_id in inputs) {
    for (const [key, value] of Object.entries(uebungen)) {
      if (input_id == 0 && key == "Name") {
        inputs[input_id].value = value;
      } else if (input_id == 1 && key == "Sets") {
        inputs[input_id].value = value;
      } else if (input_id == 2 && key == "Reps") {
        inputs[input_id].value = value;
      } else if (input_id == 3 && key == "Gewicht") {
        inputs[input_id].value = value;
      } else if (input_id == 4 && key == "Info") {
        inputs[input_id].value = value;
      } else if (input_id == 5 && key == "ID") {
        inputs[input_id].value = value;
      }
    }
  }
  for (let i = 0; i < checkbox.length; i++) {
    if (uebungen.Wochentag.includes(checkbox[i].value)) {
      checkbox[i].checked = true;
    }
  }
  for (let selector_values of selector) {
    if (alle_uebungen[uebung_id].koerperteil == selector_values.label) {
      if (uebungen.koerperteil != "Körperteil"){
        selector.value = uebungen.koerperteil;
      }
    }
  }
}

function loeschen(uebung) {
  delete alle_uebungen[uebung];

  for (let wochentage of alle_wochentage){
    removeItemAll(alle_wochentage[wochentag_nummern[wochentage.tag]].uebungen, uebung)
  }

  localStorage.setItem("alle_uebungen", JSON.stringify(alle_uebungen));
  localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage));
  renderwochentage();
  addEventUebung();
}

function generateUniqueId() {
  let timestamp = new Date().getTime();
  const uniqueId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (timestamp + Math.random() * 16) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uniqueId;
}

function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}