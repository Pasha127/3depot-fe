import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import "./styles.css"


const CookieModal = (props)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false); 
        window.scrollTo(0,0); 
        
    };

    const showModal = ()=>{
        const cookiesAccepted = localStorage.getItem('acceptedCookies')
        if(cookiesAccepted){
            return false
        }
        return true
    }
    

const handleShow = () => setShow(true);


useEffect(()=>{
showModal() && handleShow();
},[])

return(<>
<Modal show={show} onHide={()=>{handleClose(); localStorage.setItem('acceptedCookies','true');}} centered>
    <Modal.Header closeButton className="bg-dark text-light">
      <Modal.Title>3Depot.org  </Modal.Title>
      <XCircleFill className="modal-close-x"/>
    </Modal.Header>
    <Modal.Body>
        {"Welcome to 3Depot (Alpha Release). We will be rolling out support for STL, OBJ and GLTF files shortly. This site uses cookies to keep you logged in and authorize requests to the server."}         
    </Modal.Body>  
  </Modal>
</>)
}
export default CookieModal;