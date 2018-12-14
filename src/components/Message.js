import React, { Component } from "react";
import styled from "styled-components";
const ChatBox = styled.div`
  background-color: ${props => props.background || "#efefef"};
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  margin-bottom: 15px;
  float: ${props => props.float || "left"};
  color: ${props => props.color || "black"};
`;
const ChatText = styled.div``;
const SenderInfo = styled.div`
  font-weight: bold;
`;
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderId: this.props.senderId,
      currentUser: this.props.currentUser,
      text: this.props.text,
      isCurrentUser: this.props.senderId === this.props.currentUser.id
    };
  }
  render() {
    return (
      <>
        <ChatBox
          float={this.state.isCurrentUser ? "right" : "left"}
          background={this.state.isCurrentUser ? "#f63440" : "#efefef"}
          color={this.state.isCurrentUser ? "white" : "black"}
        >
          <SenderInfo>
            <p>{this.props.senderId}</p>
          </SenderInfo>
          <ChatText>
            <p>{this.props.text}</p>
          </ChatText>
        </ChatBox>
      </>
    );
  }
}
export default Message;
