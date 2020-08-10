import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";

import playersIcon from "./2players.png";
import botIcon from "./bot.png";
import { selectMode } from "../../actions";

const ModeModal = ({ selected, selectMode }) => {
  return (
    <Modal
      show={!selected}
      animation={false}
      backdrop="static"
      size="lg"
      centered
    >
      <Modal.Header>
        <div className="modal-header">Please Select Game Mode</div>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid modal-body">
          <div className="row">
            <div
              className="col-6 d-block gameMode"
              onClick={() => {
                selectMode("playerMode");
              }}
            >
              <img src={playersIcon} width="75%" alt="" />
              <div className="gameModeTitle">
                <h6 className="m-0">2-Players</h6>
              </div>
            </div>
            <div
              className="col-6 d-block gameMode"
              onClick={() => {
                selectMode("botMode");
              }}
            >
              <img src={botIcon} width="75%" alt="" />
              <div className="gameModeTitle">
                <h6 className="m-0">Bot</h6>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return { selected: state.gameMode.selected };
};
export default connect(mapStateToProps, { selectMode })(ModeModal);
