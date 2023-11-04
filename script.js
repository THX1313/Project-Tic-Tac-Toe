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


// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)

const GameController = (() => {
  let currentOpponent; // *********************************** dont forget to add this variable to codee below
  let currentPlayer = playerX;
  let playerName; // ="X"  ?
  let gameStatus = "!playing";

  function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    if (currentPlayer === playerO) {
      updateGameDisplay(`${playerName}'s Opponent's Turn`);
    } else {
      updateGameDisplay(`${playerName}'s Turn`);
    }
  }
  function updateGameDisplay(gameInfo) {
    const gameDisplay = document.querySelector('.gameDisplay');
    gameDisplay.textContent = gameInfo;
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

  function handleOrganicMove(selectedIndex) {
    Gameboard.markCell(selectedIndex, currentPlayer.marker);

    if (areThreeInARow(Gameboard.getBoard())) {
      gameStatus = "!playing";
      if (currentPlayer === playerO) {
        updateGameDisplay(`${playerName}'s Opponent wins!`);
      } else {
        updateGameDisplay(`${playerName} wins!`);
      }
    } else if (Gameboard.getBoard().includes("")) {
      switchPlayer();
    } else {
      gameStatus = "!playing";
      updateGameDisplay("It’s a tie");
    }
  }
    

    function handleSyntheticMove(selectedIndex) {
    Gameboard.markCell(selectedIndex, currentPlayer.marker);
      if (areThreeInARow(Gameboard.getBoard())) {
        gameStatus = "!playing";
        updateGameDisplay(`${playerName} wins!`);

      } else if (!(Gameboard.getBoard().includes(""))) {
        gameStatus = "!playing";
        updateGameDisplay("It’s a tie");
      
      } else {
        switchPlayer();
        let randomCell;
        do {
          randomCell = Math.floor(Math.random() * 9);
        } while (!(Gameboard.isCellEmpty(randomCell))); //***************** */
        
        Gameboard.markCell(randomCell, currentPlayer.marker);

        console.log(randomCell);

        // You need to update the correct html element!!!!!***********************************************************************************

        if (areThreeInARow(Gameboard.getBoard())) {
          gameStatus = "!playing";
          updateGameDisplay(`${playerName}'s Opponent wins!`);

        } else if (!Gameboard.getBoard().includes("")) {
          gameStatus = "!playing";
          updateGameDisplay("It’s a tie");
            
        } else {
          switchPlayer();
        }
      }
    }

  function handleCellClick(event) {
    const sqr = event.target;
    const stringIndex = sqr.getAttribute('data-index');
    const index = parseInt(stringIndex, 10);

    if (Gameboard.isCellEmpty(index) && gameStatus === "playing") {
      if (currentOpponent === "organic") {
        sqr.textContent = currentPlayer.marker;
        handleOrganicMove(index); // move
      }
      if ((currentOpponent === "synthetic") && (currentPlayer === playerX)) {
        sqr.textContent = currentPlayer.marker;
        handleSyntheticMove(index); // move
      }
    }
  }
  
  function resetBoard() {
    Gameboard.setBoard(["", "", "", "", "", "", "", "", ""]);
    gameStatus = "playing";
    currentPlayer = playerX;
    const squares = document.querySelectorAll('.square');
    squares.forEach((sqr) => {
      sqr.textContent = "";
    });
    updateGameDisplay(`Start Game / Change Name`);
  }
  function submitFormInputs(event) { //
    // prevent form submission
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    playerName = name;
    if (playerName === "")
      updateGameDisplay("ENTER YOUR NAME");
    else if (currentPlayer !== playerO) {
      updateGameDisplay(`${playerName}'s Turn`);
      gameStatus = "playing";
    }
    const selectedOpponent = document.querySelector('input[name="selectedOpponent"]:checked');
    if (selectedOpponent) {
      // The radio button is checked.
      // Get the value of the radio button.
      console.log(selectedOpponent.value);
    }
    
    // Start or reset the game, depending on the user's choice.
    if (selectedOpponent.value === 'synthetic') {
      currentOpponent = selectedOpponent.value; 
    } else if (selectedOpponent.value === 'organic') {
      currentOpponent = selectedOpponent.value;
    }
  }
  function addEventListeners() {
    const cells = document.querySelectorAll(".square");
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });
    const resetButton = document.querySelector('.resetButton');
    resetButton.addEventListener('click', resetBoard);
    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', submitFormInputs);
    const keyboardInput = document.querySelector("#name");

    // enter key has limited effect as written
    keyboardInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
      }
    });
  }
  return { addEventListeners };
})();
GameController.addEventListeners();

// const Gameboard = (() => {
//   let board = ["", "", "", "", "", "", "", "", ""];

//   function isCellEmpty(index) {
//     return board[index] === "";
//   }

//   function markCell(index, marker) {
//     if (isCellEmpty(index)) {
//       board[index] = marker;
//       return true;
//     }
//     return false;
//   }

//   function getBoard() {
//     return board;
//   }

//   function setBoard(updatedBoard) {
//     board = updatedBoard;
//   }

//   return { isCellEmpty, markCell, getBoard, setBoard };
// })();

