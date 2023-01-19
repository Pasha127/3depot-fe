import React, { useState } from "react";
import "./styles.css"
import { ChevronDoubleDown, Download, Share, Trash, Upload } from "react-bootstrap-icons";
import UploadModal from "../../UploadModal/UploadModal";
import DeleteModal from "../../DeleteModelModal/DeleteModelModal";
import ShareModal from "../../ShareModal/ShareModal";


const ActionBtns = (props)=>{
    const [showUpload, setShowUpload] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [actionClass, setActionClass] = useState("action-toggle-square");
    const [deleteClass, setDeleteClass] = useState("delete-button-hide");
    const [uploadClass, setUploadClass] = useState("upload-button-hide");
    const [downloadClass, setDownloadClass] = useState("download-button-hide");
    const [shareClass, setShareClass] = useState("share-button-hide");
    const [actionIcons, setActionIcons] = useState("action-icons");
    const [actionIconsContract, setActionIconsContract] = useState("d-none");

    const handleToggle = () =>{
        if (actionClass === "action-toggle-square"){
            setActionClass("action-toggle-clicked2");
            setDeleteClass("delete-button-show action-btn-text");
            setUploadClass("upload-button-show action-btn-text");
            setDownloadClass("download-button-show action-btn-text");
            setShareClass("share-button-show action-btn-text");
            setActionIcons("d-none");
            setActionIconsContract("action-icons-contracted");
        }
        else{
            setActionClass("action-toggle-square");
            setDeleteClass("delete-button-hide");
            setUploadClass("upload-button-hide");
            setDownloadClass("download-button-hide");
            setShareClass("share-button-hide");
            setActionIcons("action-icons");
            setActionIconsContract("d-none");
        }
    }

return(<>
    <div className="action-toggle-container">
    <button className={`${actionClass}`}
    onClick={(e)=>{
        e.stopPropagation();
        handleToggle();
        console.log("click");
    }}>
        <div className={actionIcons}>
        <Trash/>⠀<Upload/>⠀<Download/>⠀<Share/>
        </div>
        <div className={actionIconsContract}>
        <ChevronDoubleDown/>
        </div>
    </button>
    <div className={deleteClass} onClick={(e)=>{setShowDelete(true)}}>       
        <div className="trash-icon-action"><Trash/></div>
        <div className="delete-button-circle">
            <div className="initial-action-text">Delete Model</div>
        </div>
    </div>
    <div className={uploadClass } onClick={(e)=>{setShowUpload(true); console.log("click in event")}}>
        <div className="upload-icon-action"><Upload/></div>
         <div className="upload-button-circle">
            <p className="initial-action-text">Upload Model</p>
         </div>
    </div>
    <div className={downloadClass }>
    <a className="action-btn-text" href="https://res.cloudinary.com/dirwjcohx/raw/upload/v1670880728/3DepotProducts/Sci-fi_Rifle_2_qu1tv8.fbx">
        <div className="download-icon-action"><Download/></div></a>
         <div className="download-button-circle" >
            <p className="initial-action-text">Download Model</p>
         </div>
    </div>
    <div className={shareClass } onClick={(e)=>{setShowShare(true)}}>
        <div className="share-icon-action"><Share/></div>
       <div className="share-button-circle">
        <p className="initial-action-text">Share Model</p>
       </div>
    </div>
    
    </div> 
    <UploadModal show={showUpload} setShowUpload={setShowUpload}/>       
    <DeleteModal show={showDelete} setShowDelete={setShowDelete}/>      
    <ShareModal show={showShare} setShowShare={setShowShare}/>      
</>)
}
export default ActionBtns;