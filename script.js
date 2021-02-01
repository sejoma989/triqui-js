//Creacion de variables
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
    //Creacion de variable que contiene todas las posibles combinaciones para ganar
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//cellElements contiene todas las celdas
const cellElements = document.querySelectorAll('[data-cell]')
    //board contiene los elementos del tablero por id (1 - 9)
const board = document.getElementById('board')


//Si circleTurn es true, es turno de circulo, si es false, turno de X
let circleTurn

startGame()

//funcion que arranca el juego para que comience con setBoardHoverClass
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        //Escucha un solo evento de click en cada celda, solo uno
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass()
}



function handleClick(e) {
    //Obtener la informacion de la celda clickeada, decide de quien es el turno
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        //poner Marca
    placeMark(cell, currentClass)
        //comprobar Ganador
    if (checkWin(currentClass)) {
        endGame(false)
    }
    //comprobar Empate
    //cambiar Turno
    swapTurns()
        //Pone las marcas al hacer hover
    setBoardHoverClass()
}

function endGame() {
    
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }

}

//Funcion que compara segun el turno para todos los array combinaciones para ganar, si alguna de ellas tiene todos los index iguales
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}