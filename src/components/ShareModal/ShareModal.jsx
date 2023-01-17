import { set } from "date-fns";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Envelope, Facebook, Instagram, Messenger, Signal, Telegram, Upload, Whatsapp, XCircleFill } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getChatByIdWithThunk, getHistoryWithThunk, setLoading } from "../../lib/redux/actions";
import Loader2D from "../loader/Loader2D";
import UserMini from "../user/user-mini/userMini";
import { socket } from "../SocketManager/SocketManager";
import "./styles.css"
const mapStateToProps = state => {
    return {
    isLoading: state.isLoading,
    user: state.userInfo,
    history: state.chats.list,
    activeChat: state.chats.active,
    onlineUsers: state.onlineUsers,
    recentMsg: state.recentMessage
    };
  };
   const mapDispatchToProps = dispatch => {
    return {
       setIsLoading: (bool)=> {
        dispatch(setLoading(bool));
      },
      getHistory: ()=> {
        dispatch(getHistoryWithThunk());
      },
      getChatById: (id)=> {
        dispatch(getChatByIdWithThunk(id));
      }    
    };  
  };
  

const ShareModal = (props)=>{
    const navigate = useNavigate();
    const goToChat = () => navigate("/Chat");
    const [show, setShow] = useState(false);
    const [sendMsg, setSendMsg] = useState(false);
    const [modelName, setModelName] = useState("placeholder");
    const [currentURL, setCurrentURL] = useState("");
    const location = useLocation();
    const[addFriendsClass,setAddFriendsClass] = useState("add-friends-show");


    const getRelevantChatForPerson = (targetPerson) =>{      
        const relevantChat = props.history.find(chat => {
          return chat.members.some(member=>{
            return member._id === targetPerson._id
          })
        })  
        props.getChatById(relevantChat._id);
      }

    const handleUpload = () =>{
        props.setIsLoading(true);
        handleClose();  
    }
    
    const copyCurrentUrl = ()=>{
        navigator.clipboard.writeText(currentURL);
    }

    const handleClose = () => {
        setShow(false);
        props.setShowShare(false) 
        window.scrollTo(0,0);         
    };


const handleShow = () => {
    setShow(true);
    copyCurrentUrl()
}

const handleContactClick = ()=>{
    console.log(props.activeChat)
    setAddFriendsClass("add-friends-show");
    const newMessage= {
        "members": [props.activeChat.members[0]._id,props.activeChat.members[1]._id],
        "message":
        {"sender": props.user._id,
        "content":{
          "text": currentURL,
          "media": ""
        }
      }      
    }
    socket.emit("sendMessage", { message: newMessage })
    goToChat();
      }

useEffect(()=>{
    props.show && handleShow()
},[props.show])

useEffect(()=>{
    props.getHistory()
  },[])

  useEffect(()=>{
    if(sendMsg && props.activeChat.members){
        handleContactClick();
        setSendMsg(false);
    }
  },[sendMsg, props.activeChat.members])

useEffect(()=>{
    setCurrentURL(`https://3Depot.org${location.pathname}`)
  },[location])

return(<>
<Modal  show={show} onHide={()=>{handleClose(); localStorage.setItem('acceptedCookies','true');}} >
    <Modal.Header closeButton className="upload-modal-header">
      <Modal.Title>Share</Modal.Title>
      <XCircleFill className="modal-close-x"/>
    </Modal.Header>
    <Modal.Body>
            <h3>Link copied!</h3>
            <p className="modal-section-head">Go to:</p>
            <div className="messenger-icons">
            <a className="share-link-icon" target="_blank" rel="noreferrer" href="https://www.facebook.com/messages/"> <Messenger onClick={copyCurrentUrl}/> </a> 
            <a className="share-link-icon" target="_blank" rel="noreferrer" href="https://www.whatsapp.com/"> <Whatsapp onClick={copyCurrentUrl}/> </a> 
            <a className="share-link-icon" target="_blank" rel="noreferrer" href="https://www.instagram.com/direct/inbox/"> <Instagram onClick={copyCurrentUrl}/> </a>
            <a className="share-link-icon" target="_blank" rel="noreferrer" href="https://www.facebook.com/"> <Facebook onClick={copyCurrentUrl}/> </a>
            <a className="share-link-icon" target="_blank" rel="noreferrer" href="https://signal.org/en/"> <Signal onClick={copyCurrentUrl}/> </a> 
            <a className="share-link-icon" target="_blank" rel="noreferrer" href="https://telegram.org/"> <Telegram onClick={copyCurrentUrl}/> </a> 
            </div>
            {!props.user?._id && <p className="modal-section-head">Log in to send direct messages!</p>}
            {props.user?._id && <p className="modal-section-head">Send 3Depot message:</p>}
            {props.user?._id && <div className="tDepot-convo-container">
                {props.history.slice()
                .sort((a, b) => new Date(b.messages[b.messages.length-1].createdAt) - new Date(a.messages[a.messages.length-1].createdAt))
                .map(chat => {
                const person = chat.members.find(member => member._id !== props.user._id) 
                return (<div  key={`${person._id} chat`} onClick={()=>{setSendMsg(true)}}>
                <UserMini person={person} thisChat={chat} getChat={getRelevantChatForPerson}/>
                </div>)
                })
                }
            </div>}
            
    </Modal.Body>  
  </Modal>
 </>)
}
export default connect(mapStateToProps, mapDispatchToProps)(ShareModal);