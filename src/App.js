import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Example from './Example';
import Sidebar from './Sidebar';
import About from './About';
import LoginForm from './LoginForm';

class App extends Component {
  state = {
    menuIsOpened: true
  }

  handleClick = (e) => {
    const menuIsOpened = this.state.menuIsOpened;
    this.setState({ menuIsOpened: !menuIsOpened });
  }

  render() {
    return (
      <HashRouter>
        <div className="app">
          <div className={this.state.menuIsOpened ? "open-sidebar" : "close-sidebar"}>
            <Sidebar />
          </div>

          <div className={this.state.menuIsOpened ? "content-app-full" : "content-app-with-sidebar"}>

            <div className={this.state.menuIsOpened ? "top-menu-with-sidebar-open" : "top-menu-with-sidebar-close"}>
              <span id="sidebar-opener" onClick={this.handleClick}>&#9776;</span>
            </div>

            <div className={this.state.menuIsOpened ? "content-with-sidebar-open" : "content-with-sidebar-close"}>
              <Route exact path="/" component={Home}/>
              <Route path="/example" component={Example}/>
              <Route path="/about" component={About}/>
            </div>

          </div>

        </div>
      </HashRouter>
    );
  }
}

export default App;
