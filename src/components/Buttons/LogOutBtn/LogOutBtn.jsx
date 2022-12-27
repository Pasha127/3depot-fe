import React from "react";
import { Button } from "react-bootstrap";
import "./styles.css"


const LogOutBtn = (props)=>{
    
return(<>
    <Button variant="outline-secondary end-button"
    onClick={()=>{props.logOut()}}>
        Log Out
    </Button>
</>)
}
export default LogOutBtn;