import React, { useState } from "react";
import { Suspense } from "react";
import "./styles.css"
import Garage from "../Garage/Garage";
import CookieModal from "../CookieModal/CookieModal";
import GarageInstructions from "./GarageInstructions/GarageInstructions";
import GeneralNavbar from "../navbar/GeneralNavbar";
import ActionBtns from "../Buttons/ActionBtns/ActionBtns";
import TogglesTab from "../Buttons/GarageSideButtons/RightSideButtons/Toggles/TogglesTab";
import InfoTab from "../Buttons/GarageSideButtons/RightSideButtons/InfoTab/InfoTab";
import ModelsTab from "../Buttons/GarageSideButtons/RightSideButtons/ModelsTab/ModelsTab";
import { setSettings } from "../../lib/redux/actions";
import { connect } from "react-redux";
import InstructionsTab from "../Buttons/GarageSideButtons/RightSideButtons/InstructionsTab/InstructionsTab";
const mapStateToProps = state => {
    return {
    settings: state.garageSettings
    };
  };
   const mapDispatchToProps = dispatch => {
    return {
      logOut: (settings)=> {
        dispatch(setSettings(settings));
      }     
    };  
  };
const GarageContainer = (props)=>{
return(<>
<Suspense >
    <GeneralNavbar/>
    <TogglesTab />
    <InfoTab/>
    <ModelsTab/>
    <InstructionsTab/>
    <Garage/>
    <GarageInstructions/>
    <ActionBtns/>
</Suspense>
<CookieModal/>
</>)
}
export default connect(mapStateToProps, mapDispatchToProps)(GarageContainer);