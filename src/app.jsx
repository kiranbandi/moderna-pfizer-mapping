/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
//Root sass file for webpack to compile
import './sass/main.scss';

class App extends Component {

  render() {
    return (<Dashboard />)
  }
}

ReactDOM.render(<App />, document.getElementById('chart-mount'));


