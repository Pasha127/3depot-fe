import { set } from "date-fns";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Upload, XCircleFill } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../lib/redux/actions";
import Loader2D from "../loader/Loader2D";
import "./styles.css"
const mapStateToProps = state => {
    return {
    isLoading: state.isLoading
    };
  };
   const mapDispatchToProps = dispatch => {
    return {
       setIsLoading: (bool)=> {
        dispatch(setLoading(bool));
      }    
    };  
  };
  

const DeleteModelModal = (props)=>{
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const goToLogin = () => navigate("/LogIn");
    
    const handleDelete = () =>{
        props.setIsLoading(true); 
        handleClose();
    }

    const handleClose = () => {
        setShow(false);
        props.setShowDelete(false) 
        window.scrollTo(0,0); 
              
    };  

const handleShow = () => setShow(true);



useEffect(()=>{
    props.show && handleShow()
},[props.show])



return(<>
<Modal  show={show} onHide={()=>{handleClose(); localStorage.setItem('acceptedCookies','true');}} >
    <Modal.Header closeButton className="upload-modal-header">
      <Modal.Title>Attention!</Modal.Title>
      <XCircleFill className="modal-close-x"/>
    </Modal.Header>
    <Modal.Body>
           <h4>Are you sure you want to delete this model?</h4>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </Modal.Footer> 
    <div className={"form-cover-0"}></div>
    {!props.user?._id && <h3 className="log-in-msg" onClick={goToLogin}>Log-in Required </h3>} 
  </Modal>
 </>)
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteModelModal);