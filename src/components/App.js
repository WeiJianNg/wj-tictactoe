import React from "react";

import Board from "./Board/Board";
import StatusBar from "./StatusBar/StatusBar";
import ModeModal from "./ModeModal/ModeModal";

const App = () => {
  return (
    <div className="main">
      <StatusBar />
      <ModeModal />
      <Board />
    </div>
  );
};

export default App;
