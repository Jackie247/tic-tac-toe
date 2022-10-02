const gameBoard = (() => {
    // tic tac toe grid is displayed from an array
    let board = ['x','o','x','o','x','o','x','o','o'];
    // parent elem for the child elems from array
    let grid = document.getElementById('ttt-grid');
    const clearBoard = () => {
        while(board.length > 0){
            board.shift();
        }
    }
    const createBoard = () => {
        // create html elems for each array element
        for(let i = 0; i < board.length; i++){
            let square = document.createElement("div"); 
            square.textContent = board[i];
            grid.appendChild(square);
        }
    }
    return {
        clearBoard,
        createBoard
    }
})();

const player = () => {
    let score = 0;
    const makeMove = () => {

    }
}

const displayController = (() => {
    const declareWinner = () => {

    }
})();

gameBoard.createBoard();