import React, { Component } from 'react';

export default class Chat extends Component {
    render() {
        let messages = this.props.messages.map(message => {
            return <div>{message.username}: {message.message} </div>
        })
        return (
            <div>
                {messages}
                Write a message messages:
                <input onChange={(e) => this.props.messageChangeHandler(e.target.value)} value={this.props.message}/>
                <button onClick={this.props.submitMessage}>Submit</button>
            </div>
        );
    }
}