let count = 0;
const getBestMove = (gameStatus, nextPlayer, maxPlayer) => {
    if (count > 5000) {
        return;
    }
    let otherPlayer = nextPlayer == "x" ? "o" : "x";
    let simStatus = [...gameStatus];
    let availableSquares = getAvailableSquares(simStatus);
    /*if (availableSquares.length >= 5) {
        return;
    }*/
    const winner = findWinner(simStatus);
    if (winner) {
        const scoreSign = winner[0] == maxPlayer ? 1 : -1;
        const emptySquares = availableSquares.length + 1;
        // since we're looking a move ahead, add 1.
        return [null, scoreSign * emptySquares];
        // null will be replaced by the previous move that led to a win.
    }
    if (checkTie(simStatus)) {
        return [null, 0];
        // null will be replaced by the previous move that led to a draw.
    }
    let bestMove;
    if (nextPlayer == maxPlayer) {
        bestMove = [null, -Infinity];
    } else {
        bestMove = [null, Infinity];
    }
    let value;
    //console.log(availableSquares);
    for (const square of availableSquares) {
        simStatus[square] = nextPlayer;
        //console.log(square);
        //console.log("BEFORE::");
        //console.log(simStatus);
        let simBest = getBestMove(simStatus, otherPlayer, maxPlayer);
        simBest[0] = square;
        simStatus[square] = undefined;
        //console.log("AFTER::");
        //console.log(simStatus);
        //console.log(square);
        //console.log(simStatus);
        if (nextPlayer == maxPlayer) {
            if (simBest[1] > bestMove[1]) {
                bestMove = simBest;
            }
        } else {
            if (simBest[1] < bestMove[1]) {
                bestMove = simBest;
            }
        }
    }
    //console.log(best);
    //console.log(count);
    //count += 1;
    return bestMove;
};
