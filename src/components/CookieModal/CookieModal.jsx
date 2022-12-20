import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Button, Container, Form, Row,Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
      <Modal.Title>Cookies! 🍪 </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        This site uses cookies to keep you logged in and authorize requests to the server. 
        There are no third-party ad services connected to this site. 
        By staying on 3Depot you agree to the use of cookies required for functionality.  
    </Modal.Body>  
  </Modal>
</>)
}
export default CookieModal;