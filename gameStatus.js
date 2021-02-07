// this module has functions to read a gameStatus

// findWinner returns [winning player, winning squares] if there is a winner,
// and false if otherwise.
const findWinner = (gameStatus) => {
    for (let i = 0; i < 9; i += 3) {
        if (isWinner(gameStatus[i], gameStatus[i + 1], gameStatus[i + 2])) {
            console.log("row", i / 3);
            return [gameStatus[i], i, i + 1, i + 2]; // winning squares
        }
    }
    // check vertical win (make fn)
    for (let i = 0; i < 3; i++) {
        if (isWinner(gameStatus[i], gameStatus[i + 3], gameStatus[i + 6])) {
            console.log("column", i);
            return [gameStatus[i], i, i + 3, i + 6];
        }
    }
    // check diagonal win (make fn)
    // left to right diagonal
    if (isWinner(gameStatus[0], gameStatus[4], gameStatus[8])) {
        console.log("left to right");
        return [gameStatus[0], 0, 4, 8];
    }
    // right to left diagonal
    if (isWinner(gameStatus[2], gameStatus[4], gameStatus[6])) {
        console.log("right to left");
        return [gameStatus[2], 2, 4, 6];
    }
    return false; // no winner
};

const isWinner = (cell1, cell2, cell3) => {
    return cell1 && cell1 == cell2 && cell2 == cell3;
};

const checkTie = (gameStatus) => {
    return gameStatus.filter((s) => s == "x").length == 5;
};

const getAvailableSquares = (gameStatus) => {
    let availableSquares = [];
    for (let i = 0; i < 9; i++) {
        if (!gameStatus[i]) {
            availableSquares.push(i);
        }
    }
};
