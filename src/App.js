import React, { Component } from 'react';
import Chat from './Chat';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import './App.css';

const socket = socketIOClient();

class App extends Component {
  constructor(){
    super()
    this.state = {
      typedUsername: '',
      submittedUsername: '',
      messages: [],
      message:''
    }

    socket.on('message', (messageObj) => {

      const {message, username} = messageObj;

      this.setState({
          messages: [...this.state.messages, {message: message, username: username}]
      });
    })
  }

  usernameChangeHandler = (val) => {
    this.setState({
      typedUsername: val
    })
  }

  messageChangeHandler = (val) => {
    this.setState({
      message: val
    })
  }

  submitLogin = () => {
    axios.post('/login', {username: this.state.typedUsername}).then(response => {
        console.log(response.data.username)
        this.setState({
          submittedUsername: response.data.username
        })
    })
  }

  submitMessage = () => {
    if(this.state.message){
        socket.emit("message", this.state.message) 
        this.setState({
          message: ''
        })
    }
}

  render() {
   console.log(this.state.submittedUsername)
    return (
      <div className="App">
       {this.state.submittedUsername ?
          <div>
            <Chat messageChangeHandler={this.messageChangeHandler} message={this.state.message} messages={this.state.messages} submitMessage={this.submitMessage}/>
           </div>
          :
           <div>
            Login:
            <input onChange={(e)=> this.usernameChangeHandler(e.target.value)}/>
            <button onClick={() => this.submitLogin()}>Submit</button>
          </div>}
      </div>
    );
  }
}

export default App;
