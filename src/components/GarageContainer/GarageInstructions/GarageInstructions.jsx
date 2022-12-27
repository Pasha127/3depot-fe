import React, { useState } from "react";
import { useEffect } from "react";
import "./styles.css"

const GarageInstructions = (props) =>{
    const [clickClass, setClickClass] = useState("");
    const seenModal = ()=>{
        const seenInstructions = sessionStorage.getItem('seenInstructions')
        if(seenInstructions){
            return true
        }
        return false
    }
    useEffect(()=>{
        seenModal() && setClickClass("d-none");
        },[])
        
    return(
        <div className={`instruction-container + ${clickClass}`}>
            <div className={`instructionSVG + ${clickClass}`} onClick={()=>{
                setClickClass("d-none");
                sessionStorage.setItem('seenInstructions', true)
            }}>
            </div>
        </div>
       )
}

export default GarageInstructions;