import React, { Component } from 'react';
import Chat from './Chat';
import Login from './Login'
import sessionCheck from './SessionCheck';
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
            <Switch>
              <Route exact path='/'  component={Login}/>
              <Route path='/chat/:room' component={Chat}/>
              <Route path='/sessioncheck' component={sessionCheck}/>
              <Route path='*' render={() => {
                return <Redirect to='/'/>
              }}/>
            </Switch>
      </div>
    );
  }
}

export default App;
