// getBestMove returns [best move, value of best move]
const getBestMove = (gameStatus, nextPlayer, maxPlayer) => {
    let otherPlayer = nextPlayer == "x" ? "o" : "x";
    let simStatus = [...gameStatus];
    let availableSquares = getAvailableSquares(simStatus);
    if (availableSquares.length == 9) {
        return [Math.round(Math.random() * 9), null];
        // to make games more interesting instead of going to 0
        // everytime as O's first move.
    }
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
        // trying to maximize score
    } else {
        bestMove = [null, Infinity];
        // trying to minimize score
    }
    for (const square of availableSquares) {
        simStatus[square] = nextPlayer;
        // pretend we made one of the moves available in availableSquares
        let simBest = getBestMove(simStatus, otherPlayer, maxPlayer);
        simBest[0] = square;
        simStatus[square] = undefined;
        // undo simulated move made earlier

        if (nextPlayer == maxPlayer) {
            if (simBest[1] > bestMove[1]) {
                bestMove = simBest;
                // if the value is greater, this is the new best move
                // for the max player.
            }
        } else {
            if (simBest[1] < bestMove[1]) {
                bestMove = simBest;
                // if the value is smaller, this is the new best move
                // for the other player.
            }
        }
    }
    return bestMove;
};
