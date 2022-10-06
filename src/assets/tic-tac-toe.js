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
        if(index > board.length){return;}
        board[index] = sign;
    }
    const getBoardIndex = (index) => {
        if(index > board.length){return;}
        return board[index];
    }
    const clearBoard = () => {
        // called after every win/loss
        board.forEach((item)=>{item = "";})
    }
    return {
        clearBoard,
        setBoardIndex,
        getBoardIndex,
    }
})();

const DisplayController = () => {
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
}
const Player = (side) => {
    this.side = side;
    const getSide = () => {return side;}
    return{
        getSide,
    }
}
const game = GameController();
game.startGame();

