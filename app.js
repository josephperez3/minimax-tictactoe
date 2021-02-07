const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

let gameIsLive = true;
let xIsNext = true;

const checkGameStatus = () => {
    gameStatus = [];
    for (const cellDiv of cellDivs) {
        gameStatus.push(cellDiv.classList[2]);
    }
    getAvailableSquares(gameStatus);
    winner = findWinner(gameStatus);
    if (winner) {
        handleWinner(winner);
    } else if (checkTie(gameStatus)) {
        handleTie();
    }
};

const handleWinner = (winner) => {
    const winningLetter = winner[0];
    const cell1 = winner[1];
    const cell2 = winner[2];
    const cell3 = winner[3];
    const addWinner = (divIndex) => {
        cellDivs[divIndex].classList.add("winner");
    };
    const changeStatus = () => {
        console.log(winner);
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
};

const handleCellClick = (e) => {
    if (gameIsLive) {
        const classList = e.target.classList;
        const location = e.target.classList[1];
        if (classList[2] == "x" || classList[2] == "o") {
            return;
        }

        if (xIsNext) {
            classList.add("x");
            xIsNext = !xIsNext;
        } else {
            classList.add("o");
            xIsNext = !xIsNext;
        }
        if (xIsNext) {
            statusDiv.innerHTML = "Next: X";
        } else {
            statusDiv.innerHTML = "Next: <span>O</span>";
        }
        checkGameStatus();
    }
};

resetDiv.addEventListener("click", handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener("click", handleCellClick);
}

console.log(cellDivs);
console.log(cellDivs[0]);
