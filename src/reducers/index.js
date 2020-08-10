import { combineReducers } from "redux";

import BoardReducer from "./BoardReducer";
import PlayerReducer from "./PlayerReducer";
import GameStateReducer from "./GameStateReducer";
import GameModeReducer from "./GameModeReducer";

export default combineReducers({
  board: BoardReducer,
  player: PlayerReducer,
  winStatus: GameStateReducer,
  gameMode: GameModeReducer,
});
