const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

let gameIsLive = true;
let xIsNext = true;

const handleReset = (e) => {
    console.log(e);
};

const checkGameStatus = () => {
    gameStatus = [];
    for (const cellDiv of cellDivs) {
        gameStatus.push(cellDiv.classList[2]);
    }
    for (let i = 0; i < 9; i += 3) {
        if (
            horizontalWin(gameStatus[i], gameStatus[i + 1], gameStatus[i + 2])
        ) {
            console.log("row", i / 3);
            handleWinner(gameStatus[i], i, i + 1, i + 2);
        }
    }
};

const handleWinner = (winner, cell1, cell2, cell3) => {
    const addWinner = (divIndex) => {
        cellDivs[divIndex].classList.add("winner");
    };
    const changeStatus = () => {
        // statusDiv.innerHTML = "WINNER: " + winner.toUpperCase();
        statusDiv.classList.add("winner");
        console.log(statusDiv);
    };
    setTimeout(addWinner, 0, cell1);
    setTimeout(addWinner, 175, cell2);
    setTimeout(addWinner, 350, cell3);
    setTimeout(changeStatus, 350);
};

const horizontalWin = (cell1, cell2, cell3) => {
    return cell1 && cell1 == cell2 && cell2 == cell3;
};

const handleCellClick = (e) => {
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
    checkGameStatus();
};

resetDiv.addEventListener("click", handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener("click", handleCellClick);
}

console.log(cellDivs);
console.log(cellDivs[0]);
