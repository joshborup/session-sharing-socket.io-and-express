import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
          typedUsername: '',
          submittedUsername: '',
        }
      }
    
      usernameChangeHandler = (val) => {
        this.setState({
          typedUsername: val
        })
      }
    
      submitLogin = () => {
        axios.post('/login', {username: this.state.typedUsername}).then(response => {
            this.props.history.push('/chat/chatroom')
        })
      }
    
    render() {
        console.log(this.props)
        return (
            <div>
                Login:
                <input onChange={(e)=> this.usernameChangeHandler(e.target.value)}/>
                
                
                    <button onClick={() => {
                        this.submitLogin()
                        
                        }}>Submit</button>
                
            </div>
        );
    }
}