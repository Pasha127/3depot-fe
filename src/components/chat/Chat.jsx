import { useEffect, useState } from "react";
import {Container,Row,Col,Form,FormControl,ListGroup, Button} from "react-bootstrap";
import { getMeWithThunk, setActiveChat, setHistory, setLoading, setOnline, setRecentMsg } from "../../lib/redux/actions";
import { connect } from "react-redux";
import "./styles.css"
import { useRef } from "react";
import { socket } from "../SocketManager/SocketManager";
import { Image, PlusCircleFill, Send } from "react-bootstrap-icons";

const mapStateToProps = state => {
  return {
    user: state.userInfo,
    activeChat: state.chats.active,
    onlineUsers: state.onlineUsers,
    messageHistory: state.chats.active.messages,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMe: ()=> {
      dispatch(getMeWithThunk());
    },
    setUsersRedux: (users)=> {
      dispatch(setOnline(users));
    },
    setReduxChatHistory: (chat)=>{
      dispatch(setActiveChat(chat))
    },                  
    setRecentMesg: (chat)=>{
      dispatch(setRecentMsg(chat))
    },
    setLoading: (loadBool)=>{
      dispatch(setLoading(loadBool))
    },
    setHistory: (data)=>{
      dispatch(setHistory(data))
    }                  
  };  
}; 


const Chat = (props) => {
  const anchor = useRef(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  
  useEffect(()=>{
    /*     console.log('fire1', props.activeChat.messages ) */
    props.activeChat.messages && setChatHistory(props.activeChat.messages) 
    setTimeout(()=>scrollToBottom(),10) 
  },[props.activeChat]);
  
  useEffect(() => {
    socket.on("newMessage", receivedMessage => {
      const newEntry = {...receivedMessage, createdAt: new Date()}
      appendNewMsg(newEntry);
    });
  }, [socket]);
  
  const scrollToBottom = () =>{
    anchor.current?.scrollIntoView()
  }
  
  
  const sendMessage = () => {
      const newMessage= {
        "members": [props.activeChat.members[0]._id,props.activeChat.members[1]._id],
        "message":
        {"sender": props.user._id,
        "content":{
          "text":message,
          "media": "imageURLGoesHere"
        }
      }      
    }
    socket.emit("sendMessage", { message: newMessage })
    setMessage("")
    props.setRecentMesg(newMessage);        
  }
  
  const appendNewMsg = (newEntry)=>{
    console.log("append new msg counter");
    console.log("NewMessage: ",newEntry,"chat window history: ",chatHistory);
    const duplicateMessage = chatHistory.find(message => message.createdAt === newEntry.createdAt && message.message === newEntry.message);
    if(duplicateMessage) return;
    chatHistory && setChatHistory(chatHistory =>[...chatHistory,newEntry]);
    scrollToBottom()
}


  return (
    <Container fluid >
          {props.activeChat && <div className={`convo-header-${props.showHide}`}><div className="convo-header-text">{props.activeChat.members?.find(user => user._id !== props.user._id).email.split("@")[0]}</div></div>}
        {props.activeChat._id && <Col md={12} className={"chatbar"}  >
          
          <Form
            onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}
            >
            <Form.Group className="d-flex flex-row">
              <Button className="add-pic-button" onClick={e => {
              e.preventDefault();
              sendMessage();
            }}><Image className="img-svg"/><PlusCircleFill className="plus-svg"/></Button>
            <FormControl
              placeholder="Write your message here"
              value={message}
              onChange={e =>setMessage(e.target.value)}
              />
              <Button className="send-button" onClick={e => {
              e.preventDefault();
              sendMessage();
            }}><Send/></Button>
          </Form.Group>
          </Form>
              </Col>}
       {chatHistory[0] && <Row style={{ height: "95%" }} className="my-3 pe-none">
        <Col md={12} className="chat-window">
          {props.activeChat?.members && <ListGroup> {chatHistory.map((message, i) => (
            <div key={i+"Message"}>
              {props.activeChat.members.some(member => member._id === message.sender) && <div>
              {message.sender === props.user._id? 
              <div  className={"single-message from-me"}>
                <ListGroup.Item >
                  <div className="msg-img">
                    <a href={message.content.media}>
                      <img src={message.content.media} onError={(e)=>{e.target.className = "d-none"}}/>
                    </a> 
                  </div>
                  <div className="msg-content text-right"> {message.content && message.content.text}</div>
                  <div className="user-time text-right">
                   at{" "}
                  {new Date(message.createdAt).toLocaleTimeString("en-US")}</div>
                </ListGroup.Item>
              </div>:
              <div  className={"single-message from-them"}>
                <ListGroup.Item  >
                <div className="msg-img">{message.content.media} </div>
                <div className="msg-content"> {message.content && message.content.text}</div>
                <div className="user-time text-left">
               at{" "}
              {new Date(message.createdAt).toLocaleTimeString("en-US")}</div>
            </ListGroup.Item>
            </div>}
              </div>}
              </div>
            ))}
            {<ListGroup.Item ref={anchor} className="invisible mt-5 "/>}
            </ListGroup>}

        </Col>        
      </Row>} 
    </Container>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);