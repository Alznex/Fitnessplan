document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("settings_logo").addEventListener("click", (e) => {
    show("settings");
  });

  document.getElementById("hinzufuegen").addEventListener("click", (e) => {
    show("uebung");
    clearInput()
  });

  document.getElementById("speichern").addEventListener("click", (e) => {
    show("start");
  });

  document.getElementById("loeschen").addEventListener("click", (e) => {
    show("start");
  });
  render();
});

function hatUebung(wochentag) {
  for (const uebung in alle_uebungen) {
    if (alle_uebungen[uebung].Wochentag && alle_uebungen[uebung].Wochentag.includes(wochentag)) return true;
  }
  return false;
}

function hatUebungNichtZugeordnet() {
  for (const uebung in alle_uebungen) {
    if (alle_uebungen[uebung].Wochentag.length == 0) return true;
  }
  return false;
}


function render() {
  document.getElementById("home").innerHTML = "";

  for (let wochentag of wochentage) {
    if (!hatUebung(wochentag)) continue;
    let wochentag_div = appendTemplate("wochentag-template", "home");
    setDataElementValue(wochentag_div, "wochentag", wochentag);
    wochentag_div.id = wochentag;
    for (const uebung in alle_uebungen) {
      if (alle_uebungen[uebung].Wochentag.includes(wochentag)) {
        let uebung_div = appendTemplate("uebung-row-template", wochentag);
        for (const [key, value] of Object.entries(alle_uebungen[uebung])) {
          if (key == "Name") {
            let uebung_name = value.replace(/\s/g, "-");
            uebung_div.id = uebung_name;
          }
          if (key == "Gewicht") {
            value_gewicht = value + "kg";
            setDataElementValue(uebung_div, key, value_gewicht);
          } else if (key == "Sets") {
            value_sets = value + " Sets";
            setDataElementValue(uebung_div, key, value_sets);
          } else if (key == "Reps") {
            value_reps = value + " Reps";
            setDataElementValue(uebung_div, key, value_reps);
          } else {
            setDataElementValue(uebung_div, key, value);
          }
        }
      }
    }
  }
  if (hatUebungNichtZugeordnet()){
    let wochentag_div = appendTemplate("wochentag-template", "home");
    setDataElementValue(wochentag_div, "wochentag", "nicht zugeordnet");
    wochentag_div.id = "nicht_zugeordnet";
    for (uebung in alle_uebungen) {
      if (
        Array.isArray(alle_uebungen[uebung].Wochentag) &&
        alle_uebungen[uebung].Wochentag.length == 0
      ) {
        let uebung_div = appendTemplate(
          "uebung-row-template",
          "nicht_zugeordnet"
        );
        for (const [key, value] of Object.entries(alle_uebungen[uebung])) {
          if (key == "Name") {
            let uebung_name = value.replace(/\s/g, "-");
            uebung_div.id = uebung_name;
          }
          if (key == "Gewicht") {
            value_gewicht = value + "kg";
            setDataElementValue(uebung_div, key, value_gewicht);
          } else if (key == "Sets") {
            value_sets = value + " Sets";
            setDataElementValue(uebung_div, key, value_sets);
          } else if (key == "Reps") {
            value_reps = value + " Reps";
            setDataElementValue(uebung_div, key, value_reps);
          } else {
            setDataElementValue(uebung_div, key, value);
          }
        }
      }
    }
  }
}

function show(name) {
  let divs = document.querySelectorAll(".content");
  divs.forEach((div) => {
    if (div.id === name) {
      div.classList.add("active");
    } else {
      div.classList.remove("active");
    }
  });
}

function setDataElementValue(root, id, value) {
  let element = root.querySelector('[data-id="' + id + '"]');
  if (element) element.innerHTML = value;
}

function appendTemplate(templateId, targetID) {
  const template = document.getElementById(templateId);
  const target = document.getElementById(targetID);
  return target.appendChild(template.cloneNode(true));
}

function clearInput() {
  let inputs = document.querySelectorAll(".normal_input");
  let checkbox = document.querySelectorAll(".wochentage-selector");
  let selector = document.getElementById("koerperteil");

  for (eingabe in inputs) {
    if(eingabe == "1"){
      inputs[eingabe].value = "3";
    }else if (eingabe == "2"){
      inputs[eingabe].value = "15";
    }else if(eingabe == "3"){
      inputs[eingabe].value = "10";
    }else{
      inputs[eingabe].value = "";
    }
  }
  for (checkboxes in checkbox) {
    checkbox[checkboxes].checked = false;
  }

  selector.value = "none";
}

function uebungorder(nth_child, position){
  let Montag = document.getElementById('Montag').children;
  var arr = Array.from(Montag);

  for (let x in arr){
    let id = arr[x].id;
    if (id == nth_child){
      document.getElementById(id).style.order = position
    }
  }
}