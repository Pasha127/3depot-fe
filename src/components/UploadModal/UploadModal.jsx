import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Upload, XCircleFill } from "react-bootstrap-icons";
import "./styles.css"


const UploadModal = (props)=>{
    const tenMB = 10485760;
    const [show, setShow] = useState(false);
    const [tooLarge, setTooLarge] = useState("d-none");
    const [fileType, setFileType] = useState("");
    const [objClick, setObjClick] = useState("");
    const [fbxClick, setFbxClick] = useState("");
    const [gltfClick, setGltfClick] = useState("");
    const [modelName, setModelName] = useState("");
    const [keywords, setKeywords] = useState("");
    const [modelDescription, setModelDescription] = useState("");
    const [formCoverPosition, setFormCoverPosition] = useState("form-cover1");
    const fbxBtn = useRef(null)
    const objBtn = useRef(null)
    const gltfBtn = useRef(null)
    const [uploadedModel, setUploadedModel] = useState(null);
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

const handleFileTypes = (e)=>{
    if(e.target === fbxBtn.current){
        setFbxClick("filetype-clicked");
        setObjClick("");
        setGltfClick("");
        setFileType("fbx")
    }
    if(e.target === objBtn.current){
        setObjClick("filetype-clicked");
        setFbxClick("");
        setGltfClick("");
        setFileType("obj")
    }
    if(e.target === gltfBtn.current){
        setGltfClick("filetype-clicked");
        setObjClick("");
        setFbxClick("");
        setFileType("gltf")
    }
}

useEffect(()=>{
    showModal() && handleShow();
},[props.show])

useEffect(()=>{
    if(uploadedModel?.size > tenMB) {
        setTooLarge("too-large-label")
        setUploadedModel(null)
        alert("We apologize, but files must be below 10MB in size for now.")
        return
    }
},[uploadedModel])

useEffect(()=>{
    
    if(!fileType){
        setFormCoverPosition('form-cover1');
        return;
    };
    if(fileType && !uploadedModel){
        setFormCoverPosition('form-cover2');
        return;
    };
    if(fileType && uploadedModel && !modelName){
        setFormCoverPosition('form-cover3');
        return;
    };
    if(fileType && uploadedModel && modelName && !keywords){
        setFormCoverPosition('form-cover4');
        return;
    };
    if(fileType && uploadedModel && modelName && keywords){
        setFormCoverPosition('d-none');
        return;
    };
},[fileType, uploadedModel, modelName, keywords])

return(<>
<Modal  show={show} onHide={()=>{handleClose(); localStorage.setItem('acceptedCookies','true');}} >
    <Modal.Header closeButton className="upload-modal-header">
      <Modal.Title>Upload</Modal.Title>
      <XCircleFill className="modal-close-x"/>
    </Modal.Header>
    <Modal.Body>
            <p>File type:</p>
        <div className="filetype-buttons">
        <Button ref={objBtn} className={`filetype-btn ${objClick}`} variant="outline-dark" onClick={(e)=>{handleFileTypes(e)}}>OBJ</Button>
        <Button ref={fbxBtn} className={`filetype-btn ${fbxClick}`} variant="outline-dark" onClick={(e)=>{handleFileTypes(e)}}>FBX</Button>
        <Button ref={gltfBtn} className={`filetype-btn ${gltfClick}`} variant="outline-dark" onClick={(e)=>{handleFileTypes(e)}}>GLTF</Button>
        </div>
            <p className="mt-3">Upload Zip:</p>
            <div className="upload-zip-section">
                <div className="upload-filename">
                <div className={tooLarge}>File too large</div>
              <input type="file" className="" id="modelUploadBtn" 
                  onChange={(e)=>{setUploadedModel(e.target.files[0]); setTooLarge("d-none")}}></input>
                </div>
            </div>
            <p className="mt-3">Model Name:</p>
            <input placeholder="Default Cube" value={modelName} type="text" className="model-name" onChange={(e)=>{setModelName(e.target.value)}}/>
            <p className="mt-3">Keywords:</p>
            <input placeholder="humanoid low-poly blender..." type="text" className="model-name" value={keywords} onChange={(e)=>{setKeywords(e.target.value)}}/>
            <p className="mt-3">Model Description:</p>
            <textarea placeholder="Additional info.." className="model-description" value={modelDescription} onChange={(e)=>{setModelDescription(e.target.value)}}/>
            <div className="send-file-container">
                <div className="upload-button-back">
                    <Upload/>⠀Upload
                </div>
            </div>
            <div className={formCoverPosition}></div>
    </Modal.Body>  
  </Modal>
</>)
}
export default UploadModal;