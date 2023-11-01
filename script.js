// Clean up the interface to allow players to put in their names, include a button to start/restart

// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function isCellEmpty(index) {
    return board[index] === "";
  }

  function markCell(index, marker) {
    if (isCellEmpty(index)) {
      board[index] = marker;
      return true;
    }
    return false;
  }

  function getBoard() {
    return board;
  }

  function setBoard(updatedBoard) {
    board = updatedBoard;
  }

  return { isCellEmpty, markCell, getBoard, setBoard };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const playerX = Player("Player X", "X");
const playerO = Player("Player O", "O");

const GameController = (() => {
  let currentPlayer = playerX;
  let gameStatus = "playing";

  function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    updateGameDisplay(currentPlayer.name);
  }

  function updateGameDisplay(gameInfo) {
    const gameDisplay = document.querySelector('.gameDisplay');
    gameDisplay.textContent = gameInfo;
  }

  function resetBoard() {
    Gameboard.setBoard(["", "", "", "", "", "", "", "", ""]);
    gameStatus = "playing";
    currentPlayer = playerX;
    const squares = document.querySelectorAll('.square');
    squares.forEach((sqr) => {
      sqr.textContent = "";
    });
    updateGameDisplay(currentPlayer.name);
  }

  function areThreeInARow(board) {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  function handleCellClick(event) {
    const sqr = event.target;
    const stringIndex = sqr.getAttribute('data-index');
    const index = parseInt(stringIndex, 10);

    if (Gameboard.isCellEmpty(index) && gameStatus === "playing") {
      sqr.textContent = currentPlayer.marker;
      Gameboard.markCell(index, currentPlayer.marker);

      if (areThreeInARow(Gameboard.getBoard())) {
        gameStatus = "!playing";
        updateGameDisplay(`${currentPlayer.name} wins!`);
      } else if (Gameboard.getBoard().includes("")) {
        switchPlayer();
      } else {
        gameStatus = "!playing";
        updateGameDisplay("It’s a tie");
      }
    }
  }

  function addEventListeners() {
    const cells = document.querySelectorAll(".square");
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });

    const resetButton = document.querySelector('.resetButton');
    resetButton.addEventListener('click', resetBoard);
  }

  return { addEventListeners };
})();

GameController.addEventListeners();

// Rule of thumb: 
// If you only ever need ONE of something(gameBoard, displayController), use a module.

// If you need multiples of something(players!), create them with factories.

// Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the GAME, PLAYER, or GAMEBOARD objects.

//Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

// If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example of how you might organize your code for this project.
