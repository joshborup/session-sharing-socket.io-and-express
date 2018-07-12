import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class SessionCheck extends Component {
    constructor(){
        super()
        this.state = {
            user:'',
            test:''
        }
    }

    componentDidMount(){
        axios.get('/api/user').then(response => {
            this.setState({
                user: response.data
            })
        })
    }

    addToSession = () => {
        axios.post('/api/user', {test: this.state.test}).then(response => {
            console.log(response)
            this.setState({
                user: response.data,
                test: ''
            })
        })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.user)}
                <input onChange={(e)=>this.setState({test:e.target.value})} value={this.state.test}/>
                <button onClick={()=> this.addToSession()}>submit</button>
                <Link to='/chat/chatroom'><button>back to chat</button></Link>
            </div>
        );
    }
}