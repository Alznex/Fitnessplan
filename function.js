function show(name) {
    let divs = document.querySelectorAll(".content")
    divs.forEach((div) => {
      if (div.id === name) {
        div.classList.add("active")
      } else {
        div.classList.remove("active")
      }
    })
}

function addAbsolut(targetId){
  let divElement = document.getElementById(targetId)
  divElement.classList.add("overlay")
}

function removeAbsolut(targetId){
  let divElement = document.getElementById(targetId)
  divElement.classList.remove("overlay")
}
  
function setDataElementValue(root, id, value) {
  let element = root.querySelector('[data-id="' + id + '"]')
  if (element) element.innerHTML = value;
}

function setInputElementValue(root, id, value) {
  let element = root.querySelector('[data-id="' + id + '"]')
  if (element) element.value = value;
}

function appendTemplate(templateId, targetID) {
    const template = document.getElementById(templateId)
    const target = document.getElementById(targetID)
    return target.appendChild(template.cloneNode(true))
}

function berechneWochentag() {
    let jetzt = new Date(),
        tagZahl = jetzt.getDay(),
        wochentag = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag' ]
    text = wochentag[tagZahl]
    return text
}

function generateUniqueId() {
    let timestamp = new Date().getTime();
    const uniqueId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (timestamp + Math.random() * 16) % 16 | 0
        timestamp = Math.floor(timestamp / 16)
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
      }
    );
    return uniqueId
  }
  
function removeItemAll(arr, value) {
    var i = 0
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1)
        } else {
            ++i
        }
    }
    return arr
}

function eventlsitener(type, id, funktion1, funktionVar, funktion2, funktion3){
  document.getElementById(id).addEventListener(type, (e) => {
    funktion1(funktionVar)
    if(funktion2 != null){
      funktion2()
    }else if(funktion3 != null){
      funktion3()
    }
  })
}

function getDate(){
  let currentTime = new Date()
  let currentDate = currentTime.getDate()+" "+currentTime.getMonth()+" "+currentTime.getFullYear()
  return currentDate
}

function loadFromLocalStorage(key, defaultValue) {
  try {
      const value = JSON.parse(localStorage.getItem(key));
      return value !== null ? value : defaultValue;
  } catch (error) {
      console.error(`Error loading ${key} from local storage:`, error);
      return defaultValue;
  }
}

function clearInput(id){
  let element = document.getElementById(id)
  element.querySelectorAll("input").forEach((input) => {
      input.value = ""
  })
}