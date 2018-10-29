
import React, { Component } from 'react'
import '../App.css';
import Chatkit from '@pusher/chatkit';
import Message from './Message';

class Chat extends Component {  
    constructor(props){
          super(props);
          this.state ={
            messages:[],
            currentRoom: {},
            currentUser: {},
            chatInput: ''
          }        
        this.setChatInput = this.setChatInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        }      
// update the input field when the user types something
    setChatInput(event){
        this.setState({
            chatInput: event.target.value
        });
      }      
    sendMessage() {
             if(this.state.chatInput){
                this.state.currentUser.sendMessage({
                    text: this.state.chatInput,
                    roomId: this.state.currentRoom.id,
                  })
                }     
                this.setState({ chatInput: ''})
             }       
    _handleKeyPress(e){
                        if (e.key === 'Enter') {
                            this.sendMessage();
                        }
                    }      
    componentDidMount() {
          const chatManager = new Chatkit.ChatManager({
                  instanceLocator: 'v1:us1:98a5193a-5df7-4ff2-a8ba-f8d3ada2fcc7',
                  userId: this.props.currentUsername,
                  tokenProvider: new Chatkit.TokenProvider({
                    url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/98a5193a-5df7-4ff2-a8ba-f8d3ada2fcc7/token',
                  }),
                })
                chatManager
                .connect()
                .then(currentUser => {
                  this.setState({ currentUser })
                  return currentUser.subscribeToRoom({
                    roomId: 19379998,
                    messageLimit: 100,
                    hooks: {
                      onNewMessage: message => {
                        let newmessage = this.state.messages;           
                        newmessage.push(<Message 
                                                    key={ 
                                                        this.state.messages.length 
                                                    } 
                                                    senderId={ 
                                                        message.senderId 
                                                    } 
                                                    text={ message.text 
                                                    }/>)         
                        this.setState({messages: newmessage})
                      },
                    },
                  })
                })      
                .then(currentRoom => {
                  this.setState({ currentRoom })
                 })
                .catch(error => console.error('error', error))
        }       
        render() {
                    return ( 
                        <div id="center">
                            <div id="chat-output">
                            { this.state.messages }     
                            </div>                           
                            <input id="chat-input"
                                type="text"
                                placeholder='Type message...'
                                name=""
                                value={ this.state.chatInput } 
                                onChange={ this.setChatInput } 
                                onKeyPress={ this._handleKeyPress }/>                 
                            <div id="btndiv">
                            <input id="button" type="button"
                                onClick={ this.sendMessage } value="Send Chat" />
                            </div>                           
                        </div>
                    );
                }      
}
export default Chat