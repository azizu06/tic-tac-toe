const gameBoard = ( () => {
    const board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    let message = '';

    const editBoard = (index, marker) => {
        board[index] = marker;
    };

    const getBoard = (index) => board[index];

    const editMsg = (gameMessage) => {
        message = gameMessage;
    };

    const getMsg = () => message;

    const restartGame = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = '';
        }
        message = 'Player X\'s turn';
    };

    return {
        editBoard,
        getBoard,
        editMsg,
        getMsg,
        restartGame
    };
})();


const gameController = ( (
    playerOne = 'Player 1',
    playerTwo = 'Player 2'
) => {
    const board = gameBoard;
    const Player = (name, marker) => {
        return { name, marker };
    }
    const players = [
        Player(playerOne, 'X'),
        Player(playerTwo, 'O')
    ];
    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActive = () => activePlayer;

    const playRound = (index) => {
        let round = 1;
        board.editBoard(index, getActive().marker);
        
    };


    return {

    };

})();