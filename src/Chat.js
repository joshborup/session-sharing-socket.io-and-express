import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {Link} from 'react-router-dom';
import axios from 'axios';
const socket = socketIOClient();
export default class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
          messages: [],
          message:'',
          room: this.props.match.params.room
        }
        
        socket.on('message', (messageObj) => {
          const {message, user} = messageObj;
            console.log(messageObj);
          //set state with the old message array with the new message added to the end
          this.setState({
              messages: [...this.state.messages, {message: message, user: user, id: messageObj.id}]
          });
        })
      }

      componentDidMount(){
          axios.get('/api/user').then(response => {
            console.log(response)
            socket.emit('room_connection', {room: this.state.room, user: response.data});
          })
      }
    
      messageChangeHandler = (val) => {
        this.setState({
          message: val
        })
      }


    
      submitMessage = () => {
        if(this.state.message){
            socket.emit("message", {message: this.state.message, room: this.props.match.params.room}) 
            console.log(this.state.message);
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
            return <div key={message.id}>{message.user.username} : {message.message}</div>
        })
        return (
            <div>
                {messages}
                Write a message:
                <input onChange={(e) => this.messageChangeHandler(e.target.value)} value={this.state.message}/>
                <button onClick={() => this.submitMessage()}>Submit</button>
                <button onClick={()=> this.logout()}>logout</button>
                <Link to='/sessioncheck'><button>sessionChecker Component</button></Link>
            </div>
        );
    }
}
    