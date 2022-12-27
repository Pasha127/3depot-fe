import React, { useState } from "react";
import deleteButton from "../../../assets/Delete.svg"
import uploadButton from "../../../assets/Upload.svg"
import downloadButton from "../../../assets/Download.svg"
import shareButton from "../../../assets/Share.svg"
import "./styles.css"
import { ChevronDoubleDown, Download, Share, Trash, Upload } from "react-bootstrap-icons";


const ActionBtns = (props)=>{
    const [actionClass, setActionClass] = useState("action-toggle-square")
    const [deleteClass, setDeleteClass] = useState("delete-button-hide")
    const [uploadClass, setUploadClass] = useState("upload-button-hide")
    const [downloadClass, setDownloadClass] = useState("download-button-hide")
    const [shareClass, setShareClass] = useState("share-button-hide")
    const [actionIcons, setActionIcons] = useState("action-icons")
    const [actionIconsContract, setActionIconsContract] = useState("d-none")

    const handleToggle = () =>{
        if (actionClass === "action-toggle-square"){
            setActionClass("action-toggle-clicked2")
            setDeleteClass("delete-button-show")
            setUploadClass("upload-button-show")
            setDownloadClass("download-button-show")
            setShareClass("share-button-show")
            setActionIconsContract("action-icons2")
            setActionIcons("d-none")
        }
        else{
            setActionClass("action-toggle-square")
            setDeleteClass("delete-button-hide")
            setUploadClass("upload-button-hide")
            setDownloadClass("download-button-hide")
            setShareClass("share-button-hide")
            setActionIcons("action-icons")
            setActionIconsContract("d-none")
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
    <div className={deleteClass}>
        <img src={deleteButton} alt="delete-button"/>
        <div className="trash-icon-action"><Trash/></div>
    </div>
    <div className={uploadClass}>
        <img src={uploadButton} alt="upload-button"/>
        <div className="upload-icon-action"><Upload/></div>
    </div>
    <div className={downloadClass}>
        <img src={downloadButton} alt="download-button"/>
        <div className="download-icon-action"><Download/></div>
    </div>
    <div className={shareClass}>
        <img src={shareButton} alt="share-button"/>
        <div className="share-icon-action"><Share/></div>
    </div>
    
    </div>        
</>)
}
export default ActionBtns;