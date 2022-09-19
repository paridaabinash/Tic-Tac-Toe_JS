
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const showTurn = document.getElementsByClassName('showTurn')[0];

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const btn = document.getElementById('btn');
let pl1 = '';
let pl2 = '';

btn.addEventListener('click', submitPlayers);



let circleTurn;


startGame();

restartButton.addEventListener('click', startGame);


function startGame() {
    showTurn.innerText = '';
    player1.value='';
    player2.value='';
    

    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS); //_________________for removing elements after restart
        cell.classList.remove(O_CLASS); //_________________for removing elements after restart
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true} )
    });
    setBoardHoverClass();
    
    winningMessageElement.classList.remove('show'); //_________________for removing elements after restart
    
}


function submitPlayers() {
    pl1 = player1.value;
    pl2 = player2.value;
    if(pl1.length == 0) {
        pl1 = 'X';
    }
    if (pl2.length == 0) {
        pl2 = 'O';
    }
    showTurn.innerText = `${pl1}'s Turn`;
    return pl1, pl2;
}


function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark (cell, currentClass);
    if(checkWin(currentClass)) {
       endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    } 

    showTurn.innerText =circleTurn? `${pl2}'s Turn` : `${pl1}'s Turn`;
} 



function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!: Both are Equally Weak 🙂';
    }
    else {
        winningMessageTextElement.innerText = `🏆 ${circleTurn ? pl2 : pl1} Wins 🥇🎉`

    }
    winningMessageElement.classList.add('show');
}



function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}



function placeMark (cell, currentClass) {
    cell.classList.add(currentClass);
}



function swapTurns() {
    circleTurn = !circleTurn;
}



function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (circleTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}



function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
