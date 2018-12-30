import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Sidebar from './Sidebar';
import About from './About';
import Topnav from './Topnav';

class App extends Component {
  state = {
    menuIsOpened: true
  }

  changeMenuState = (menuState) => {
    console.log(menuState);
    this.setState({ menuIsOpened: !menuState });
  }

  render() {
    return (
      <HashRouter>
        <div className="app">
          <div className={this.state.menuIsOpened ? "open-sidebar" : "close-sidebar"}>
            <Sidebar />
          </div>

          <div className={this.state.menuIsOpened ? "content-app-full" : "content-app-with-sidebar"}>

            <Topnav changeMenuState={this.changeMenuState}/>

            <div className={this.state.menuIsOpened ? "content-with-sidebar-open" : "content-with-sidebar-close"}>
              <Route exact path="/" component={Home}/>
              <Route path="/example" component={About}/>
              <Route path="/about" component={About}/>
            </div>

          </div>

        </div>
      </HashRouter>
    );
  }
}

export default App;
