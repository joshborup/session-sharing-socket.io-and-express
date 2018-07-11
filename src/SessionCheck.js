import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class SessionCheck extends Component {
    constructor(){
        super()
        this.state = {
            user:''
        }
    }

    componentDidMount(){
        axios.get('/api/user').then(response => {
            this.setState({
                user: response.data
            })
        })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.user)}
                <Link to='/chat'><button>back to chat</button></Link>
            </div>
        );
    }
}