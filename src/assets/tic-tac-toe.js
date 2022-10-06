'use strict';
const GameController = (() => {
    // While game is not won, take turns to play
    // Determine winner once 3 in a row
    // create players for game
    const playerX = Player("X");
    const playerO = Player("O");
    let gameOver = false;
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
    const startGame = (boardIndex) => {
        GameBoard.setBoardIndex(boardIndex, getCurrentPlayer());
        if(hasGameWinner(boardIndex)){
            gameOver = true;
            return;
        }
        if(round === 9){
            gameOver = true;
        }
    }
    const hasGameWinner = (boardIndex) => {
        // gives the possible win conditions, if user has X in index 0,
        // possible win combinations are [0,1,2],[0,3,6],[0,4,8]
        let winCombinations = winConditions.filter((combination) => {
            combination.includes(boardIndex);
        })
        // from these combinations, check if they are all the same player
        let winningCombination = winCombinations.some((possibleCombinations) => {
            possibleCombinations.every((boardIndex) => {
                GameBoard.getBoardIndex(boardIndex) === getCurrentPlayer();
            });
        });
        return winningCombination;
    }
    const getCurrentPlayer = () => {return round % 2 === 1 ? playerX.getSide() : playerO.getSide()}
    const getGameWon = () => {return gameWon;}
    const resetGame = () => {
        round = 1;
        gameWon = false;
    }
    return {
        startGame,
        getGameWon,
        resetGame,
    };
})();
const GameBoard = (() => {
    // gameboard module to create grid elements and functions to 
    // return and set a board index (grid)
    // tic tac toe grid is displayed from an array
    let board = ['','','','','','','','',''];
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
        board.forEach((item)=>{item = "";})
    }
    return {
        clearBoard,
        setBoardIndex,
        getBoardIndex,
    }
})();
const DisplayController = (() => {
    const {createBoard} = GameBoard();
    let grid = document.querySelector('.grid');
    // MAKE EACH GRID ELEMENT CLICKABLE
    let children = grid.querySelectorAll(".grid-item");
    children.forEach((elem) => {
        elem.addEventListener('click',(turn) => {
            if(turn == 'X'){
                elem.textContent == 'X';
            }
            else if(turn == 'O'){
                elem.textContent == 'O';
            }
        })
    })
})();
const Player = (side) => {
    this.side = side;
    const getSide = () => {return side;}
    return{
        getSide,
    }
}

const game = GameController();
game.startGame();

