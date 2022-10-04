const GameController = () => {
    // While game is not won, take turns to play
    // Determine winner once 3 in a row
    const {createBoard} = GameBoard();
    const startGame = () => {
        createBoard();
        const player = Player();
        player.updateSide("O");
        player.makeMove();
    }
    return {startGame};
};
const GameBoard = () => {
    // tic tac toe grid is displayed from an array
    let board = ['','','','','','','','',''];
    // parent elem for the child elems from array
    let grid = document.querySelector('.grid');
    // create html elems for each array element to display on screen
    const createBoard = () => {
        board.forEach(()=>{
            let square = document.createElement("div");
            square.classList.add('grid-item');
            grid.appendChild(square);
        })
    }
    let children = grid.querySelectorAll(".grid-item");
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
    const makeMove = () => {
        children.forEach((elem) => {
            elem.addEventListener('click',() => {elem.textContent = side;})
        })
    }
    const updateSide = (newSide) => {
        side = newSide;
    }
    return{
        makeMove,
        updateSide,
    }
}
const Enemy = () => {
    const {grid} = GameBoard();
    let children = grid.querySelectorAll(".grid-item");
    const makeMove = () => {
        children.forEach((item) => {
            item.addEventListener('click',()=> {
                item.textContent = 'X';
            })
        });
    }
    return{
        makeMove,
    }
}
const game = GameController();
game.startGame();

