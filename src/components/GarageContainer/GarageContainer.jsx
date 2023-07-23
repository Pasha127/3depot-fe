import React, { useState } from "react";
import { Suspense } from "react";
import "./styles.css";
import Garage from "../Garage/Garage";
import CookieModal from "../CookieModal/CookieModal";
import GarageInstructions from "./GarageInstructions/GarageInstructions";
import GeneralNavbar from "../navbar/GeneralNavbar";
import ActionBtns from "../Buttons/ActionBtns/ActionBtns";
import TogglesTab from "../Buttons/GarageSideButtons/RightSideButtons/Toggles/TogglesTab";
import InfoTab from "../Buttons/GarageSideButtons/RightSideButtons/InfoTab/InfoTab";
import ModelsTab from "../Buttons/GarageSideButtons/RightSideButtons/ModelsTab/ModelsTab";
import { setFilters, setSettings } from "../../lib/redux/actions";
import { connect } from "react-redux";
import InstructionsTab from "../Buttons/GarageSideButtons/RightSideButtons/InstructionsTab/InstructionsTab";
import GarageFooter from "../footer/GarageFooter";
import { useEffect } from "react";
import CommentTab from "../Buttons/GarageSideButtons/CommentTab/CommentTab";
const mapStateToProps = (state) => {
  return {
    settings: state.garageSettings,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (settings) => {
      dispatch(setSettings(settings));
    },
    setFilters: (filterState) => {
      dispatch(setFilters(filterState));
    },
  };
};
const GarageContainer = (props) => {
  useEffect(() => {
    props.setFilters(false);
  }, []);

  return (
    <div className="garage-container">
      <GeneralNavbar />
      <Suspense>
        <div className="garage-UI">
          <TogglesTab />
          <InfoTab />
          <ModelsTab />
          <CommentTab />
          <InstructionsTab />
          <Garage />
          <GarageInstructions />
          <ActionBtns />
        </div>
      </Suspense>
      <GarageFooter />
      <CookieModal />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(GarageContainer);
