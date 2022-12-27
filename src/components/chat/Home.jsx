import React from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getChatByIdWithThunk, getHistoryWithThunk } from "../../redux/actions";
import Chat from "./Chat";
import "./styles.css"
import UsersSidebar from "../user/UsersSidebar";

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
      }
    };  
}; 

const Home = (props) => {

    return (
        <Container fluid className="home-container m-0" >
        <div>
            <UsersSidebar/>
            <div className="chat-space">
                <Chat />
            </div>
        </div>       
        </Container>
    
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
