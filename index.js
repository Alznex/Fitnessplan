document.addEventListener("DOMContentLoaded", function (event) {
    addEventSettings()
    renderStart()
    saveTodoFinsihed()

    //eventlsitener(type, id, funktion1, funktionVAr, funktion2, funktion3)
    eventlsitener("click", "settingsSave" , changeColor,"" )
    eventlsitener("click", "showWochentage", renderwochentage)
    eventlsitener("click", "hinzufuegenUebung", addAbsolut, "uebung", clearInputUebungen)
    eventlsitener("click", "uebungSpeichern", saveUebung)
    eventlsitener("click", "uebungSuche", renderAlleUebungen)
    eventlsitener("click","goalSave", removeAbsolut, "goal", saveGoal)
    eventlsitener("click", "zurueckUebungen", renderwochentage)

    document.getElementById("goalDelet").addEventListener("click", (e) => {
        let goal = document.querySelector(".goal_input[name='Name']")
        let goalName = goal.value
        removeAbsolut("goal")
        deletGoal(goalName)
}) 

document.querySelectorAll(".goalslider").forEach((div)=>{
    div.addEventListener("change", (div) =>{
        parent = div.parentElement
        uebungName= parent.querySelect(".goalsfirst").innerHTML
        value = div.value
        saveFromSlider(uebungName,value)
    })
    
})

document.getElementById("kategorienSuche").addEventListener("change", (div) =>{
    renderUebungenKoerperteile(div)
})

    document.getElementById("loeschen").addEventListener("click", (e) => {
        let uebungen_loeschen = document.getElementById("ID")
        loeschenUebung(uebungen_loeschen.value)
        removeAbsolut("uebung")
    })
})

function addEventUebung() {
    document.querySelectorAll(".uebung").forEach((div) => {
        div.addEventListener("click", (e) => {
            if (div.classList.contains("uebung")) {
                let div_id = div.id
                bearbeitenUebung(div_id, )
            }
        })
    })
} 

function addEventTodochecker() {
    document.querySelectorAll(".todochecker").forEach((div) => {
        div.addEventListener("click", (e) => {
        changeBackgroundColor()
        saveTodoFinsihed()
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
            renderStart()
        })
    })
}

function addEventSaveTodo(){
    document.querySelectorAll('[data-id="todo"]').forEach((div) => {
        div.addEventListener("blur", (e) => saveTODO(div))
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

function addEventDeletTodo(){
    document.querySelectorAll(".svgDelet").forEach((div) =>{
        div.addEventListener("click", (e) =>{
            let parentDivID = div.parentElement.id
            deletTODO(parentDivID)
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

function deletWochentage(){
    localStorage.removeItem("alle_wochentage")
} 

function deletAlleUebungen(){
    localStorage.removeItem("alle_uebungen")
}

function deletAlleTodos(){
    localStorage.removeItem("alle_todos")
}

function deletAlleGoals(){
    localStorage.removeItem("alle_goals")
}
