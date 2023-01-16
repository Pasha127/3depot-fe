import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import "./styles.css"


const UploadModal = (props)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        props.setShowUpload(false) 
        window.scrollTo(0,0);         
    };

    const showModal = ()=>{
        if(props.show){
            return true    
        }
        return false
    }
    

const handleShow = () => setShow(true);


useEffect(()=>{
showModal() && handleShow();
},[])

return(<>
<Modal show={show} onHide={()=>{handleClose(); localStorage.setItem('acceptedCookies','true');}} centered>
    <Modal.Header closeButton className="bg-dark text-light">
      <Modal.Title>Upload</Modal.Title>
      <XCircleFill className="modal-close-x"/>
    </Modal.Header>
    <Modal.Body>
        <div className="filetype-buttons">
        <Button variant="outline-dark">OBJ</Button>
        </div>
    </Modal.Body>  
  </Modal>
</>)
}
export default UploadModal;