import { useEffect, useState } from "react";
import {Container,Row,Col,Form,FormControl,ListGroup} from "react-bootstrap";
import {io} from "socket.io-client";
import { getMeWithThunk, setActiveChat, setLoading, setOnline, setRecentMsg } from "../../lib/redux/actions";
import { connect } from "react-redux";

import "./styles.css"
import { useRef } from "react";

const socket = io("http://localhost:3001", {transports:["websocket"], withCredentials:true})
socket.connect()

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
    }                  
  };  
}; 

export const joinRoom = (otherId, relevantChat) =>{ 
 /*  console.log("person to join: ", otherId); */
  socket.emit("joinRoom", {chatRoomId:relevantChat._id})
}

export const emitLogOut = ()=>{
  socket.emit("logOut");
}

export const sendInitialMessage = (user, otherUser) => {
  console.log("initial members",[user,otherUser])
  socket.emit("setUsername", {_id:user._id, username: user.email.split("@")[0] })
  const newMessage= {
  "members": [user._id,otherUser._id],
  "message":
  {"sender": user,
  "content":{
    "text": `${user.email.split("@")[0]} has started a chat with you!`,
    "media": "imageURLGoesHere"
        }
      }      
    }
    socket.emit("sendMessage", { message: newMessage }) 
  }





const Chat = (props) => {
  const anchor = useRef(null);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const {_id,email} = props.user
  /* console.log("active chat outside socket: ", props.activeChat); */ // okay


  useEffect(()=>{
/*     console.log('fire1', props.activeChat.messages ) */
    props.activeChat.messages && setChatHistory(props.activeChat.messages)    
  },[props.activeChat]);

  useEffect(() => {
    props.setUsersRedux(["TESING"]);
/*     console.log('fire2') */
    submitUsername(_id,email)   
    socket.on("welcome", welcomeMessage => {
   /*    console.log(welcomeMessage); */
      
    });
  }, []);
  
  useEffect(() => {
    socket.on("newMessage", receivedMessage => {
 /*      console.log("chatHistory: ",chatHistory)
      console.log("StateChatHistory: ",props.messageHistory)
      console.log("newMessage ", receivedMessage); */
      const newEntry = {...receivedMessage, createdAt: new Date()}
      chatHistory && setChatHistory(chatHistory =>[...chatHistory,newEntry]);
      scrollToBottom()
      props.setRecentMesg(newEntry)
    });
    
    socket.on("listUpdate", onlineUsersList => {
/*       console.log("New user online: ", onlineUsersList); */
      setOnlineUsers(onlineUsersList);
      props.setUsersRedux(onlineUsersList);
    });

    
  }, [socket]);

    const scrollToBottom = () =>{
      anchor.current?.scrollIntoView({ behavior: "smooth" })
    }

    const submitUsername = (userId, emailAddress) => {
      socket.emit("setUsername", {_id:userId, username: emailAddress.split("@")[0] })
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
            <FormControl
              
              placeholder="Write your message here"
              value={message}
              onChange={e =>setMessage(e.target.value)}
              />
          </Form>
              </Col>}
      {chatHistory[0] && <Row style={{ height: "95%" }} className="my-3 pe-none">
        <Col md={12} className="chat-window">
          <ListGroup> {chatHistory.map((element, i) => (
              <div key={i}>
              {element.sender === props.user._id? <div  className={"single-message from-me"}>{console.log(chatHistory)}<ListGroup.Item >
                <div className="msg-content"> {element.content && element.content.text}</div>
                <div className="user-time text-right">
                 at{" "}
                {new Date(element.createdAt).toLocaleTimeString("en-US")}</div>
              </ListGroup.Item></div>:
              <div  className={"single-message from-them"}><ListGroup.Item  >
                <div className="msg-content"> {element.content && element.content.text}</div>
                <div className="user-time text-left">
               at{" "}
              {new Date(element.createdAt).toLocaleTimeString("en-US")}</div>
            </ListGroup.Item></div>}
              </div>
            ))}
            {<ListGroup.Item ref={anchor} className="invisible mt-2 "/>}
            </ListGroup>

        </Col>        
      </Row>}
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
