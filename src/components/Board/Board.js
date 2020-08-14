import React, { useEffect, createRef } from "react";
import { updateGameState, checkWinner } from "../../actions/index";
import { connect } from "react-redux";

const Board = ({
  board,
  updateGameState,
  player,
  checkWinner,
  winStatus,
  gameMode,
}) => {
  useEffect(() => {
    checkWinner(board);
  }, [board, checkWinner]);

  return (
    <div className="d-flex" style={{ minHeight: "70vh" }}>
      <div className="container-fluid">
        <div className="container-fluid h-100">
          {[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
          ].map((positions, index) => {
            return (
              <div
                key={`row_${index}`}
                className="row d-flex justify-content-center board-row"
              >
                {positions.map((elm) => {
                  const tile = createRef();
                  return (
                    <div
                      key={"tile_" + elm}
                      className="col-3 tiles"
                      onClick={() => {
                        if (board[elm] === null && winStatus.win === false) {
                          updateGameState(player, board, elm, gameMode);
                        }
                      }}
                    >
                      <div
                        ref={tile}
                        className={
                          board[elm] !== null
                            ? board[elm] === "o"
                              ? "player-o"
                              : "player-x"
                            : ""
                        }
                      ></div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    board: state.board,
    player: state.player,
    winStatus: state.winStatus,
    gameMode: state.gameMode.mode,
  };
};

export default connect(mapStateToProps, { updateGameState, checkWinner })(
  Board
);
