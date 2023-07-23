import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteChatByIdWithThunk,
  getAssetByIdWithThunk,
  setActiveChat,
  setChats,
  setLoading,
} from "../../../../../lib/redux/actions";
const defaultAvatar =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

const mapStateToProps = (state) => {
  return {
    user: state.userInfo,
    history: state.chats.list,
    activeChat: state.chats.active,
    onlineUsers: state.onlineUsers,
    recentMsg: state.recentMessage,
    isLoading: state.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChatHistory: (chat) => {
      dispatch(setActiveChat(chat));
    },
    deleteChat: (chatId) => {
      dispatch(deleteChatByIdWithThunk(chatId));
    },
    setLoading: (loadBool) => {
      dispatch(setLoading(loadBool));
    },
    getAsset: (id) => {
      dispatch(getAssetByIdWithThunk(id));
    },
  };
};

const SingleComment = (props) => {
  /*  console.log("comment props",props.content, props.sender) */
  const navigate = useNavigate();
  return (
    <Row className="uploaded-item">
      <Image
        className="chat-head"
        src={props.sender?.avatar}
        onError={(e) => {
          e.target.src = defaultAvatar;
        }}
        alt={"UserAvatar"}
        roundedCircle
      />
      <Col className="inactive-user">
        <div className="model-comment">{`${
          props.sender?.email.split("@")[0]
        }: ${props.content?.text}`}</div>
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);
