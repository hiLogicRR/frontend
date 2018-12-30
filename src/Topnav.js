import React, { Component } from 'react';
import './App.css';

class Topnav extends Component {
    state = {
        menuIsOpened: true
    }

    handleClick = (e) => {
        const menuIsOpened = this.state.menuIsOpened;
        this.setState({ menuIsOpened: !menuIsOpened });
        this.props.changeMenuState(this.state.menuIsOpened)
      }

    render() {
        return(
            <div className="topnav">
                <div className={this.state.menuIsOpened ? "top-menu-with-sidebar-open topbar" : "top-menu-with-sidebar-close topbar"}>
                <span id="sidebar-opener" onClick={this.handleClick}>&#9776;</span>
                <div class={this.state.menuIsOpened ? "login-container-sidebar-open" : "login-container-sidebar-close"}>
                <form>
                    <input className="login-input" type="text" placeholder="username" name="username" />
                    <input className="login-input" type="password" placeholder="password" name="password" />
                    <button className="btn btn-secondary btn-sm">Login</button>
                </form>
                </div>
                </div>
            </div>
        );
    }
}

export default Topnav;