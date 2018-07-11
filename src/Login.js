import React, { Component } from 'react';
import {Link} from 'react-router-dom'
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
            
        })
      }
    
    render() {
        
        return (
            <div>
                Login:
                <input onChange={(e)=> this.usernameChangeHandler(e.target.value)}/>
                
                <Link to='/chat'>
                    <button onClick={() => {
                        this.submitLogin()
                        
                        }}>Submit</button>
                </Link>
            </div>
        );
    }
}