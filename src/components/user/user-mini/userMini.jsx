import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "../styles.css";
import { connect } from "react-redux";
import { joinRoom } from "../../chat/Chat";
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

const JoinRelevantChat = (history, person)=>{
  const relevantChat = history.find(chat => {
    return chat.members.some(member=>{
      return member._id === person._id
    })
  })
  joinRoom(person._id, relevantChat)
}


const UserMini = (props) => {
  
  const [isOnline, setIsOnline] = useState(false);
  const [chatPreviewLine, setChatPreviewLine] = useState("");
  
  useEffect(()=>{
   /*  console.log("onlineUsers",props.onlineUsers) */
    const users = props.onlineUsers.map(user => {return(user._id)})
    if(users.includes(props.person._id)){setIsOnline(true)}else{setIsOnline(false)}
  },[props.onlineUsers, props.person._id])



  
  const findRelevantChatWithRedux = () =>{
    const relevantChat = props.history.find(chat => {
      return chat.members.some(member=>{
        return member._id === props.person._id
      })
    })
    return relevantChat
  }
  
  const chatPreview =() =>{
    const relevantChat = findRelevantChatWithRedux()
    if(relevantChat.messages.length){const messagePreview = relevantChat.messages[relevantChat.messages.length - 1].content.text;
    return messagePreview }
    else{return "..."}
  }
 
  useState(()=>{
    setChatPreviewLine(chatPreview())
    console.log("recent",props.recentMsg)
  })

  return (
    <Row className="tab-body m-0"
    onClick={()=>{props.getChat(props.person); JoinRelevantChat(props.history, props.person);  /* setChathistoryOnClick() */}}>
      <Col xs={2}>
        <Image className="chat-head" src={props.person.avatar} onError={(e)=>{e.target.src = defaultAvatar}} alt={"UserAvatar"} roundedCircle />
        {isOnline && <div className="online"></div>}
        {!isOnline && <div className="offline"></div>}
      </Col>
      <Col>
        <h6 className="truncate m-0">{props.person.email.split("@")[0]}</h6>
         <div className="truncate">"{`${chatPreviewLine}`}"</div> 
      </Col>
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
