document.addEventListener("DOMContentLoaded", function (event) {
  renderStart()
  addEventUebung()
  renderTodoList()

  document.querySelectorAll('.todochecker').forEach(item => {
    item.addEventListener('click', event => {
      changeBackgroundColor()
    })
  })

  document.getElementById("settingsSave").addEventListener("click", (e) => {
    changeColor()
  })

  document.getElementById("settings_logo").addEventListener("click", (e) => {
    show("settings")
  });

  document.getElementById("hinzufuegenUebung").addEventListener("click", (e) => {
    clearInput()
    show("uebung")
  })

  document.getElementById("speichern").addEventListener("click", (e) => {
    save();
    show("ShownWochentage")
  })

  document.getElementById("loeschen").addEventListener("click", (e) => {
    let uebungen_loeschen = document.getElementById("ID")
    loeschen(uebungen_loeschen.value)
    show("ShownWochentage")
  })

  document.getElementById("homepage").addEventListener("click", (e) => {
    show("home")
    renderStart()
    addEventUebung()
  })

  document.getElementById("showWochentage").addEventListener("click", (e) => {
    show("ShownWochentage")
    renderwochentage()
    addEventUebung()
  })

  document.getElementById("hinzufuegenTODO").addEventListener("click", (e) =>{
    addTODO()
  })
})

function changeColor(){
  const background = document.getElementById("background").value
  const secondaryBackground = document.getElementById("secondaryBackground").value
  const tertiaryBackground = document.getElementById("tertiaryBackground").value
  const textColor = document.getElementById("textColor").value
  const fontSize = document.getElementById("fontSize").value + "px"

  document.documentElement.style.setProperty('--fontSize', fontSize)
  document.documentElement.style.setProperty('--backround', background)
  document.documentElement.style.setProperty('--secondaryBackround', secondaryBackground)
  document.documentElement.style.setProperty('--tertiaryBackground', tertiaryBackground)
  document.documentElement.style.setProperty('--textColor', textColor)
  
}
