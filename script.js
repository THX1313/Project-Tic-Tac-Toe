// Gameboard module: An IIFE which returns { isCellEmpty, markCell, getBoard }
const Gameboard = (function () {
      // Initialize board array
  let board = ["", "", "", "", "", "", "", "", ""];

  // Get cell is empty
  function isCellEmpty(index) {
    return board[index] === "";
  }

  // Set cell marker
  function markCell(index, marker) {
    if (isCellEmpty(index)) { // isn't this tested elsewhere?
      board[index] = marker;
      return true;
    }
    return false;
  }

  // Return board array
  function getBoard() {
    return board;
  }

  function setBoard(updatedBoard) {
    board = updatedBoard;
  }
  
      // Expose all the functions defined in the module
      return { isCellEmpty, markCell, getBoard, setBoard };
    })();

  // Player factory function********************************************************************
  const Player = (name, marker) => {
      return { name, marker };
    };

  const playerX = Player("Player X", "X");
  const playerO = Player("Player O", "O");

  // Game controller module***********************************************************************
  const GameController = (function () {
      
    // Player X starts game
    let currentPlayer = playerX;
    let displayText = "";
    let gameStatus = "playing";


    // Switch current Player
    function switchPlayer() {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
      updateGameDisplay(currentPlayer.name);
    }

    // Set game Display
    function updateGameDisplay(gameInfo) {
      const gameDisplay = document.querySelector('.gameDisplay');
      gameDisplay.textContent = gameInfo;
    }
    

    // function getGameStatus() { // update
    //   return gameStatus;
    // }

    // function setGameStatus(newStatus) { // update
    //   gameStatus = newStatus;
    // } 
    
    // Reset Gameboard
    function resetBoard(event) {  // update
      Gameboard.setBoard( ["", "", "", "", "", "", "", "", ""] );
      gameStatus = "playing";
      currentPlayer = playerX;
      const squares = document.querySelectorAll('.square');
      // console.log(squares);
      squares.forEach((sqr) => {
        sqr.textContent = "";
          });
      updateGameDisplay("Player X");
    }

    function areThreeInARow() {
      const board = Gameboard.getBoard(); // Retrieve the board array
    
      // 012
      if ((board[0] !== "") && (board[0] === board[1]) && (board[0] === board[2])) {
        return true;
      }
      // 345
      if ((board[3] !== "") && (board[3] === board[4]) && (board[3] === board[5])) {
        return true;
      }
      // 678
      if ((board[6] !== "") && (board[6] === board[7]) && (board[6] === board[8])) {
        return true;
      }
      // 036
      if ((board[0] !== "") && (board[0] === board[3]) && (board[0] === board[6])) {
        return true;
      }
      // 147
      if ((board[1] !== "") && (board[1] === board[4]) && (board[1] === board[7])) {
        return true;
      }
      // 258
      if ((board[2] !== "") && (board[2] === board[5]) && (board[2] === board[8])) {
        return true;
      }
      // 048
      if ((board[0] !== "") && (board[0] === board[4]) && (board[0] === board[8])) {
        return true;
      }
      // 246
      if ((board[2] !== "") && (board[2] === board[4]) && (board[2] === board[6])) {
        return true;
      }
      return false;
    }  

    // When any cell is clicked, do this
    function handleCellClick(event) {
      // Target the clicked cell
      const sqr = event.target;
      // Get correct board array index
      const stringIndex = sqr.getAttribute('data-index');
      // Convert index to an integer, from a string
      const index = parseInt(stringIndex, 10);    
      //  If cell is empty and gameStatus == "playing"
      if ((Gameboard.isCellEmpty(index)) && (gameStatus === "playing")) {
        // Change inner text to currentPlayerSymbol    
        sqr.textContent = currentPlayer.marker;

        Gameboard.markCell(index, currentPlayer.marker);

        if (areThreeInARow()) {
          gameStatus = "!playing";
          displayText = (`${currentPlayer.name} wins!`);
          updateGameDisplay(displayText);
        } // Else if boardArray contains isEmpty
        else if (Gameboard.getBoard().includes("")) {
          switchPlayer();
        } // Else change gameStatus to It’s a tie
        else {
          gameStatus = "!playing";
          displayText = (`It’s a tie`);
          updateGameDisplay(displayText);
        }
      }
    }

    function addEventListeners() {
      const resetButton = document.querySelector('.resetButton');
      resetButton.addEventListener('click', resetBoard)

      const cells = document.querySelectorAll(".square");

      cells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
      });
    }
      return { addEventListeners };
  })();

GameController.addEventListeners();

// You’re going to store the gameboard as an array inside of a Gameboard object, so start there!

// Your players are also going to be stored in objects.

// you’re probably going to want an object to control the flow of the game itself.

// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory.

// Rule of thumb: 
// If you only ever need ONE of something(gameBoard, displayController), use a module.

// If you need multiples of something(players!), create them with factories.

// Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)

// Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!

// Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the GAME, PLAYER, or GAMEBOARD objects.

//Take care to put them in “logical” places.Spending a little time brainstorming here can make your life much easier later!

// If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example of how you might organize your code for this project.

// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)

// If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!
