export default (state = Array(9).fill(null), action) => {
  switch (action.type) {
    case "UPDATE_GAMESTATE":
      return action.payload.updatedBoard;
    default:
      return state;
  }
};
