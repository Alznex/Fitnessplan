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
  return wochentag.uebungen.length > 0;
}


function render() {
  document.getElementById("home").innerHTML = "";

  for (let wochentag of alle_wochentage) {
    if (!hatUebung(wochentag)) continue;
    let wochentag_div = appendTemplate("wochentag-template", "home");
    setDataElementValue(wochentag_div, "wochentag", wochentag.tag);
    wochentag_div.id = wochentag.tag;
    for (let index = 0 ; index < wochentag.uebungen.length; index++) {
      let uebung_id = wochentag.uebungen[index];
      let uebung = alle_uebungen[uebung_id];
    
    // for (const uebung_id of wochentag.uebungen) {
      let uebung_container = appendTemplate("uebung-row-template", wochentag.tag);
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
      uebung_div.addEventListener('dragstart', dragStart(index));
      uebung_div.addEventListener('dragend', dragEnd(index));

      uebung_container.addEventListener('dragover', dragOver(index));
      uebung_container.addEventListener('dragenter', dragEnter(index));
      uebung_container.addEventListener('dragleave', dragLeave(index));
      uebung_container.addEventListener('drop', dragDrop(index));
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

  for (let eingabe in inputs) {
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
  for (let checkboxes in checkbox) {
    checkbox[checkboxes].checked = false;
  }

  selector.value = "none";
}