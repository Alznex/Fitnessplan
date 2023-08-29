// Drag Functions Pc

let start = -1, end = -1, drag_enter_count = 0

function dragStart(index) {
    return function (e) {
        drag_enter_count = 0
        this.classList.add("hold")
        setTimeout(() => (this.classList.add("hidden")), 0)
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
        drag_enter_count++
        console.log("enter: target=" + e.target.className + "; currentTarget=" + e.currentTarget.className + "; drag_enter_count=" + drag_enter_count)
        this.classList.add('hovered')
    }
}

function dragLeave(index) {
    return function (e) {
//???        e.preventDefault()
        e.stopPropagation()
        drag_enter_count--
        console.log("leave: target=" + e.target.className + "; currentTarget=" + e.currentTarget.className + "; drag_enter_count=" + drag_enter_count)
        if (drag_enter_count === 0) { 
            this.classList.remove('hovered')
        }
    }
}

function dragDrop(wochentag, index) {
    return function (e) {
        this.className = 'empty'
        end = index
        console.log("swap("+start+", "+end+")")
        swap_uebungen(wochentag, start, end)
    }
}

function touchStart(index) {
    return function (e) {
        this.classList.add("hold")
        setTimeout(() => (this.classList.add("hidden")), 0)
        start = index
    };
}

function touchEnd(wochentag, index) {
    return function (e) {
        this.classList.remove("hold")
        this.classList.remove("hidden")
        //this.className = 'empty'
        end = findUebungIndex(e)
        if(end === null){
            console.log(end)
            renderwochentage()
            addEventUebung()
        }else{
            console.log("swap("+start+", "+end+")")
            swap_uebungen(wochentag, start, end)
        }

    }
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

function touchMove(index) {
    return function (event) {
        event.preventDefault()
    };
}


function swap_uebungen(wochentag, index1, index2) {
    const uebung_id = alle_wochentage[wochentag].uebungen[index1]
    alle_wochentage[wochentag].uebungen[index1]= alle_wochentage[wochentag].uebungen[index2]
    alle_wochentage[wochentag].uebungen[index2] = uebung_id
    localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage))
    renderwochentage()
    addEventUebung()
}