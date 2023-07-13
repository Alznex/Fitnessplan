// Drag Functions

let start = -1, end = -1, drag_enter_count = 0;

function dragStart(index) {
    return function (e) {
        this.classList.add("hold");
        setTimeout(() => (this.classList.add("hidden")), 0);
        start = index;
    }
}

function dragEnd(index) {
    return function (e) {
        this.classList.remove("hold");
        this.classList.remove("hidden")
    }
}

function dragOver(index) {
    return function (e) {
        e.preventDefault();
    }
}

function dragEnter(index) {
    return function (e) {
        e.preventDefault();
        drag_enter_count++;
        console.log("drag_enter_count="+drag_enter_count);
        this.classList.add('hovered');
    }
}

function dragLeave(index) {
    return function (e) {
        drag_enter_count--;
        console.log("drag_enter_count="+drag_enter_count);
        if (drag_enter_count === 0) { 
            this.classList.remove('hovered');
        }
    }
}

function dragDrop(index) {
    return function (e) {
        this.className = 'empty';
        end = index;
        console.log("swap("+start+", "+end+")");
    }
}
