'use strict';
const GameController = () => {
    // While game is not won, take turns to play
    // Determine winner once 3 in a row
    const gameBoard = GameBoard();
    let gameWon = false;
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
    const startGame = () => {
        gameBoard.createBoard();
        const player = Player();
        player.updateSide("O");
        player.makeMove();
        if(gameWon == true){
            gameBoard.clearBoard();
        }
    }
    return {startGame};
};
const GameBoard = () => {
    // tic tac toe grid is displayed from an array
    let board = ['','','','','','','','',''];
    let grid = document.querySelector('.grid');
    // CREATE THE GRID ELEMENTS
    const createBoard = () => {
        board.forEach(()=>{
            let square = document.createElement("div");
            square.classList.add('grid-item');
            grid.appendChild(square);
        })
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
    }
    const clearBoard = () => {
        // called after every win/loss
        while(board.length > 0){
            board.shift();
        }
    }
    return {
        clearBoard,
        createBoard,
        grid,
        children,
    }
};
const Player = () => {
    let side = "X";
    const {grid} = GameBoard();
    let children = grid.querySelectorAll(".grid-item");
    const updateSide = (newSide) => {
        side = newSide;
    }
    return{
        makeMove,
        updateSide,
    }
}
const game = GameController();
game.startGame();

