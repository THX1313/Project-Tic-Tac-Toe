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
  let currentOpponent;
  let currentPlayer = playerX;
  let playerName;
  let gameStatus = "!playing";
  const HumanPlayer = playerX.marker;
  const AIPlayer = playerO.marker;

  function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    if (currentPlayer === playerO) {
      updateGameDisplay(`Opponent's Turn`);
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
        updateGameDisplay(`Opponent Wins`);
      } else {
        updateGameDisplay(`${playerName} Wins`);
      }
    } else if (Gameboard.getBoard().includes("")) {
      switchPlayer();
    } else {
      gameStatus = "!playing";
      updateGameDisplay("It’s A Tie");
    }
  }
// MinMax AI generated by Chat GPT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        function getEmptyCells(board) {
          const cells = [];
          for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
              cells.push(i);
            }
          }
          return cells;
        }
        function evaluate(board) {
          const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
          ];
          for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
              if (board[a] === AIPlayer) {
                return 10;
              } else if (board[a] === HumanPlayer) {
                return -10;
              }
            }
          }
          return 0;
        }
        function minimax(board, depth, isMaximizing) {
          const score = evaluate(board);

          if (score === 10) {
            return score - depth;
          }
          if (score === -10) {
            return score + depth;
          }
          if (!board.includes('')) {
            return 0;
          }
          if (isMaximizing) {
            let best = -Infinity;
            const emptyCells = getEmptyCells(board);
            for (const cell of emptyCells) {
              if (board[cell] === '') {
                board[cell] = AIPlayer;
                best = Math.max(best, minimax(board, depth + 1, !isMaximizing));
                board[cell] = '';
              }
            }
            return best;
          } else {
            let best = Infinity;
            const emptyCells = getEmptyCells(board);
            for (const cell of emptyCells) {
              if (board[cell] === '') {
                board[cell] = HumanPlayer;
                best = Math.min(best, minimax(board, depth + 1, !isMaximizing));
                board[cell] = '';
              }
            }
            return best;
          }
        }
        function findBestMove(board) {
          let bestMove = -1;
          let bestVal = -Infinity;
          const emptyCells = getEmptyCells(board);
          for (const cell of emptyCells) {
            if (board[cell] === '') {
              board[cell] = AIPlayer;
              const moveVal = minimax(board, 0, false);
              board[cell] = '';
              if (moveVal > bestVal) {
                bestMove = cell;
                bestVal = moveVal;
              }
            }
          }
          return bestMove;
        }
// End MinMax AI code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    function handleSyntheticMove(selectedIndex) {
    Gameboard.markCell(selectedIndex, currentPlayer.marker);
      if (areThreeInARow(Gameboard.getBoard())) {
        gameStatus = "!playing";
        updateGameDisplay(`${playerName} Wins`);
      } else if (!(Gameboard.getBoard().includes(""))) {
        gameStatus = "!playing";
        updateGameDisplay("It’s A Tie");
      } else {
        switchPlayer();
        // Original AI code which made random selection !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // let randomCell;
        // do {
        //   randomCell = Math.floor(Math.random() * 9);
        // } while (!(Gameboard.isCellEmpty(randomCell)));
        // End of Original AI code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const randomCell = findBestMove(Gameboard.getBoard());
        Gameboard.markCell(randomCell, playerO.marker);
        const squareToUpdate = document.querySelector(("#square" + randomCell));
        squareToUpdate.textContent = currentPlayer.marker;
        if (areThreeInARow(Gameboard.getBoard())) {
          gameStatus = "!playing";
          updateGameDisplay(`Opponent Wins`);
        } else if (!Gameboard.getBoard().includes("")) {
          gameStatus = "!playing";
          updateGameDisplay("It’s A Tie");
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
    updateGameDisplay(`Start Game / Reset Inputs`);
  }
  function submitFormInputs(event) { //
    // prevent form submission
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    playerName = name;
    if (playerName === "")
      updateGameDisplay("Enter your name");
    else if (currentPlayer !== playerO) {
      updateGameDisplay(`${playerName}'s Turn`);
      gameStatus = "playing";
    }
    const selectedOpponent = document.querySelector('input[name="selectedOpponent"]:checked');
    if ((selectedOpponent.value === 'synthetic') && (currentPlayer !== playerO)) {
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