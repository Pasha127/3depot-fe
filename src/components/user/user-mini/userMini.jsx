import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "../styles.css";
import { connect } from "react-redux";
import { joinRoom, socket } from "../../SocketManager/SocketManager";
import { deleteChatByIdWithThunk, setActiveChat, setChats, setLoading } from "../../../lib/redux/actions";
import { Trash } from "react-bootstrap-icons";
const defaultAvatar = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

const mapStateToProps = state => {
  return {
  user: state.userInfo,
  history: state.chats.list,
  activeChat: state.chats.active,
  onlineUsers: state.onlineUsers,
  recentMsg: state.recentMessage,
  isLoading: state.isLoading
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setActiveChatHistory: (chat)=>{
      dispatch(setActiveChat(chat))
    },
    deleteChat: (chatId)=>{
      dispatch(deleteChatByIdWithThunk(chatId))
    },
    setLoading: (loadBool)=>{
      dispatch(setLoading(loadBool))
    } 
  };  
}; 

/* const JoinRelevantChat = (history, person)=>{
  const relevantChat = history.find(chat => {
    return chat.members.some(member=>{
      return member._id === person._id
    })
  })
  joinRoom(person._id, relevantChat)
} */


const UserMini = (props) => {
  
  const [isOnline, setIsOnline] = useState(false);
  const [chatPreviewLine, setChatPreviewLine] = useState("");
  const [seenState, setSeenState] = useState("tab-body-seen");
  
  useEffect(()=>{
    joinRoom(props.person._id, props.thisChat);
  },[])

  useEffect(()=>{
    /*  console.log("onlineUsers",props.onlineUsers) */
    const users = props.onlineUsers.map(user => {return(user._id)})
    if(users.includes(props.person._id)){setIsOnline(true)}else{setIsOnline(false)}
  },[props.onlineUsers])

  const findRelevantChatWithRedux = () =>{
    const relevantChat = props.history.find(chat => {
      return chat.members.some(member=>{
        return member._id === props.person._id
      })
    })
    return relevantChat
  }
  
  const chatPreview = () =>{
    const relevantChat = props.thisChat
    if(relevantChat.messages.length){const messagePreview = relevantChat.messages[relevantChat.messages.length - 1].content.text;
    return messagePreview }
    else{return "..."}
  }

  useEffect(()=>{
      if(props.recentMsg.members.find(member => member !== props.user._id) === props.thisChat.members.find(member => member !== props.user._id)) setChatPreviewLine(props.recentMsg.message?.content.text);    
      console.log("recent Chat: ",props.recentMsg.members, props.user._id, props.person._id, props.thisChat.members);
  },[props.recentMsg.message])
  
  
  useState(()=>{
    setChatPreviewLine(chatPreview())
    console.log("recent",props.recentMsg)
  })

  useEffect(() => {
    socket.on("newMessage", receivedMessage => {
      const newEntry = {...receivedMessage, createdAt: new Date()}
      props.person._id === newEntry.sender && setChatPreviewLine(newEntry.content.text)
      props.thisChat.members.some(member => member._id === newEntry.sender) && setSeenState("tab-body-unseen")
      newEntry.sender === props.user._id && setSeenState("tab-body-seen")
    });
    
  }, [socket, seenState, props.thisChat, props.user._id]);

  

  return (
    <Row className={seenState}
    onClick={()=>{props.getChat(props.person); setSeenState("tab-body-seen")}}>
      <Col xs={2}>
        <Image className="chat-head" src={props.person.avatar} onError={(e)=>{e.target.src = defaultAvatar}} alt={"UserAvatar"} roundedCircle />
        {isOnline && <div className="online"></div>}
        {!isOnline && <div className="offline"></div>}
      </Col>
      {props.activeChat?._id !== props.thisChat._id ? 
      <Col className="inactive-user">
        <h6 className="truncate m-0 ">{props.person.email.split("@")[0]}</h6>
           <div className="truncate">"{`${chatPreviewLine}`}"</div>
      </Col>:
      <Col className="highlighted-user">
        <h6 className="truncate m-0 ">{props.person.email.split("@")[0]}</h6>
      </Col>} 
      <Trash className="delete-chat" onClick={(e)=>{
        e.stopPropagation();
        props.deleteChat(findRelevantChatWithRedux()._id);
        window.location.reload()
      }
      }/>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMini);
