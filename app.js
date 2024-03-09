
let positions = [];
let flag = true;

while(flag){
    
    let size = 0;
    let randomNumber = Math.floor(Math.random() * 9);
    positions.push(randomNumber);
    positions = [...new Set(positions)];

    for (let index = 1; index <= 8; index++) {
        if(positions.includes(index)){   
            size++;
        }
    }
    if(size == 8){
        flag = false
    }else{
        flag = true;
    } 
}

if(!positions.includes(0)){
    positions.push(0);
}

//------------------------

const squareContainerDOM = document.querySelector(".square-container");
squareContainerDOM.innerHTML = positions.map((position, index) => {
    return  `<div class="square ${position == 0 ? "empty" : ""}" data-index="${index}">
                ${position == 0 ? 9 : position}
            </div>`;
}).join("");

const squareDOM = document.querySelectorAll(".square-container .square");
squareDOM.forEach(element => {
    element.addEventListener("click", function(){
        findEmptySquare(element.dataset.index);
    })
})

const allowSquare = {
    0 : [1, 3],
    1 : [0, 2, 4],
    2 : [1, 5],
    3 : [0, 4, 6],
    4 : [1, 3, 5, 7],
    5 : [2, 4, 8],
    6 : [3, 7],
    7 : [4, 6, 8],
    8 : [5, 7]
}

let count = 0;
const moveCounterDOM = document.querySelector(".move-counter h2");
let emptyIndex;

function findEmptySquare(clickedIndex){

    squareDOM.forEach(element => {
        if(element.classList.contains("empty")){
            emptyIndex = element.dataset.index;
        }
    })

    allowSquare[emptyIndex].map(number => {

        if(clickedIndex == number){

            increaseMoveCounter();

            if(emptyIndex == clickedIndex - 3){
                //moving top
                moveElement(emptyIndex, clickedIndex, "top");
                updateDataIndex(-3, clickedIndex);
            }else if(emptyIndex - 3 == clickedIndex){
                //moving bottom
                moveElement(emptyIndex, clickedIndex, "bottom");
                updateDataIndex(+3, clickedIndex);
            }else if(emptyIndex - 1 == clickedIndex){
                //moving right
                moveElement(emptyIndex, clickedIndex, "right");
                updateDataIndex(1, clickedIndex);
            }else if(emptyIndex == clickedIndex - 1){
                //moving left
                moveElement(emptyIndex, clickedIndex, "left");
                updateDataIndex(-1, clickedIndex);
            }
        }
    })

    checkVictory();
}

function updateDataIndex(move, clickedIndex){
    squareDOM.forEach(element => {
        if(element.dataset.index == clickedIndex){
            element.dataset.index = parseInt(element.dataset.index) + parseInt(move);
        }
        if(element.classList.contains("empty")){
            element.dataset.index = parseInt(element.dataset.index) - parseInt(move);
        }
    })
}

function moveElement(emptyIndex, clickedIndex, type){

    squareDOM.forEach(element => {
        if(element.dataset.index == clickedIndex){
            if(type == "top"){
                movingTop(element.style.transform , element);
            }else if(type == "bottom"){
                movingBottom(element.style.transform, element);
            }else if(type == "right"){
                movingRight(element.style.transform, element);
            }else if(type == "left"){
                movingLeft(element.style.transform, element);
            }   
        }
        if(element.dataset.index == emptyIndex){
            if(type == "top"){
                movingBottom(element.style.transform, element);
            }else if(type == "bottom"){
                movingTop(element.style.transform, element);
            }else if(type == "right"){
                movingLeft(element.style.transform, element);
            }else if(type == "left"){
                movingRight(element.style.transform, element);
            } 
        }
    })
}

function movingTop(transformStyle, element){
    if(transformStyle){
        element.style.transform = "translateY(calc(-100% - 1rem))" + element.style.transform
    }else{
        element.style.transform = "translateY(calc(-100% - 1rem))"
    }
}
function movingRight(transformStyle, element){
    if(transformStyle){
        element.style.transform = "translateX(calc(100% + 1rem))" + element.style.transform
    }else{
        element.style.transform = "translateX(calc(100% + 1rem))"
    }
}
function movingBottom(transformStyle, element){
    if(transformStyle){
        element.style.transform = "translateY(calc(100% + 1rem))" + element.style.transform
    }else{
        element.style.transform = "translateY(calc(100% + 1rem))"
    }
}
function movingLeft(transformStyle, element){
    if(transformStyle){
        element.style.transform = "translateX(calc(-100% - 1rem))" + element.style.transform
    }else{
        element.style.transform = "translateX(calc(-100% - 1rem))"
    }
}

function increaseMoveCounter(){
    count++;
    moveCounterDOM.innerHTML = count;
}


function checkVictory(){

    const alertDOM = document.querySelector(".alert-winner");

    correctPosition = 0;

    squareDOM.forEach(element => {
        if(parseInt(element.dataset.index) + 1 == element.textContent){
            correctPosition++;
        }
    })

    if(correctPosition == 9){
        //show alert
        setTimeout(() => alertDOM.classList.add("show") , 750);

        //play audio
        setTimeout(() => document.querySelector("audio#encourage").play(), 1250);

        //make star
        let makeSatr = setInterval(createStar, 1050);
        setTimeout(() => clearInterval(makeSatr) , 3150);
    }
    
}

let number = 1;

function createStar(){
    const starListDOM = document.querySelector(".alert-winner .message-text section ul");
    const listItem = document.createElement("li");
    listItem.innerHTML = `<i class="fa-solid fa-star"></i>`;
    listItem.classList.add("minimize-animation");
    starListDOM.appendChild(listItem);
    document.querySelector(`audio#bell-${number}`).play()
    number++;
    setTimeout(() => {
        listItem.classList.remove("minimize-animation")
        listItem.classList.add("real-size")
    }, 1000);
}