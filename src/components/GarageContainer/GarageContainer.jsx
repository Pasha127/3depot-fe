import React, { useCallback, useState } from "react";
import { lazy } from "react";
import { Suspense } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader2D from "../loader/Loader2D";
import Search from "../search/Search";
import "./styles.css"
import Garage from "../Garage/Garage";
import GeneralNavbar from "../navbar/GeneralNavbar";
import AxesBtn from "../AxesBtn/AxesBtn";

const GarageContainer = (props)=>{
const [showAxes, setShowAxes] = useState(false);
const [axesSize, setAxesSize] = useState(1);
const [clickClass, setClickClass] = useState("");



return(<>
<Suspense fallback={<Loader2D/>}>
    <GeneralNavbar></GeneralNavbar>
    <AxesBtn showAxes={showAxes} setShowAxes={setShowAxes} axesSize={axesSize} setAxesSize={setAxesSize} />
    <Garage showAxes={showAxes} axesSize={axesSize}/>
    <div className={`instruction-container + ${clickClass}`}>
    <div className={`instructionSVG + ${clickClass}`} onClick={()=>{
        setClickClass("invisible")
    }}></div></div>
</Suspense>
</>)
}
export default GarageContainer;