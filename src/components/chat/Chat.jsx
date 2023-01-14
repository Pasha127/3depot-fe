import { useEffect, useState } from "react";
import {Container,Row,Col,Form,FormControl,ListGroup, Button} from "react-bootstrap";
import { getMeWithThunk, setActiveChat, setHistory, setLoading, setOnline, setRecentMsg } from "../../lib/redux/actions";
import { connect } from "react-redux";
import "./styles.css"
import { useRef } from "react";
import { socket } from "../SocketManager/SocketManager";
import { Image, Link45deg, PlusCircleFill, Send, XCircle} from "react-bootstrap-icons";

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
/* 
const postMessagePic = async (id) =>{ 
  let formData = new FormData()
  formData.append('image', avatar)
  const options = {
    method: 'POST',
    credentials:"include",    
    body: formData
    };
    const baseEndpoint = `${baseURL}/user/avatar`
    try {    
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {           
        const data = await response.json() 
        console.log(data)      
     } else {
       alert('Error Uploading picture')
     } 
    } catch (error) {
      console.log(error)
    }finally{console.log("Submitted Picture");}
  }

const readPreviewImage = (e)=>{
  const file = e.target.files[0]
  setPreviewImage(file);
  let fileReader, isCancel = false;
      if (file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setImageDataURL(result)
          }
        }
        fileReader.readAsDataURL(file);
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }
}
 */
const Chat = (props) => {
  const anchor = useRef(null);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatImagePreview, setChatImagePreview] = useState("chat-image-preview-hide");
  const [chatImageLink, setChatImageLink] = useState("chat-image-link-hide");
  const [formImageLink, setFormImageLink] = useState("");
  const [previewImage, setPreviewImage] = useState(null)
  const [imageDataURL, setImageDataURL] = useState(null);
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

  const showImagePreview = ()=>{
    setChatImagePreview("chat-image-preview-show")
  }

  const sendImagePreview = ()=>{
    setChatImagePreview("chat-image-preview-send")
    setTimeout(()=>{hideImagePreview()},1000);
  }
  const hideImagePreview = ()=>{
    setChatImagePreview("chat-image-preview-hide")
    setPreviewImage(null);
    setImageDataURL(null);
  }
  const showImageLink = ()=>{
    setChatImageLink("chat-image-link-show")
  }

  const sendImageLink = ()=>{
    setChatImageLink("chat-image-link-send")
    setTimeout(()=>{hideImageLink()},1000);
  }
  const hideImageLink = ()=>{
    setChatImageLink("chat-image-link-hide")
    setFormImageLink("")
  }
  
  
  const sendMessage = () => {
      sendImagePreview();
      sendImageLink();
      const newMessage= {
        "members": [props.activeChat.members[0]._id,props.activeChat.members[1]._id],
        "message":
        {"sender": props.user._id,
        "content":{
          "text": message,
          "media": formImageLink
        }
      }      
    }
    if(newMessage.message.content.text || newMessage.message.content.media) {socket.emit("sendMessage", { message: newMessage })}
    setMessage("")
    setMedia("")
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

useEffect(()=>{
  
},[props.activeChat])

  return (
    <Container fluid >
          {props.activeChat && <div className={`convo-header-${props.showHide}`}><div className="convo-header-text">{props.activeChat.members?.find(user => user._id !== props.user._id).email.split("@")[0]}</div></div>}
        {props.activeChat._id && <Col md={12} className={"chatbar"}  >
          <div className="chat-image-preview-container">
            <div className={chatImagePreview}>
              <img  src={"https://placekitten.com/200/200"}/>
              <XCircle className="cancel-upload-x" onClick={(e)=>{
              hideImagePreview();
            }}/> 
            </div>
            <div className={chatImageLink}>
              <img className="img-link-img"  src={formImageLink}
              onError={(e)=>{
                e.target.src = "/3DepotLogoMedium.png"
                }}/>
              <Form>
              <Form.Control 
              value={formImageLink} 
              placeholder="Image URL"
              className="link-form"
              onChange={(e)=>{setFormImageLink(e.target.value)}}
              ></Form.Control>
              </Form>
              <XCircle className="cancel-link-x" onClick={(e)=>{
              hideImageLink();
            }}/> 
            </div>
            
            
          </div>
          <Form onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}>
            <Form.Group className="d-flex flex-row">
              <Button className="add-pic-button" onClick={e => {
              e.preventDefault();
              showImagePreview();
            }}><Image className="img-svg"/><PlusCircleFill className="plus-svg"/></Button>
              <Button className="add-link-pic-button" onClick={e => {
              e.preventDefault();
              showImageLink();
            }}><Image className="img-svg"/><Link45deg className="link-svg"/></Button>
            <Form.Control
              className="message-input"
              placeholder={`Message ${props.activeChat.members.find(member => member._id !== props.user._id).email.split("@")[0]}`}
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
                    <a href={message.content.media} target="_blank">
                      <img src={message.content.media} className="img-link-img" onError={(e)=>{
                        if(message.content.media === ""){ e.target.className = "d-none";}
                        else{e.target.src = "https://placekitten.com/200/200"}                        

                        }}/>
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
                <div className="msg-img">
                    <a href={message.content.media} target="_blank">
                      <img src={message.content.media} className="img-link-img" onError={(e)=>{
                        if(message.content.media === ""){ e.target.className = "d-none";}
                        else{e.target.src = "https://placekitten.com/200/200"}                        

                        }}/>
                    </a> 
                  </div>
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