import React, { Component } from "react";
import "../App.css";
import Chatkit from "@pusher/chatkit";
import Message from "./Message";
import TypingIndicator from "..//components/TypingIndicator";
import styled from "styled-components";
import Navbar from "./Navbar";
import SubmitButton from "./SubmitButton";

const Body = styled.div`
  justify-content: center;
  display: flex;
`;
const Container = styled.div`
  height: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  min-width: 600px;
  max-width: 1140px;
  width: 50%;
  padding: 50px;
  background-color: white;
  border-radius: 4px;
  background: #fff;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.05);
`;
const ChatInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  width: 100%;
  height: 100%;
`;
const TextBox = styled.input`
  width: 100%;
  color: "inherit";
  background-color: "none";
  outline: "none";
  border: "none";
  font-size: 16px;
  border-radius: 5px;
  padding: 20px;
  font-family: grubhubsans;
  margin-top: 20px;
`;
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoom: {},
      currentUser: {},
      typingUsers: [],
      chatInput: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }
  sendMessage() {
    if (this.state.chatInput) {
      this.state.currentUser.sendMessage({
        text: this.state.chatInput,
        roomId: this.state.currentRoom.id
      });
    }
    this.setState({ chatInput: "" });
  }

  // Send typing event
  sendTypingEvent(event) {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
    this.setState({
      chatInput: event.target.value
    });
  }

  _handleKeyPress(e) {
    if (e.key === "Enter") {
      this.sendMessage();
    }
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:17ecc123-f301-4205-a569-62e7f1e51ca4",
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/17ecc123-f301-4205-a569-62e7f1e51ca4/token"
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: 23102345,
          messageLimit: 30,
          hooks: {
            onNewMessage: message => {
              let newmessage = this.state.messages;
              newmessage.push(
                <Message
                  key={this.state.messages.length}
                  senderId={message.senderId}
                  currentUser={this.state.currentUser}
                  text={message.text}
                />
              );

              this.setState({ messages: newmessage });
            },
            onUserStartedTyping: user => {
              this.setState({
                typingUsers: [...this.state.typingUsers, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                typingUsers: this.state.typingUsers.filter(
                  username => username !== user.name
                )
              });
            }
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error("error", error));
  }

  render() {
    return (
      <>
        <Body>
          <Navbar />
          <Container>
            <div id="chat-output">{this.state.messages}</div>
            <ChatInput>
              <TextBox
                id="chat-input"
                type="text"
                placeholder="Type message..."
                name=""
                value={this.state.chatInput}
                onChange={this.sendTypingEvent}
                onKeyPress={this._handleKeyPress}
              />
              <div id="btndiv">
                <SubmitButton />
                <TypingIndicator typingUsers={this.state.typingUsers} />
              </div>
            </ChatInput>
          </Container>
        </Body>
      </>
    );
  }
}
export default Chat;
