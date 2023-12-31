let start = -1, end = -1

function dragStart(index) {
    return function (e) {
        this.classList.add("hold")
        setTimeout(() => (this.classList.add("hidden")), 0)
        console.log("dragStart")
        start = index
    }
}

function dragEnd(index) {
    return function (e) {
        this.classList.remove("hold")
        this.classList.remove("hidden")
    }
}

function dragOver(index) {
    return function (e) {
        e.preventDefault()
    }
}

function dragEnter(index) {
    return function (e) {
        e.preventDefault()
        e.stopPropagation()
        this.classList.add('hovered')
    }
}

function dragLeave(index) {
    return function (e) {
        e.stopPropagation()
        this.classList.remove('hovered')
    }
}

function dragDrop(wochentag, index) {
    return function (e) { 
        this.className = 'empty' 
        end = index		
        swap_uebungen(wochentag, start, end) 
    }
}

function touchStart(index) {
    return function (e) {
        e.preventDefault()
        this.classList.add("hold")
        setTimeout(() => (this.classList.add("hidden")), 0)
        start = index
    };

}

function touchEnd(wochentag) {
    return function (e) {
        e.preventDefault()
        let wochentage = loadFromLocalStorage("alle_wochentage", alle_wochentage_empty)
        this.classList.remove("hold")
        this.classList.remove("hidden")
        end = findUebungIndex(e)
        if(end === null){
            renderwochentage()
            addEventUebung()
        } else if(end == start){
            div_id = wochentage[wochentag].uebungen[start]
            console.log(start)
            bearbeitenUebung(div_id)
        } else{
            swap_uebungen(wochentag, start, end)
        }
    
    }
}

function touchMove() {
    return function (event) {
        event.preventDefault()
    };
}

function findUebungIndex(e) {
    var changedTouch = e.changedTouches[0]
    var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY)
    if(elem == null){
        return elem
    }else{
        elem = elem.closest(".uebung")
        return elem.dataset.index
    }
}

function swap_uebungen(wochentag, index1, index2) {
    let wochentage = loadFromLocalStorage("alle_wochentage", alle_wochentage_empty)
    let uebungenListe = wochentage[wochentag].uebungen
    const uebung_id = uebungenListe[index1]
    uebungenListe[index1]= uebungenListe[index2]
    uebungenListe[index2] = uebung_id
    localStorage.setItem("alle_wochentage", JSON.stringify(wochentage))
    console.log("swap("+index1+", "+index2+")")
    renderwochentage()
}
