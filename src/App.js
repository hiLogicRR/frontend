import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Sidebar from './Sidebar';
import About from './About';
import Topnav from './Topnav';
import Rankings from './Rankings';
import ContactUs from './ContactUs';
import Profile from './Profile';
import MyTrainings from './MyTrainings';

class App extends Component {
  state = {
    menuIsOpened: true,
    loggedIn: false,
    user: null
  }

  changeMenuState = (menuState) => {
    this.setState({ 
      menuIsOpened: !menuState });
  }

  changeLoginStatus = (loginStatus) => {
    this.setState({
      loggedIn: loginStatus
    });
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <HashRouter>
        <div className="app">
          <div className={this.state.menuIsOpened ? "open-sidebar" : "close-sidebar"}>
            <Sidebar loggedIn={this.state.loggedIn}/>
          </div>

          <div className={this.state.menuIsOpened ? "content-app-full" : "content-app-with-sidebar"}>

            <Topnav changeMenuState={this.changeMenuState} changeLoginStatus={this.changeLoginStatus} setUser={this.setUser} />

            <div className={this.state.menuIsOpened ? "content-with-sidebar-open" : "content-with-sidebar-close"}>
              <Route exact path="/" component={Home} />
              <Route path="/profile" render={() => (<Profile user={this.state.user} />)} />
              <Route path="/mytrainings" component={MyTrainings} />
              <Route path="/rankings" component={Rankings} />
              <Route path="/about" component={About} />
              <Route path="/contactus" component={ContactUs} />
            </div>

          </div>

        </div>
      </HashRouter>
    );
  }
}

export default App;
