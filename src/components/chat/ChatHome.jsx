import React from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getChatByIdWithThunk, getHistoryWithThunk, getMeWithThunk } from "../../redux/actions";
import Chat from "./Chat";
import "./styles.css"
import UsersSidebar from "../user/UsersSidebar";
import GeneralNavbar from "../navbar/GeneralNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mapStateToProps = state => {
    return {
    user: state.userInfo,
    history: state.chats.list,
    onlineUsers: state.onlineUsers
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
        <Container fluid className="home-container m-0" >
        <div>
            <UsersSidebar/>
            <div className="chat-space">
                <Chat />
            </div>
        </div>       
        </Container>
    
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHome);
