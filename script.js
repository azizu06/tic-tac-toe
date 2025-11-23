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

    const getBoards = () => board;

    const editMsg = (gameMessage) => {
        message = gameMessage;
    };

    const getMsg = () => message;

    const clearBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = '';
        }
    };

    return {
        editBoard,
        getBoard,
        getBoards,
        editMsg,
        getMsg,
        clearBoard
    };
})();


const gameController = ( () => {
    let gameRunning = true;
    const board = gameBoard;
    const Player = (name, marker) => {
        return { name, marker };
    }
    let players = [];
    let activePlayer;
    const setNames = (name1, name2) => {
        players = [
            Player(name1, 'X'),
            Player(name2, 'O')
        ];
        activePlayer = players[0];
    };

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActive = () => activePlayer;

    const turnMessage = () => {
        board.editMsg(`${getActive().name}'s turn`);
    };

    const restartGame = () => {
        board.clearBoard();
        activePlayer = players[0];
        gameRunning = true;
        round = 0;
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
        let score = 0
        for(let i = 0; i < winCombos.length; i++){
            score = 0;
            for(let j = 0; j < 3; j++){
                if(board.getBoard([winCombos[i][j]]) === getActive().marker){
                    score+=1;
                }
            }
            if(score === 3){
                return true;
            }
        }
        return false;
    }
    let round = 0
    const playRound = (index) => {
        if(gameRunning === false){
            return;
        }
        if(board.getBoard(index) != ''){
            return;
        }
        board.editBoard(index, getActive().marker);
        round++;
        if(checkWinner() === true){
            board.editMsg(`${getActive().name} wins!`);
            gameRunning = false;
            return;
        }
        if(round === 9){
            board.editMsg('Draw!');
            gameRunning = false;
            return;
        }
        switchTurn();
        turnMessage();
    };

    const startGame = () => {
        turnMessage();
    }
    
    return { 
        playRound, 
        getActive,
        getBoards: board.getBoards,
        restartGame,
        setNames,
        startGame
    };

})();

const displayController = ( () => {
    const game = gameController;
    const board = gameBoard;
    const displayMsg = document.querySelector(".message");
    const restartBtn = document.querySelector(".restart");
    const cells = document.querySelectorAll(".cell");
    const dialog = document.querySelector(".dialog");
    const form = document.querySelector(".form");
    const playerOne = document.querySelector(".player1");
    const playerTwo = document.querySelector(".player2");

    const updateScreen = () => {
        const newBoard = game.getBoards();
        cells.forEach(cell => {
            cell.innerText = '';
        });
        displayMsg.innerText = board.getMsg();
        cells.forEach((cell, index) => {
                cell.innerHTML = newBoard[index];
        });
    }

    const clickCell = (e) => {
        const index = e.target.dataset.index;
        game.playRound(index);
        updateScreen();
    };

    dialog.showModal();
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if(!form.checkValidity()){
            form.reportValidity();
            return;
        }
        game.setNames(playerOne.value, playerTwo.value);
        dialog.close();
        game.startGame();
        displayMsg.innerText = board.getMsg();
    })

    cells.forEach(cell => {
        cell.addEventListener("click", clickCell);
    });

    restartBtn.addEventListener("click", () => {
        game.restartGame();
        updateScreen();
    });
})();