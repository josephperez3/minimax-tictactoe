// this module has functions to read a gameStatus

// findWinner returns [winning player, winning squares] if there is a winner,
// and false if otherwise.

const getGameStatus = () => {
    gameStatus = [];
    for (const cellDiv of cellDivs) {
        gameStatus.push(cellDiv.classList[2]);
    }
    return gameStatus;
};

const findWinner = (gameStatus) => {
    // check if 3 cells are matching and not undefined
    const isWinner = (cell1, cell2, cell3) => {
        return cell1 && cell1 == cell2 && cell2 == cell3;
    };

    // check horizontal win
    for (let i = 0; i < 9; i += 3) {
        if (isWinner(gameStatus[i], gameStatus[i + 1], gameStatus[i + 2])) {
            return [gameStatus[i], i, i + 1, i + 2]; // winning squares
        }
    }
    // check vertical win
    for (let i = 0; i < 3; i++) {
        if (isWinner(gameStatus[i], gameStatus[i + 3], gameStatus[i + 6])) {
            return [gameStatus[i], i, i + 3, i + 6];
        }
    }

    // check diagonal wins
    // left to right diagonal
    if (isWinner(gameStatus[0], gameStatus[4], gameStatus[8])) {
        return [gameStatus[0], 0, 4, 8];
    }
    // right to left diagonal
    if (isWinner(gameStatus[2], gameStatus[4], gameStatus[6])) {
        return [gameStatus[2], 2, 4, 6];
    }
    return false; // no winner
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
    return availableSquares;
};
