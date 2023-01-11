import React from "react";
import { connect } from "react-redux";
import UserMini from "../user/user-mini/userMini";
import { useEffect, useState } from "react";
import { getChatByIdWithThunk, getHistoryWithThunk, setOnline } from "../../lib/redux/actions";
import "./styles.css"
import Search from "./Search";
import FriendsTab from "../Buttons/GarageSideButtons/LeftSideButtons/FriendsTab/FriendsTab";
import { socket } from "../SocketManager/SocketManager";


const mapStateToProps = state => {
    return {
    user: state.userInfo,
    history: state.chats.list,
    activeChat: state.chats.active,
    onlineUsers: state.onlineUsers,
    recentMsg: state.recentMessage    
    };
  };
  
   const mapDispatchToProps = dispatch => {
    return {
       getHistory: ()=> {
        dispatch(getHistoryWithThunk());
      },
      getChatById: (id)=> {
        dispatch(getChatByIdWithThunk(id));
      }
    };  
}; 



const UsersSidebar = (props) => {
  const [numberOfChats, setNumberOfChats] = useState(0)
  useEffect(()=>{
    props.getHistory()
  },[])
  
  useEffect(() => {
      socket.on("addNewChat", () => {
        /* setNumberOfChats(numberOfChats => numberOfChats++) */
        window.location.reload()
      });
      
    }, [socket]);

const getRelevantChatForPerson = (targetPerson) =>{      
    const relevantChat = props.history.find(chat => {
        return chat.members.some(member=>{
          return member._id === targetPerson._id
        })
      })  
        props.getChatById(relevantChat._id);
    }

return(<>
    <div className="friendlist"> 
        <Search getChat={getRelevantChatForPerson}/>          
        {props.history.map(chat =>{
            const person = chat.members.find(member => member._id !== props.user._id) 
                return (<UserMini key={`${person._id} chat`} person={person} thisChat={chat} getChat={getRelevantChatForPerson} />)}
        )}
    </div> 
</>)}

export default connect(mapStateToProps, mapDispatchToProps)(UsersSidebar);