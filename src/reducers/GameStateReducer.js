export default (state = { win: false, winner: null }, action) => {
  switch (action.type) {
    case "CHECK_GAMESTATE":
      return {
        win: action.payload.win,
        winner: action.payload.winner,
      };
    default:
      return state;
  }
};
