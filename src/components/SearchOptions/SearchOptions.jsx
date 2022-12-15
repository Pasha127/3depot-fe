import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image,Modal } from "react-bootstrap";
import "./styles.css"
import {BsFillImageFill,BsPersonBoundingBox } from "react-icons/bs";
import { connect } from "react-redux";
import { getMeWithThunk } from "../../redux/actions";


const SearchOptions = ()=>{
    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); window.scrollTo(0,0)};
    const handleShow = () => setShow(true);
  
return(<>
{/* <div className="options-container">
    <h4>^^OPTIONS^^</h4>
</div>
 */}
<Button variant="outline-secondary" className="options-container" onClick={handleShow}>
<div>OPTIONS</div>
      </Button>

      <Modal show={show} onHide={()=>{handleClose()}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Search options
        </Modal.Body>
      
      </Modal>
</>)
}
export default SearchOptions;