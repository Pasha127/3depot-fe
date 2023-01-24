import React from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getChatByIdWithThunk, getHistoryWithThunk, getMeWithThunk } from "../../lib/redux/actions";
import Chat from "./Chat";
import "./styles.css"
import UsersSidebar from "../user/UsersSidebar";
import GeneralNavbar from "../navbar/GeneralNavbar";
import { useEffect } from "react";
import { useState } from "react";
import FriendsTab from "../Buttons/FriendsTab/FriendsTab";


const mapStateToProps = state => {
    return {
    user: state.userInfo,
    history: state.chats.list,
    onlineUsers: state.onlineUsers,
    activeChat: state.chats.active
    };
  };
  
   const mapDispatchToProps = dispatch => {
    return {
       getHistory: ()=> {
        dispatch(getHistoryWithThunk());
      },
      getChatById: (id)=> {
        dispatch(getChatByIdWithThunk(id));
      },
      getMe: ()=> {
        dispatch(getMeWithThunk());
      }   
    };  
}; 

const ChatHome = (props) => {
  const [showHide, setShowHide] = useState("Hide")
 /*  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  

  useEffect(()=>{
    if(isLoggedIn!props.user._id){const errorTimeout = setTimeout(()=>{
      alert("Please log in to use chat");
      navigate("/LogIn")
    },10000)
    return ()=> clearTimeout(errorTimeout)}
  },[isLoggedIn]) */

 useEffect(()=>{
    props.getMe()
  },[]) 

    return (<>
      <GeneralNavbar/>
        <Container fluid className="home-container m-0 p-0" >
        <div className="d-flex w-100">
            <div className={`friend-space-${showHide}`}>
              <UsersSidebar/>
              <FriendsTab showHide={showHide} setShowHide={setShowHide}/>
            </div>
            <div className="chat-space">
            {!props.activeChat?.members && <div className="splash-logo"></div>}
                <Chat showHide={showHide} />
            </div>
        </div>       
        </Container>
    
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHome);
