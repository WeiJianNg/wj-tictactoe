import React, { useEffect } from "react";
import { connect } from "react-redux";
import { resetBoard, selectMode } from "../../actions";

const StatusBar = ({ player, winStatus, resetBoard, selectMode }) => {
  let gameStatus = "";

  useEffect(() => {
    if (winStatus.win === true) {
      gameStatus = `Player ${winStatus.winner.toUpperCase()} won the Game!`;
      setTimeout(() => {
        window.alert(gameStatus);
      }, 50);
    } else if (winStatus.win === false && winStatus.winner === "nobody") {
      gameStatus = `Game is a Tie`;
      setTimeout(() => {
        window.alert(gameStatus);
      }, 50);
    } else {
      gameStatus = `Player ${player.toUpperCase()}'s Turn`;
    }
  }, [winStatus]);

  if (winStatus.win === true) {
    gameStatus = `Player ${winStatus.winner.toUpperCase()} won the Game!`;
  } else if (winStatus.win === false && winStatus.winner === "nobody") {
    gameStatus = `Game is a Tie`;
  } else {
    gameStatus = `Player ${player.toUpperCase()}'s Turn`;
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center tic-tac-toe-header ">
        <span className="tic-tac-toe-title text-center p-0">
          Tic Tac Toe: Built using React
        </span>
      </div>
      <div className="status status-board container">
        <div className="row h-100">
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <span className="status-text">Game Status: {gameStatus}</span>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
            <div
              class="btn-group btn-group btn-group-sm"
              role="group"
              aria-label="..."
            >
              {" "}
              <button
                type="button"
                className="btn btn-primary"
                onClick={resetBoard}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  selectMode(null);
                }}
              >
                Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return { player: state.player, winStatus: state.winStatus };
};

export default connect(mapStateToProp, { resetBoard, selectMode })(StatusBar);
