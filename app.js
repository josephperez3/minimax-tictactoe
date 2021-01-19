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
    // check horizontal win (make fn)
    for (let i = 0; i < 9; i += 3) {
        if (isWinner(gameStatus[i], gameStatus[i + 1], gameStatus[i + 2])) {
            console.log("row", i / 3);
            handleWinner(gameStatus[i], i, i + 1, i + 2);
            return;
        }
    }
    // check vertical win (make fn)
    for (let i = 0; i < 3; i++) {
        if (isWinner(gameStatus[i], gameStatus[i + 3], gameStatus[i + 6])) {
            console.log("column", i);
            handleWinner(gameStatus[i], i, i + 3, i + 6);
            return;
        }
    }
    // check diagonal win (make fn)
    // left to right diagonal
    if (isWinner(gameStatus[0], gameStatus[4], gameStatus[8])) {
        console.log("left to right");
        handleWinner(gameStatus[0], 0, 4, 8);
        return;
    }
    // right to left diagonal
    if (isWinner(gameStatus[2], gameStatus[4], gameStatus[6])) {
        console.log("right to left");
        handleWinner(gameStatus[2], 2, 4, 6);
        return;
    }
    if (gameStatus.filter((s) => s == "x").length == 5) {
        handleTie();
    }
};

const handleWinner = (winner, cell1, cell2, cell3) => {
    const addWinner = (divIndex) => {
        cellDivs[divIndex].classList.add("winner");
    };
    const changeStatus = () => {
        statusDiv.innerHTML = "WINNER: " + winner.toUpperCase();
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

const isWinner = (cell1, cell2, cell3) => {
    return cell1 && cell1 == cell2 && cell2 == cell3;
};

const verticalWin = (cell1, cell2, cell3) => {
    return cell1 && cell1 == cell2;
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
