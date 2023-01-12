import React from "react";
import { connect } from "react-redux";
import UserMini from "../user/user-mini/userMini";
import { useEffect, useState } from "react";
import { getChatByIdWithThunk, getHistoryWithThunk, setOnline } from "../../lib/redux/actions";
import "./styles.css"
import Search from "./Search";
import FriendsTab from "../Buttons/FriendsTab/FriendsTab";
import { socket } from "../SocketManager/SocketManager";
import { PersonAdd } from "react-bootstrap-icons";


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
  const[refreshState,setRefreshState] = useState(false);
  const[addFriendsClass,setAddFriendsClass] = useState("add-friends-show");
  
  useEffect(()=>{
    props.getHistory()
  },[])
  
  useEffect(() => {
    socket.on("newMessage", () => {
      setRefreshState(prevState => !prevState);
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
  
  const toggleAddFriends = ()=>{
    if(addFriendsClass === "add-friends-show"){setAddFriendsClass("add-friends-hide")}
    else{setAddFriendsClass("add-friends-show")}
  }

  return(<>
    <div className={`friendlist`}> 
    <div className={addFriendsClass}>
      <div>Friends</div>
      <PersonAdd className="add-friend-button" onClick={toggleAddFriends}/>
    </div>
      <Search getChat={getRelevantChatForPerson}/>          
      {props.history.slice()
      .sort((a, b) => new Date(b.messages[b.messages.length-1].createdAt) - new Date(a.messages[a.messages.length-1].createdAt))
      .map(chat => {
      const person = chat.members.find(member => member._id !== props.user._id) 
      return (<div  key={`${person._id} chat`} onClick={()=>{setAddFriendsClass("add-friends-show")}}>
           <UserMini person={person} thisChat={chat} getChat={getRelevantChatForPerson} refreshState={refreshState}/>
      </div>)
    })
}
    </div> 
</>)}

export default connect(mapStateToProps, mapDispatchToProps)(UsersSidebar);