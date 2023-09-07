// Drag Functions Pc

let start = -1, end = -1

function dragStart(index) {
    return function (e) {
        setTimeout(() => (this.classList.add("hidden")), 0)
        start = index
    }
}

function dragEnd(index) {
    return function (e) {
        this.classList.remove("hidden")
        end = index
        console.log(index)
        swap_uebungen(wochentag, start, end)
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
    }
}

function dragLeave(index) {
    return function (e) {
        e.stopPropagation()
    }
}

function dragDrop( index) {
    return function (e) {
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
        this.classList.remove("hold")
        this.classList.remove("hidden")
        end = findUebungIndex(e)
        if(end === null){
            renderwochentage()
            addEventUebung()
        } else if(end == start){
            div_id = alle_wochentage[wochentag].uebungen[start]
            bearbeiten(div_id)
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
    const uebung_id = alle_wochentage[wochentag].uebungen[index1]
    alle_wochentage[wochentag].uebungen[index1]= alle_wochentage[wochentag].uebungen[index2]
    alle_wochentage[wochentag].uebungen[index2] = uebung_id
    localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage))
    console.log("swap("+start+", "+end+")")
    renderwochentage()
    addEventUebung()
}
