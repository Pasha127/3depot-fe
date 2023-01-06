import React, { useState } from "react";
import { useEffect } from "react";
import { X } from "react-bootstrap-icons";
import "./styles.css"

const GarageInstructions = (props) =>{
    const [containerState, setContainerState] = useState("instruction-container");
    const seenModal = ()=>{
        const seenInstructions = sessionStorage.getItem('seenInstructions')
        if(seenInstructions){
            return true
        }
        return false
    }
    useEffect(()=>{
        seenModal() && setContainerState("d-none");
        },[])
        
    return(<>
    <div className={containerState}>
            <div className={`instruction-border `} onClick={()=>{
                setContainerState("instruction-container-close");
                sessionStorage.setItem('seenInstructions', true)
            }}>
                <X className="instructions-tray-close-icon"/>
            </div>
        <div className={`instruction-details`}>
        <p>Camera Controls</p> 
            <div className={`instructionSVG`} onClick={()=>{
                setContainerState("instruction-container-close");
                sessionStorage.setItem('seenInstructions', true)
            }}>
            </div>
        </div>
    </div>
        </>)
}

export default GarageInstructions;