import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../../../../lib/redux/actions";
import {
  Boxes,
  QuestionCircle,
  QuestionCircleFill,
  X,
} from "react-bootstrap-icons";
import { useState } from "react";
import useDragEffect from "../../../../../lib/hooks/useDragEffect";
const mapStateToProps = (state) => {
  return {
    user: state.userInfo,
    showGarage: state.isGarage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOutWithThunk());
    },
  };
};
const InstructionsTab = (props) => {
  useDragEffect("instructions-tray");
  const [trayState, setTrayState] = useState("instructions-tray-closed");
  const handleToggle = () => {
    if (trayState === "instructions-tray-closed") {
      setTrayState("instructions-tray");
    } else {
      setTrayState("instructions-tray-closed");
    }
  };
  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
          console.log("click");
        }}
        className="instructions-tab"
        variant="outline-secondary"
      >
        <div className="instructions-icon-container">
          <QuestionCircle />
          <div className="instructions-label">Controls</div>
        </div>
      </Button>
      <div className="drag-container">
        <div id="instructions-tray" className={trayState}>
          <div
            className="instructions-tray-details"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p>Camera Controls</p>
          </div>
          <X
            className="instructions-tray-close-icon"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
              console.log("click");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructionsTab);