// // ... (Player and GameController implementations remain the same)

// const Player = (name, marker) => {
//   return { name, marker };
// };

// const playerX = Player("Player X", "X");
// const playerO = Player("Player O", "O");

// const GameController = (() => {
//   let currentPlayer = playerX;
//   let playerName = playerX.name;
//   let gameStatus = "playing";
//   let currentOpponent = "";
  
//   function switchPlayer() {
//     currentPlayer = currentPlayer === playerX ? playerO : playerX;
//     if (currentPlayer === playerO) {
//       updateGameDisplay(`${playerName}'s Opponent's Turn`);
//     } else {
//       updateGameDisplay(`${playerName}'s Turn`);
//     }
//   }

//   function updateGameDisplay(gameInfo) {
//     const gameDisplay = document.querySelector('.gameDisplay');
//     gameDisplay.textContent = gameInfo;
//   }

//     function areThreeInARow(board) {
//     const winningCombos = [
//       [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//       [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//       [0, 4, 8], [2, 4, 6] // Diagonals
//     ];
//     for (const combo of winningCombos) {
//       const [a, b, c] = combo;
//       if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
//         return true;
//       }
//     }
//     return false;
//     }
  
//   // Function to handle the game outcome
//   function handleGameOutcome() {
//     if (areThreeInARow(Gameboard.getBoard())) {
//       gameStatus = "!playing";
//       const winningPlayer = currentPlayer === playerO ? playerO : playerX;
//       updateGameDisplay(`${winningPlayer.name} wins!`);
//     } else if (!Gameboard.getBoard().includes("")) {
//       gameStatus = "!playing";
//       updateGameDisplay("It’s a tie");
//     } else {
//       switchPlayer();
//     }
//   }

//   // Function to handle moves for both organic and synthetic players
//   function handleMove(selectedIndex) {
//     Gameboard.markCell(selectedIndex, currentPlayer.marker);
//     handleGameOutcome();
//   }

//   // Function to handle the synthetic player move
//   function handleSyntheticMove() {
//     let randomCell;
//     do {
//       randomCell = Math.floor(Math.random() * 9);
//     } while (!Gameboard.isCellEmpty(randomCell));
    
//     Gameboard.markCell(randomCell, currentPlayer.marker);
//     handleGameOutcome();
//   }

//   // Function to handle cell click event
//   function handleCellClick(event) {
//     const sqr = event.target;
//     const stringIndex = sqr.getAttribute('data-index');
//     const index = parseInt(stringIndex, 10);

//     if (Gameboard.isCellEmpty(index) && gameStatus === "playing") {
//       sqr.textContent = currentPlayer.marker;
//       handleMove(index);

//       if (currentOpponent === "synthetic" && currentPlayer === playerX && gameStatus === "playing") {
//         switchPlayer();
//         handleSyntheticMove();
//       }
//     }
//   }

//   // ... (resetBoard, submitFormInputs, addEventListeners remain the same)
//   function resetBoard() {
//     Gameboard.setBoard(["", "", "", "", "", "", "", "", ""]);
//     gameStatus = "playing";
//     currentPlayer = playerX;
//     const squares = document.querySelectorAll('.square');
//     squares.forEach((sqr) => {
//       sqr.textContent = "";
//     });
//     updateGameDisplay(`Start Game / Change Name`);
//   }

//   function submitFormInputs(event) { //
//     // prevent form submission
//     event.preventDefault();
//     const name = document.querySelector('input[name="name"]').value;
//     playerName = name;
//     if (playerName === "")
//       updateGameDisplay("ENTER YOUR NAME");
//     else if (currentPlayer !== playerO) {
//       updateGameDisplay(`${playerName}'s Turn`);
//       gameStatus = "playing";
//     }
//     const selectedOpponent = document.querySelector('input[name="selectedOpponent"]:checked');
//     if (selectedOpponent) {
//       // The radio button is checked.
//       // Get the value of the radio button.
//       console.log(selectedOpponent.value);
//     }
    
//     // Start or reset the game, depending on the user's choice.
//     if (selectedOpponent.value === 'synthetic') {
//       // Start the new version of game. Synthetic pics random empty cell.
//       console.log(selectedOpponent.value);
//       currentOpponent = selectedOpponent.value; // ***********************************

  
//     } else if (selectedOpponent.value === 'organic') {
//             // Start the default game
//             console.log(selectedOpponent.value);
//       currentOpponent = selectedOpponent.value; // ***************************

//     }
//   }

//   function addEventListeners() {
//     const cells = document.querySelectorAll(".square");
//     cells.forEach((cell) => {
//       cell.addEventListener('click', handleCellClick);
//     });
//     const resetButton = document.querySelector('.resetButton');
//     resetButton.addEventListener('click', resetBoard);
//     const submitButton = document.querySelector('#submitButton');
//     submitButton.addEventListener('click', submitFormInputs);
//     const keyboardInput = document.querySelector("#name");

//     // enter key has limited effect as written
//     keyboardInput.addEventListener("keypress", function(event) {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         submitButton.click();
//       }
//     });
//   }

//   return { addEventListeners };
// })();

// GameController.addEventListeners();
