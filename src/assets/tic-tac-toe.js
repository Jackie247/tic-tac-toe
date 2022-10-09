'use strict';
const Player = (side) => {
    this.side = side;
    const getSide = () => {return side;}
    return{
        getSide,
    }
}
const GameBoard = (() => {
    // gameboard module to create grid elements and functions to 
    // return and set a board index (grid)
    // tic tac toe grid is displayed from an array
    let board = ['','','','','','','','',''];
    let grid = document.getElementById('ttt-grid');
    board.forEach(()=>{
        let square = document.createElement("div");
        square.classList.add('grid-item');
        grid.appendChild(square);
    })
    const setBoardIndex = (index,sign) => {
        // call to change a board element at index
        if(index > board.length){return;}
        board[index] = sign;
    }
    const getBoardIndex = (index) => {
        // gets the index of element
        if(index > board.length){return;}
        return board[index];
    }
    const clearBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    }
    return {
        clearBoard,
        setBoardIndex,
        getBoardIndex,
    }
})();
const DisplayController = (() => {
    // DOM Elements
    let grid = document.getElementById('ttt-grid');
    let children = grid.querySelectorAll(".grid-item");
    let restartBtn = document.getElementById('restart-btn');
    let messageElem = document.getElementById('message');
    for(let i = 0; i < children.length; i++){
        children[i].index = i;
        children[i].addEventListener('click',(e) => {
            if(GameController.getGameFinished() || e.target.textContent !== "") return;
            GameController.handleRound(parseInt(i));
            updateDisplay();
        });
    }

    restartBtn.addEventListener('click', () => {
        GameBoard.clearBoard();
        GameController.resetGame();
        updateDisplay();
        setMessage("Player X's turn");
    })

    const updateDisplay = () => {
        for(let i = 0; i < children.length; i++){
            children[i].textContent = GameBoard.getBoardIndex(i);
        }
    }

    const setResult = (winner) => {
        if(winner === 'Draw'){
            setMessage('Its a draw');
        }
        else{
            setMessage(`Player ${winner} has won`);
        }
    }

    const setMessage = (message) => {
        messageElem.textContent = message;
    }
    return {
        setMessage,
        setResult,
    }
})();
const GameController = (() => {
    // While game is not won, take turns to play
    // Determine winner once 3 in a row
    // create players for game
    const playerX = Player("X");
    const playerO = Player("O");
    let gameFinished = false;
    let round = 1;
    // win conditions to determine winner
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    const handleRound = (boardIndex) => {
        GameBoard.setBoardIndex(boardIndex, getCurrentPlayer());
        if(hasGameWinner(boardIndex)){
            DisplayController.setMessage(`${getCurrentPlayer()} has won the game!`);
            gameFinished = true;
            return;
        }
        if(round === 9){
            DisplayController.setMessage('Draw');
            gameFinished = true;
            return;
        }
        round++;
        DisplayController.setMessage(
            `Player ${getCurrentPlayer()}'s turn`
        );
    }
    const hasGameWinner = (boardIndex) => {
        // gives the possible win conditions, if user has X in index 0,
        // possible win combinations are [0,1,2],[0,3,6],[0,4,8]
        // from these combinations, check if they are all the same player
        return winConditions.filter((combination) => 
        combination.includes(boardIndex)).some((possibleCombinations) => 
            possibleCombinations.every((index) => 
                GameBoard.getBoardIndex(index) === getCurrentPlayer())
        )
    }
    const getCurrentPlayer = () => {return round % 2 === 1 ? playerX.getSide() : playerO.getSide()}
    const getGameFinished = () => {return gameFinished;}
    const resetGame = () => {
        round = 1;
        gameFinished = false;
    }
    return {
        handleRound,
        getGameFinished,
        resetGame,
    };
})();




