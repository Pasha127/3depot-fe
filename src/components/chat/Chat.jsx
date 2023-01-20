import { useEffect, useState } from "react";
import {Container,Row,Col,Form,ListGroup, Button} from "react-bootstrap";
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



const Chat = (props) => {
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const anchor = useRef(null);
  const linkForm = useRef(null);
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [otherUser, setOtherUser] = useState({});
  const [otherUserName, setOtherUserName] = useState("");
  const [typingIndicatorClass, setTypingIndicatorClass] = useState("typing-indicator-hide");
  const [picLoading, setPicLoading] = useState(false);
  const [isTyping, setIsTyping] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatImagePreview, setChatImagePreview] = useState("chat-image-preview-hide");
  const [chatImageLink, setChatImageLink] = useState("chat-image-link-hide");
  const [formImageLink, setFormImageLink] = useState("");
  const [previewImage, setPreviewImage] = useState(null)
  const [imageDataURL, setImageDataURL] = useState("/3DepotLogoMedium.png");
  
  useEffect(()=>{
    props.activeChat.messages && setChatHistory(props.activeChat.messages) 
    setTimeout(()=>scrollToBottom(),10) 
  },[props.activeChat]);
  
  useEffect(() => {
    socket.on("newMessage", receivedMessage => {
      const newEntry = {...receivedMessage, createdAt: new Date()}
      appendNewMsg(newEntry);
    });
    socket.on("friendTyping", (user) => {
      setIsTyping(user._id)      
    });
  }, [socket]);
  
  useEffect(() => {
    setOtherUser(props.activeChat.members?.find(user => user._id !== props.user._id))
    setOtherUserName(props.activeChat.members?.find(user => user._id !== props.user._id).email.split("@")[0])
  }, [props.activeChat, props.user]);
  
  useEffect(() => {
    if(isTyping === otherUser?._id){
    setTypingIndicatorClass("typing-indicator-show")
    setTimeout(()=>setTypingIndicatorClass("typing-indicator-hide"),10)
    setIsTyping("")
  }
  }, [isTyping,otherUser]);
  
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
    linkForm.current.focus()

  }

  const sendImageLink = ()=>{
    setChatImageLink("chat-image-link-send")
    setTimeout(()=>{hideImageLink()},1000);
  }
  const hideImageLink = ()=>{
    setChatImageLink("chat-image-link-hide")
    setFormImageLink("")
  }

  const sendTyping = ()=>{
    socket.emit("typing", {user: props.user, activeChat: props.activeChat})
  }



  const postMessagePic = async (id) =>{ 
    setPicLoading(true)
    let formData = new FormData()
    formData.append('image', previewImage)
    const options = {
      method: 'POST',
      credentials:"include",    
      body: formData
      };
      const baseEndpoint = `${baseURL}/message/pic`
      try {    
        const response = await fetch(baseEndpoint, options);
        if (response.ok) {           
          const data = await response.json()
          setFormImageLink(data.imgURL) 
          sendMessage(data.imgURL)   
       } else {
         alert('Error Uploading picture')
       } 
      } catch (error) {
        console.log(error)
      }finally{console.log("Submitted Picture");setPicLoading(false); }
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
  
  const handleImgAndTxt = ()=>{
    if(previewImage){postMessagePic()}
    else{sendMessage()};
  }

  const sendMessage = (imgURL = formImageLink) => {
      sendImagePreview();
      sendImageLink();
      const newMessage= {
        "members": [props.activeChat.members[0]._id,props.activeChat.members[1]._id],
        "message":
        {"sender": props.user._id,
        "content":{
          "text": message,
          "media": imgURL
        }
      }      
    }
    if(newMessage.message.content.text || newMessage.message.content.media) {socket.emit("sendMessage", { message: newMessage })}
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

const handleClick = e => {
  e.preventDefault();
  inputRef.current.click();
  showImagePreview();
}


  return (
    <Container fluid >
          {props.activeChat && <div className={`convo-header-${props.showHide}`}>
            <div className="convo-header-text">{otherUserName}</div></div>}
        {props.activeChat._id && <Col md={12} className={"chatbar"}  >
          <div className={typingIndicatorClass}>
            <span className="typing-user">{`${otherUserName} is typing`}</span>
            <div className="dot-spacer01">{" ."}</div>
            <div className="dot-spacer02">{" ."}</div>
            <div className="dot-spacer03">{" ."}</div>
            </div>
          <div className="chat-image-preview-container">
             <div className={chatImagePreview}>
              {picLoading && <img 
              alt="loader"
              src="/3DepotLogoMedium.png"
              className="pic-loader"
              />}
              <img  
              alt="uploaded preview"
              src={imageDataURL} 
              className="img-link-img"
              onError={(e)=>{
                e.target.src = "/3DepotLogoMedium.png"
                }}/>
              <XCircle className="cancel-upload-x" onClick={(e)=>{
              hideImagePreview();
            }}/> 
            </div> 
            <div className={chatImageLink}>
              <img 
              alt="linked preview"
              className="img-link-img"  
              src={formImageLink}
              onError={(e)=>{
                e.target.src = "./3DepotLogoMedium.png"
                }}/>
              <Form
              onSubmit={(e)=>{e.preventDefault();
              sendMessage()
              }}>
              <Form.Control 
              ref={linkForm}
              value={formImageLink} 
              placeholder="Image URL"
              className="link-form"
              onChange={(e)=>{
                setFormImageLink(e.target.value)}}
              ></Form.Control>
              </Form>
              <XCircle className="cancel-link-x" onClick={(e)=>{
              hideImageLink();
            }}/> 
            </div>
            
            
          </div>
          <Form onSubmit={e => {
              e.preventDefault();
              handleImgAndTxt();
            }}>
            <Form.Group className="d-flex flex-row">
              <input 
                type="file" 
                id="imgUploadBtn" 
                ref={inputRef}
                onChange={(e)=>{readPreviewImage(e)}} 
                style={{ display: "none" }} 
              />
              <label htmlFor="imgUploadBtn" onClick={handleClick}>
                   <Button className="add-pic-button">
                    <Image className="img-svg"/>
                    <PlusCircleFill className="plus-svg"/>
                  </Button>
              </label>
              <input type="file" className="d-none" id="imgUploadBtn" 
                  onChange={(e)=>{readPreviewImage(e)}}></input>
              
              <Button className="add-link-pic-button" onClick={e => {
              e.preventDefault();
              showImageLink();
            }}><Image className="img-svg"/><Link45deg className="link-svg"/></Button>
            <Form.Control
              className="message-input"
              placeholder={`Message ${otherUserName}`}
              value={message}
              onChange={e =>{setMessage(e.target.value);
              sendTyping();
              }}
              />
              <Button className="send-button" onClick={e => {
              e.preventDefault();
              handleImgAndTxt();
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
                    <a href={message.content.media} rel="noreferrer" target="_blank">
                      <img src={message.content.media} alt="msg"  className="img-link-img" onError={(e)=>{
                        /* if(message.content.media === ""){ */ e.target.className = "d-none";/* } */
                       /*  else{e.target.src = "https://cdn-icons-png.flaticon.com/512/25/25284.png"}    */                     
                        }}/>
                    </a> 
                  </div>
                  <div className="msg-content text-right"> 
                  {message.content.text?.split("//")[0] === "https:" || message.content.text?.split("//")[0] === "http:"? 
                  <a href={message.content.text.split(" ")[0]}><div>{message.content.text}</div></a> 
                  : <div>{message.content.text}</div> }                   
                  </div>
                  <div className="user-time text-right">
                   at{" "}
                  {new Date(message.createdAt).toLocaleTimeString("en-US")}</div>
                </ListGroup.Item>
              </div>:
              <div  className={"single-message from-them"}>
                <ListGroup.Item  >
                <div className="msg-img">
                    <a href={message.content.media} rel="noreferrer" target="_blank">
                      <img src={message.content.media} alt="msg" className="img-link-img" onError={(e)=>{
                        e.target.className = "d-none";
                                             
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