document.addEventListener("DOMContentLoaded", function (event) {
  renderStart()

  //eventlsitener(type, id, funktion1, funktionVAr, funktion2, funktion3)
  eventlsitener("click", "homepage", show, "home")

  eventlsitener("click", "settingsSave" , changeColor,"" )
  eventlsitener("click", "settings_logo",show, "settings")

  eventlsitener("click", "showWochentage", show, "ShownWochentage", renderwochentage)
  eventlsitener("click", "hinzufuegenUebung", show, "uebung", clearInput)
  eventlsitener("click", "uebungSpeichern", show, "ShownWochentage", save)

  eventlsitener("click", "hinzufuegenTODO", addTODO)
  eventlsitener("click", "todoSave", saveTODO)

  document.getElementById("loeschen").addEventListener("click", (e) => {
    let uebungen_loeschen = document.getElementById("ID")
    loeschen(uebungen_loeschen.value)
    show("ShownWochentage")
  })
})

function addEventUebung() {
  document.querySelectorAll(".uebung").forEach((div) => {
    div.addEventListener("click", (e) => {
      if (div.classList.contains("uebung")) {
        let div_id = div.id
        bearbeiten(div_id)
      }
    });
  });
}

function addEventTodochecker() {
  document.querySelectorAll(".todochecker").forEach((div) => {
    div.addEventListener("click", (e) => {
      changeBackgroundColor()
    });
  });
}

function changeColor(){
  const background = document.getElementById("background").value
  const secondaryBackground = document.getElementById("secondaryBackground").value
  const tertiaryBackground = document.getElementById("tertiaryBackground").value
  const textColor = document.getElementById("textColor").value

  document.documentElement.style.setProperty('--background', background)
  document.documentElement.style.setProperty('--secondaryBackground', secondaryBackground)
  document.documentElement.style.setProperty('--tertiaryBackground', tertiaryBackground)
  document.documentElement.style.setProperty('--textColor', textColor)
}
