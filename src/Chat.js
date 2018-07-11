import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default class Chat extends Component {
    constructor(){
        super()
        this.state = {
          messages: [],
          message:''
        }
        const socket = socketIOClient();
        socket.on('message', (messageObj) => {
          const {message, username} = messageObj;

          //set state with the old message array with the new message added to the end
          this.setState({
              messages: [...this.state.messages, {message: message, username: username}]
          });
        })
      }

      componentWillMount(){
          axios.get('/api/user').then(response => {
              console.log(response)
          })
      }
    
      messageChangeHandler = (val) => {
        this.setState({
          message: val
        })
      }


    
      submitMessage = () => {
        const socket = socketIOClient();
        if(this.state.message){
            socket.emit("message", this.state.message) 
            this.setState({
              message: ''
            })
        }
    }


    logout = () => {
        axios.post('/api/logout').then(()=>{
            window.location.href = '/'
        })
    }
    
    render() {
        let messages = this.state.messages.map(message => {
            return <div key={message.id}>{message.username}: {message.message} </div>
        })
        return (
            <div>
                {messages}
                Write a message messages:
                <input onChange={(e) => this.messageChangeHandler(e.target.value)} value={this.state.message}/>
                <button onClick={this.submitMessage}>Submit</button>
                <button onClick={()=> this.logout()}>logout</button>
                <Link to='/sessioncheck'><button>sessionChecker Component</button></Link>
            </div>
        );
    }
}
    