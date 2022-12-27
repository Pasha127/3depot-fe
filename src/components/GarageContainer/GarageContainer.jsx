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

const GarageContainer = (props)=>{
const [showAxes, setShowAxes] = useState(false);
const [axesSize, setAxesSize] = useState(1);

return(<>
<Suspense >
    <GeneralNavbar/>
    <TogglesTab showAxes={showAxes} setShowAxes={setShowAxes} axesSize={axesSize} setAxesSize={setAxesSize}/>
    <InfoTab/>
    <ModelsTab/>
    <Garage showAxes={showAxes} axesSize={axesSize}/>
    <GarageInstructions/>
    <ActionBtns/>
</Suspense>
<CookieModal/>
</>)
}
export default GarageContainer;