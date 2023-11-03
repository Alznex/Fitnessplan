document.addEventListener("DOMContentLoaded", function (event) {
  renderStart()
  renderwochentage()
  addEventSettings()
  addEventSaveTodo()

  //eventlsitener(type, id, funktion1, funktionVAr, funktion2, funktion3)
  eventlsitener("click", "homepage", show, "home", renderStart)

  eventlsitener("click", "settingsSave" , changeColor,"" )

  eventlsitener("click", "showWochentage", show, "ShownWochentage", renderwochentage)
  eventlsitener("click", "hinzufuegenUebung", addAbsolut, "uebung", clearInput)
  eventlsitener("click", "uebungSpeichern",save)
  
  eventlsitener("click", "uebungSuche", renderAlleUebungen)

  eventlsitener("click","goalSave", removeAbsolut, "goal", saveGoal)

  document.getElementById("goalDelet").addEventListener("click", (e) => {
    let goal = document.querySelector(".goal_input[name='Name']")
    let goalName = goal.value
    removeAbsolut("goal")
    deletGoal(goalName)
  })

  document.getElementById("loeschen").addEventListener("click", (e) => {
    let uebungen_loeschen = document.getElementById("ID")
    loeschen(uebungen_loeschen.value)
    removeAbsolut("uebung")
  })
})

function addEventUebung() {
  document.querySelectorAll(".uebung").forEach((div) => {
    div.addEventListener("click", (e) => {
      if (div.classList.contains("uebung")) {
        let div_id = div.id
        bearbeiten(div_id)
      }
    })
  })
}

function addEventTodochecker() {
  document.querySelectorAll(".todochecker").forEach((div) => {
    div.addEventListener("click", (e) => {
      changeBackgroundColor()
    })
  })
}

function addEventSettings() {
  document.querySelectorAll(".svgSettings").forEach((div) => {
    div.addEventListener("click", (e) => {
      show("settings")
      addEventUebersicht()
    })
  })
}
function addEventUebersicht() {
  document.querySelectorAll(".zurueckUebersicht").forEach((div) => {
    div.addEventListener("click", (e) => {
      show("home")
      renderStart()
    })
  })
}

function addEventSaveTodo(){
  let div = document.querySelectorAll('[data-id="todo"]')
  div.forEach((div, index) => {
    div.addEventListener("blur", (e) => saveTODO(div, index))
  })
}

function addEventGoals(){
  document.querySelectorAll(".goals").forEach((div) => {
    div.addEventListener("click", (e) => {
      addAbsolut("goal")
      bearbeitenGoals(div.id)
    })
  })
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
