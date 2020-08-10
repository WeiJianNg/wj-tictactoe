// UPDATING Game Status
export const updateGameState = (player, board, position, gameMode) => {
  let updatedBoard = board.slice();
  updatedBoard[position] = player;
  if (gameMode === "playerMode") {
    let playerTurn = "";
    if (player === "x") {
      playerTurn = "o";
    } else {
      playerTurn = "x";
    }

    return {
      type: "UPDATE_GAMESTATE",
      payload: {
        updatedBoard: updatedBoard,
        playerTurn: playerTurn,
      },
    };
  } else {
    console.log("hello");
    updatedBoard[botMove(updatedBoard)] = "bot";
    return {
      type: "UPDATE_GAMESTATE",
      payload: {
        updatedBoard: updatedBoard,
        playerTurn: player,
      },
    };
  }
};

// Check Winning STATUS Including Tie.
// Check if any players won the game and return the status of the Game
// (i.e win or tie) and the player who won the game
export const checkWinner = (gameBoard) => {
  if (!gameBoard.includes(null)) {
    return {
      type: "CHECK_GAMESTATE",
      payload: { win: false, winner: "nobody" },
    };
  }

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    let [a, b, c] = winConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return {
        type: "CHECK_GAMESTATE",
        payload: { win: true, winner: gameBoard[a] },
      };
    }
  }
  return {
    type: "CHECK_GAMESTATE",
    payload: { win: false, winner: null },
  };
};

// ACTION to reset board by setting Board array to Zeroes
export const resetBoard = () => {
  return {
    type: "UPDATE_GAMESTATE",
    payload: {
      updatedBoard: Array(9).fill(null),
      playerTurn: "o",
    },
  };
};

// ACTION to allow player to select game mode
// Return
// SELECTED to check if the MODAL needs to be displayed and
// GAME MODE
export const selectMode = (mode) => {
  if (mode === null) {
    return {
      type: "UPDATE_GAMEMODE",
      payload: { selected: false, mode: mode },
    };
  }

  return {
    type: "UPDATE_GAMEMODE",
    payload: { selected: true, mode: mode },
  };
};

// BOT WINNING LOGIC
const botMove = (gameBoard) => {
  let isFirstMove = true;
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] !== null) {
      isFirstMove = false;
    }
  }

  //  Move if its first move
  if (isFirstMove) {
    // if its bot first move go for middle piece
    return 4;
  }

  // Find move that secures a win
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === null) {
      let tempGameBoard = gameBoard.slice();
      // test if move will secure win for X - Bot move
      tempGameBoard[i] = "bot";
      if (checkWinner(tempGameBoard).payload.win) {
        return i;
      }
    }
  }

  // Find move that prevent a win from player
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === null) {
      let tempGameBoard = gameBoard.slice();
      tempGameBoard[i] = "o";
      if (checkWinner(tempGameBoard).payload.win) {
        return i;
      }
    }
  }

  // Find middle move
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === null && i === 4) {
      return i;
    }
  }

  // Counter player's cross diagonal moves
  if (
    gameBoard.filter((elm) => {
      return elm !== null;
    }).length === 3 &&
    ((gameBoard[2] === "o" && gameBoard[6] === "o") ||
      (gameBoard[0] === "o" && gameBoard[8] === "o"))
  ) {
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === null && (i === 1 || i === 3 || i === 5 || i === 7)) {
        return i;
      }
    }
  }

  // Find Corner move
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === null && (i === 0 || i === 2 || i === 6 || i === 8)) {
      return i;
    }
  }

  // Find remaining move
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === null) {
      return i;
    }
  }
};
