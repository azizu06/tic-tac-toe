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

    const restartGame = (name) => {
        for(let i = 0; i < board.length; i++){
            board[i] = '';
        }
        message = `${name}'s turn`;
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

    const turnMessage = () => {
        board.editMsg(`${getActive().name}'s turn`);
    };

    const checkWinner = () => {
        const winCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(let i = 0; i < winCombos.length; i++){
            let score = 0;
            for(let j = 0; j < 3; j++){
                if(board[winCombos[j]] === getActive().marker){
                    score+=1
                }
                if(score === 3){
                    return true;
                }
            }
        }
        return false;
    }

    const playRound = (index) => {
        if(board.getBoard(index) != ''){
            return;
        }
        board.editBoard(index, getActive().marker);
        if(checkWinner() === true){
            board.editMsg(`${getActive().name} wins!`);
            return;
        }
        if(!board.includes('')){
            board.editMsg('Draw!');
            return;
        }
        switchTurn();
        turnMessage();
    };
    turnMessage();

    return { playRound, getActive };

})();