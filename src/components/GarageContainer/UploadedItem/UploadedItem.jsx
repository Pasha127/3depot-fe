import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import { joinRoom, socket } from "../../SocketManager/SocketManager";
import { deleteChatByIdWithThunk, getAssetByIdWithThunk, setActiveChat, setChats, setLoading } from "../../../lib/redux/actions";
import { Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
const defaultPic = "/3DepotLogoMedium.png";

const mapStateToProps = state => {
  return {
  user: state.userInfo,
  history: state.chats.list,
  activeChat: state.chats.active,
  onlineUsers: state.onlineUsers,
  recentMsg: state.recentMessage,
  isLoading: state.isLoading
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setActiveChatHistory: (chat)=>{
      dispatch(setActiveChat(chat))
    },
    deleteChat: (chatId)=>{
      dispatch(deleteChatByIdWithThunk(chatId))
    },
    setLoading: (loadBool)=>{
      dispatch(setLoading(loadBool))
    },
    getAsset: (id) =>{
      dispatch(getAssetByIdWithThunk(id))
    } 
  };  
}; 


const UploadedItem = (props) => {
  const navigate = useNavigate()
  return (
    <Row className="uploaded-item"
    onClick={()=>{navigate(`/Garage?asset=${props._id}`); props.getAsset(props._id) }}>
      
        <Image className="asset-thumbnail" src={props.pic} onError={(e)=>{e.target.src = defaultPic}} alt={"model"} roundedCircle />
      <Col>
          <h6 className="truncate m-0 ">{props.modelName}</h6>
      </Col>
      <Trash className="delete-tab" onClick={(e)=>{
        e.stopPropagation();
        //open delete modal
      }
      }/>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadedItem);
