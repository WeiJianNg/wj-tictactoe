export default (state = { selected: false, mode: "" }, action) => {
  switch (action.type) {
    case "UPDATE_GAMEMODE":
      return {
        selected: action.payload.selected,
        mode: action.payload.mode,
      };
    default:
      return state;
  }
};
