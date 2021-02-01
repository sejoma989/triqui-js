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
    //Contiene los elementos del modal del mensaje ganador
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
    //Selecciona el selector usado en la linea 30 de index para definir el mensaje con el ganador, si es x o O
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')


//Si circleTurn es true, es turno de circulo, si es false, turno de X
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

//funcion que arranca el juego para que comience con setBoardHoverClass
function startGame() {
    circleTurn = true
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true }) //Escucha un solo evento de click en cada celda, solo uno
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    //Obtener la informacion de la celda clickeada, decide de quien es el turno
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass) //poner Marca        
    if (checkWin(currentClass)) { //comprobar Ganador
        endGame(false)
    } else if (isDraw()) { //comprobar Empate
        endGame(true)
    } else {
        swapTurns() //cambiar Turno
        setBoardHoverClass() //Pone las marcas al hacer hover
    }
}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Empate!"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Gana!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
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

//Funcion que compara segun el turno para todos los array combinaciones para ganar, 
//si alguna de ellas tiene todos los index de la misma clase
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}