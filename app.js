let gameIsLive = true;
let xIsNext = true;

// check if game is won/tied and proceed accordingly.
const checkGameStatus = () => {
    gameStatus = getGameStatus();
    nextPlayer = xIsNext ? "x" : "o";
    getBestMove(gameStatus, nextPlayer, nextPlayer);
    winner = findWinner(gameStatus);
    if (winner) {
        handleWinner(winner);
    } else if (checkTie(gameStatus)) {
        handleTie();
    }
};

// event handlers
const statusDiv = document.querySelector(".status");
const cellDivs = document.querySelectorAll(".game-cell");

// handle terminal game states
const handleWinner = (winner) => {
    const winningLetter = winner[0];
    const cell1 = winner[1];
    const cell2 = winner[2];
    const cell3 = winner[3];
    const addWinner = (divIndex) => {
        cellDivs[divIndex].classList.add("winner");
    };
    const changeStatus = () => {
        statusDiv.innerHTML = "WINNER: " + winningLetter.toUpperCase();
        statusDiv.classList.add("winnerText");
    };
    setTimeout(addWinner, 0, cell1);
    setTimeout(addWinner, 175, cell2);
    setTimeout(addWinner, 350, cell3);
    setTimeout(changeStatus, 350);
    gameIsLive = false;
};

const handleTie = () => {
    statusDiv.innerHTML = "IT'S A TIE!";
    statusDiv.classList.add("winnerText");
    gameIsLive = false;
};

// Handle buttons
const resetDiv = document.querySelector(".reset");

const handleReset = () => {
    gameIsLive = true;
    xIsNext = true;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove("x");
        cellDiv.classList.remove("o");
        cellDiv.classList.remove("winner");
    }
    statusDiv.classList.remove("winnerText");
    statusDiv.innerHTML = "Next: X";
    if (selectedChoice == "o") {
        AIMove("x");
    }
};
resetDiv.addEventListener("click", handleReset);

const handleCellClick = (e) => {
    const classList = e.target.classList;
    const location = e.target.classList[1];
    if (classList[2] == "x" || classList[2] == "o") {
        return;
    }
    makeMove(location);
    if (selectedChoice != "friend") {
        selectedChoice;
        AIMove(AIPlayer);
        // make AI move after player move
    }
};
for (const cellDiv of cellDivs) {
    cellDiv.addEventListener("click", handleCellClick);
}

// Player choice buttons
const playODiv = document.querySelector(".play-o");
const playXDiv = document.querySelector(".play-x");
const playFriendDiv = document.querySelector(".play-friend");
const choosePlayerDivs = document.querySelectorAll(".choice");

let selectedChoice;
let AIPlayer;
let currentPlayer = "x";

const chooseX = () => {
    if (selectedChoice == "x") {
        return;
    }
    for (choice of choosePlayerDivs) {
        choice.classList.remove("selected-choice");
        choice.classList.add("selectable-choice");
    }
    playXDiv.classList.remove("selectable-choice");
    playXDiv.classList.add("selected-choice");
    selectedChoice = "x";
    AIPlayer = "o";
    handleReset();
};
playXDiv.addEventListener("click", chooseX);

const chooseO = () => {
    if (selectedChoice == "o") {
        return;
    }
    for (choice of choosePlayerDivs) {
        choice.classList.remove("selected-choice");
        choice.classList.add("selectable-choice");
    }
    playODiv.classList.remove("selectable-choice");
    playODiv.classList.add("selected-choice");
    selectedChoice = "o";
    AIPlayer = "x";
    handleReset();
};
playODiv.addEventListener("click", chooseO);

const chooseFriend = () => {
    if (selectedChoice == "friend") {
        return;
    }
    for (choice of choosePlayerDivs) {
        choice.classList.remove("selected-choice");
        choice.classList.add("selectable-choice");
    }
    playFriendDiv.classList.remove("selectable-choice");
    playFriendDiv.classList.add("selected-choice");
    selectedChoice = "friend";
    handleReset();
};
playFriendDiv.addEventListener("click", chooseFriend);

// make move and change game state
const makeMove = (location) => {
    if (gameIsLive) {
        const target = cellDivs[location];
        if (xIsNext) {
            target.classList.add("x");
        } else {
            target.classList.add("o");
        }
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusDiv.innerHTML = "Next: X";
        } else {
            statusDiv.innerHTML = "Next: <span>O</span>";
        }
        checkGameStatus();
    }
};

const AIMove = (AIPlayer) => {
    gameStatus = getGameStatus();
    bestMove = getBestMove(gameStatus, AIPlayer, AIPlayer);
    makeMove(bestMove[0]);
};

chooseX(); // set as default button pressed
