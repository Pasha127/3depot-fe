import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {io} from "socket.io-client";
import { getMeWithThunk, setActiveChat, setLoading, setOnline, setRecentMsg } from "../../lib/redux/actions";
export const socket = io("http://localhost:3001", {transports:["websocket"], withCredentials:true})
socket.connect()



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

export const submitUsername = (userId, emailAddress) => {
    socket.emit("setUsername", {_id:userId, username: emailAddress.split("@")[0] })
}

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

const SocketManager = (props)=>{
        const {_id,email} = props.user
        const location = useLocation()
        useEffect(() => {
            props.setUsersRedux(["TESING"]);
            /* console.log('fire2') */
            submitUsername(_id,email)   
            socket.on("welcome", welcomeMessage => {
           /*    console.log(welcomeMessage); */
              
            });
        }, []);

        useEffect(() => {
            socket.on("newMessage", receivedMessage => {
              const newEntry = {...receivedMessage, createdAt: new Date()}
                console.log("New MSG: ",newEntry, "active",props.activeChat, "history", props.messageHistory);
              /* props.activeChat.messages && props.setReduxChatHistory(chatHistory =>[...chatHistory,newEntry]);
              location.pathname === "/Chat" && scrollToBottom()
              props.setRecentMesg(newEntry) */
            });
            socket.on("listUpdate", onlineUsersList => {
                /* console.log("New user online: ", onlineUsersList); */
              props.setUsersRedux(onlineUsersList);
            });
        }, [socket]);
        
        

        return(<>
        
        </>)
    }

    export default connect(mapStateToProps, mapDispatchToProps)(SocketManager);