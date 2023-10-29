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
    const resetButton = document.querySelector('.resetButton');
    resetButton.addEventListener('click', resetBoard);

    const cells = document.querySelectorAll(".square");
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });
  }

  return { addEventListeners };
})();

GameController.addEventListeners();


// // Gameboard module: An IIFE which returns { isCellEmpty, markCell, getBoard, setBoard}
// const Gameboard = (function () {
//     // Initialize board array
//     let board = ["", "", "", "", "", "", "", "", ""];

//     // Get cell is empty
//     function isCellEmpty(index) {
//       return board[index] === "";
//     }

//     // Set cell marker
//     function markCell(index, marker) {
//       if (isCellEmpty(index)) { // isn't this tested elsewhere?
//         board[index] = marker;
//         return true;
//       }
//       return false;
//     }

//     // Return board array
//     function getBoard() {
//       return board;
//     }
//     // Update board array
//     function setBoard(updatedBoard) {
//       board = updatedBoard;
//     }
    
//     // Expose all the functions defined in the module
//     return { isCellEmpty, markCell, getBoard, setBoard };
//   })();

// // Player factory function ********************************************************************
// const Player = (name, marker) => {
//     return { name, marker };
//   };

// const playerX = Player("Player X", "X");
// const playerO = Player("Player O", "O");

// // Game controller module ***********************************************************************
// const GameController = (function () {
    
//   // Player X starts game
//   let currentPlayer = playerX;
//   let displayText = currentPlayer.name;
//   let gameStatus = "playing";


//   // Switch current Player
//   function switchPlayer() {
//     currentPlayer = currentPlayer === playerX ? playerO : playerX;
//     updateGameDisplay(currentPlayer.name);
//   }

//   // Set game Display
//   function updateGameDisplay(gameInfo) {
//     const gameDisplay = document.querySelector('.gameDisplay');
//     gameDisplay.textContent = gameInfo;
//   }
  
//   // Reset Gameboard
//   function resetBoard(event) {
//     Gameboard.setBoard( ["", "", "", "", "", "", "", "", ""] );
//     gameStatus = "playing";
//     currentPlayer = playerX;
//     const squares = document.querySelectorAll('.square');
//     squares.forEach((sqr) => {
//       sqr.textContent = "";
//         });
//     updateGameDisplay(currentPlayer.name);
//   }

//   function areThreeInARow() {
//     const board = Gameboard.getBoard(); // Retrieve the board array
  
//     // 012
//     if ((board[0] !== "") && (board[0] === board[1]) && (board[0] === board[2])) {
//       return true;
//     }
//     // 345
//     if ((board[3] !== "") && (board[3] === board[4]) && (board[3] === board[5])) {
//       return true;
//     }
//     // 678
//     if ((board[6] !== "") && (board[6] === board[7]) && (board[6] === board[8])) {
//       return true;
//     }
//     // 036
//     if ((board[0] !== "") && (board[0] === board[3]) && (board[0] === board[6])) {
//       return true;
//     }
//     // 147
//     if ((board[1] !== "") && (board[1] === board[4]) && (board[1] === board[7])) {
//       return true;
//     }
//     // 258
//     if ((board[2] !== "") && (board[2] === board[5]) && (board[2] === board[8])) {
//       return true;
//     }
//     // 048
//     if ((board[0] !== "") && (board[0] === board[4]) && (board[0] === board[8])) {
//       return true;
//     }
//     // 246
//     if ((board[2] !== "") && (board[2] === board[4]) && (board[2] === board[6])) {
//       return true;
//     }
//     return false;
//   }  

//   // When any cell is clicked, do this
//   function handleCellClick(event) {
//     // Target the clicked cell
//     const sqr = event.target;
//     // Get correct board array index
//     const stringIndex = sqr.getAttribute('data-index');
//     // Convert index to an integer, from a string
//     const index = parseInt(stringIndex, 10);    
//     //  If cell is empty and gameStatus == "playing"
//     if ((Gameboard.isCellEmpty(index)) && (gameStatus === "playing")) {
//       // Change inner text to currentPlayerSymbol    
//       sqr.textContent = currentPlayer.marker;

//       Gameboard.markCell(index, currentPlayer.marker);

//       if (areThreeInARow()) {
//         gameStatus = "!playing";
//         displayText = (`${currentPlayer.name} wins!`);
//         updateGameDisplay(displayText);
//       } // Else if boardArray contains isEmpty
//       else if (Gameboard.getBoard().includes("")) {
//         switchPlayer();
//       } // Else change gameStatus to It’s a tie
//       else {
//         gameStatus = "!playing";
//         displayText = (`It’s a tie`);
//         updateGameDisplay(displayText);
//       }
//     }
//   }

//   function addEventListeners() {
//     const resetButton = document.querySelector('.resetButton');
//     resetButton.addEventListener('click', resetBoard)

//     const cells = document.querySelectorAll(".square");

//     cells.forEach((cell) => {
//       cell.addEventListener('click', handleCellClick);
//     });
//   }
//     return { addEventListeners };
// })();

// GameController.addEventListeners();
// Rule of thumb: 
// If you only ever need ONE of something(gameBoard, displayController), use a module.

// If you need multiples of something(players!), create them with factories.

// Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the GAME, PLAYER, or GAMEBOARD objects.

//Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

// If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example of how you might organize your code for this project.
