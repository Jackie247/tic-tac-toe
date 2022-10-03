const GameController = () => {
    const {createBoard} = GameBoard();
    const startGame = () => {
        createBoard();
    }
    return {startGame};
};
const GameBoard = () => {
    // tic tac toe grid is displayed from an array
    let board = ['x','o','x','o','x','o','x','o','o'];
    // parent elem for the child elems from array
    let grid = document.getElementById('ttt-grid');
    const clearBoard = () => {
        // called after every win/loss
        while(board.length > 0){
            board.shift();
        }
    }
    const createBoard = () => {
        // create html elems for each array element
        // to display on screen
        for(let i = 0; i < board.length; i++){
            let square = document.createElement("div"); 
            square.classList.add('grid-item');
            square.textContent = board[i];
            grid.appendChild(square);
        }
    }
    return {
        clearBoard,
        createBoard
    }
};

const Player = () => {
    let score = 0;
    const makeMove = () => {

    }
}

const displayController = (() => {
    const declareWinner = () => {

    }
})();

const game = GameController();
game.startGame();