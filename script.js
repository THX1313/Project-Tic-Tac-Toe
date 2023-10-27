// Gameboard module: An IIFE which returns { isCellEmpty, markCell, getBoard }
const Gameboard = (function () {
      // Initialize board array
  const board = ["", "", "", "", "", "", "", "", ""];
  const gameStatus = "playing";

      // Get cell is empty
      function isCellEmpty(index) {
        return board[index] === "";
      }

      // Set cell marker
      function markCell(index, marker) {
        if (isCellEmpty(index)) {
          board[index] = marker;
          return true;
        }
        return false;
      }

      // Return board array
      function getBoard() {
        return board;
      }
      
      // Reset Gameboard
      function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameStatus = "playing";
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
          cell.addEventListener('click', () => cell.textContent = "");
            });
        GameController.updateGameDisplay("PlayerX's turn");
      }
  
      // Expose all the functions defined in the module
      return { isCellEmpty, markCell, getBoard, resetBoard };
    })();

  // Player factory function)
  const Player = (name, marker) => {
      return { name, marker };
    };

  const playerX = Player("Player X", "X");
  const playerO = Player("Player O", "O");

  // Game controller module
  const GameController = (function () {
      
    // Player X starts game
    let currentPlayer = playerX;
    let displayText = "";

    // Switch current Player
    function switchPlayer() {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
      updateGameDisplay(currentPlayer);
    }
  
    // Check for three in a row
    function areThreeInARow() {
// 012	if (arr[0] === arr[1] && arr[0] === arr[2])
// 345
// 678

// 036
// 147
// 258

// 048
// 246
      if (Gameboard.board) {
        return true;
      } else {
        return false;
      }

    // Set game Display
    function updateGameDisplay(gameInfo) {
      const gameDisplay = document.querySelector('.gameDisplay');
      gameDisplay.textContent = gameInfo;
    }

    // When any cell is clicked, do this
    function handleCellClick(event) {
      // Target the clicked cell
      const cell = event.target;
      // Get correct board array index
      const index = cell.dataset.index; // parse int?
    
      //  If cell is empty and gameStatus == "playing"
      if (Gameboard.isCellEmpty(index) && Gameboard.gameStatus === "playing") {
        // Change inner text to currentPlayerSymbol    
        cell.textContent = currentPlayer.marker;
        Gameboard.markCell(index, currentPlayer.marker);

        if (areThreeInARow()) {
          Gameboard.gameStatus = `${currentPlayer} wins!`;
          displayText = Gameboard.gameStatus;
          updateGameDisplay(displayText);
        } // Else if boardArray contains isEmpty
        else if (Gameboard.board.includes("")) {
          switchPlayer();
        } // Else change gameStatus to It’s a tie
        else {
          Gameboard.gameStatus === `It’s a tie`;
          displayText = Gameboard.gameStatus
          updateGameDisplay(displayText);
        }
      }
    }

    function addEventListeners() {
      const resetButton = document.querySelector('.resetButton');
      resetButton.addEventListener('click', Gameboard.resetBoard)

      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
      });
    }
      return { addEventListeners, updateGameDisplay };
  })();

GameController.addEventListeners();
GameController.updateGameDisplay();


// Check current player
//  if button’s inner text is empty
// Change inner text to currentPlayerSymbol

// if three in a row
// Change gameStatusButton to currentPlayer wins!
// Else if boardArray contains isEmpty
// Toggle current player
// Else change gameStatusButton to It’s a tie

// const GameBoard = {};
// const isEmpty = true;
// const player1 = 'Player 1';
// const player2 = 'Player 2';

// const startingArray =
//     [isEmpty, isEmpty, isEmpty,

//     isEmpty, isEmpty, isEmpty,
    
//         isEmpty, isEmpty, isEmpty];
    
// const gameBoardArray = startingArray;

// let currentPlayer = player1;

// displayGameBoard();


// do {
//     if (!foundThreeInARow()) {
//         letPlay();
//     } else {
//         break;
//     }
// } while (gameBoardArray.includes(isEmpty));


// if (gameBoardArray.includes(isEmpty)) {
//     displayWinner(!nextPlayer);
// } else {
//     displayWinner('tie');
// }

// function letPlay() {
//     // next player play
//     // toggle next player
// }

// function foundThreeInARow() {

// }

// function displayGameBoard() {
    
// }

// function displayWinner(winner) {
//     if (winner === 'tie') {
//         alert('You tied!');
//     } else {
//         alert(`The winner is: ${winner}`);
//     }
// }

// You’re going to store the gameboard as an array inside of a Gameboard object, so start there!
// Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory.
// Rule of thumb: 
// If you only ever need ONE of something(gameBoard, displayController), use a module[This is easily achievable with IIFEs(Immediately Invoked Function Expression) which are simply created by wrapping your factory function in parentheses and immediately calling(invoking) it with the addition of trailing parenthesis, (....)( ) ].
// If you need multiples of something(players!), create them with factories.

// Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)

// Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!

// Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the GAME, PLAYER, or GAMEBOARD objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
// If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example of how you might organize your code for this project.

// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)

// If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!
