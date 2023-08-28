// Drag Functions

let start = -1, end = -1, drag_enter_count = 0

function dragStart(index) {
    return function (e) {
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
        drag_enter_count++;
        console.log("drag_enter_count="+drag_enter_count)
        this.classList.add('hovered')
    }
}

function dragLeave(index) {
    return function (e) {
        drag_enter_count--
        console.log("drag_enter_count="+drag_enter_count)
        if (drag_enter_count === 0) { 
            this.classList.remove('hovered')
        }
    }
}

function dragDrop(index) {
    return function (e) {
        this.className = 'empty'
        end = index
        console.log("swap("+start+", "+end+")")
        swap_uebungen(0, start, end)
    }
}

function swap_uebungen(uebungen, index1, index2){
    const uebung_id = alle_wochentage[uebungen].uebungen[index1]
    alle_wochentage[uebungen].uebungen[index1]= alle_wochentage[uebungen].uebungen[index2]
    alle_wochentage[uebungen].uebungen[index2] = uebung_id
    localStorage.setItem("alle_wochentage", JSON.stringify(alle_wochentage))
    renderwochentage()
}

// // get The element on which to attach the event 
// var btn = document.querySelector('.btn')

// // attaching each event listener
// btn.addEventListener('touchstart', function(){
// 	console.log('btn touched')
// })
// btn.addEventListener('touchend', function(){
// 	console.log('btn leaved')
// })
// btn.addEventListener('touchmove', function(){
// 	console.log('btn leaved')
// })
// btn.addEventListener('touchleave', function(){
// 	console.log('btn moving end')
// })
// btn.addEventListener('touchcancel', function(){
// 	console.log('btn moving cancel')
// })