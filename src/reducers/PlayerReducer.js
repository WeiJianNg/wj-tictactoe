export default (state = "o", action) => {
  switch (action.type) {
    case "UPDATE_GAMESTATE":
      return action.payload.playerTurn;
    default:
      return state;
  }
};
