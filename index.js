document.addEventListener("DOMContentLoaded", function (event) {
  renderStart()
  addEventUebung()
  renderTodoList()

  document.querySelectorAll('.loeschentodo').forEach((item, key) => {
    item.addEventListener('click', event => {
      key = key - 1
      console.log(key)
      deletTODO(key)
      renderTodoList()
    })
  })

  document.querySelectorAll('.colorinput').forEach(item => {
    item.addEventListener('click', event => {
      changeColor()
    })
  })

  document.getElementById("backround").addEventListener("change", (e) => {
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
  const backround = document.getElementById("backround").value
  const secondaryBackround = document.getElementById("secondaryBackround").value
  const thirdaryBackround = document.getElementById("thirdaryBackround").value
  const textColor = document.getElementById("textColor").value

  document.documentElement.style.setProperty('--backround', backround)
  document.documentElement.style.setProperty('--secondaryBackround', secondaryBackround)
  document.documentElement.style.setProperty('--thirdaryBackround', thirdaryBackround)
  document.documentElement.style.setProperty('--textColor', textColor)
  
}