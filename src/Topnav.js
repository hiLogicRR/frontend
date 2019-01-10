import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Redirect } from 'react-router-dom';

class RegisterPopUp extends Component {
    state = {
        username: null,
        password1: null,
        password2: null,
        formSend: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.password1 === this.state.password2) {
            const credentials = {'username': this.state.username, 'password': this.state.password1};
            axios.post('http://localhost:5000/api/register', credentials)
            .then((response) => {
                //Perform action based on response
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
                //Perform action based on error
            });
        }
        //this.props.closePopup();
        this.setState({
            formSend: true
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    checkPasswordMatch() {
        if(this.state.password1 === this.state.password2) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className='popup'>
                {this.state.formSend ? 
                (
                    <div className="registered">
                    {this.checkPasswordMatch() ? 
                        (
                            <div>
                                <h1 className="h1-registered">WELCOM {this.state.username}, You can Log In now !</h1>
                                <button className="btn btn-outline-secondary btn-dark btn-sm btn-registered" onClick={this.props.closePopup}>CLOSE</button>
                            </div>
                        ) 
                        : 
                        (
                            <h1 className="h1-registered">PASSWORDS DON'T MATCH, TRY AGAIN.</h1>
                        )}
                    </div>
                ) 
                : 
                (
                    <div className='popup_inner'>
                        <h1 className="h1-join">Join Us !</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label className="label-reg">Username</label>
                            <input type='text' placeholder="username" className="login-input" id="username" onChange={this.handleChange} required/>
                            
                            <label className="label-reg">Password</label>
                            <input type='password' placeholder="password" className="login-input" id="password1" onChange={this.handleChange} required/>

                            <label className="label-reg">Confirm Password</label>
                            <input type='password' placeholder="password" className="login-input" id="password2" onChange={this.handleChange} required/>

                            <button className="btn btn-outline-secondary btn-dark">Register</button>
                        </form>
                    </div>
                )}
                <br />
            </div>
        );
    }
}

class Topnav extends Component {
    state = {
        menuIsOpened: true,
        username: null,
        password: null,
        loggedIn: false,
        showPopup: false,
        redirect: false
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    handleClick = (e) => {
        const menuIsOpened = this.state.menuIsOpened;
        this.setState({ menuIsOpened: !menuIsOpened });
        this.props.changeMenuState(this.state.menuIsOpened)
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var changeLoginStatus = this.props.changeLoginStatus;
        var setUser = this.props.setUser;

        const credentials = {'username': this.state.username, 'password': this.state.password};
        axios.post('http://localhost:5000/api/login', credentials)
        .then((response) => {
            //Perform action based on response
            console.log(response);
            console.log(response.data);
            changeLoginStatus(response.data);
            setUser(response.data);
            this.setState({loggedIn: response.data});
            if(!response.data) {
                this.setState({
                    loggedIn: false
                });
                alert('incorrect password. try again');
            }
            else {
                this.setState({
                    loggedIn: true,
                    redirect: false
                });
            }
        })
        .catch((error) => {
            console.log(error);
            //Perform action based on error
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleClickLogout = (e) => {
        this.props.changeLoginStatus(false);
        this.setState({
            loggedIn: false,
            redirect: true
        });
    }

    handleClickRegister = (e) => {
        console.log(this.state.loggedIn);
        this.togglePopup.bind(this);
    }

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return(
            <div className="topnav">
                {this.renderRedirect()}
                <div className={this.state.menuIsOpened ? "top-menu-with-sidebar-open topbar" : "top-menu-with-sidebar-close topbar"}>
                <span id="sidebar-opener" onClick={this.handleClick}>&#9776;</span>
                {this.state.loggedIn ? null : (<span className="logout"><button className="btn btn-outline-secondary btn-sm" onClick={this.togglePopup.bind(this)}>Register</button></span>)}
                <div className={this.state.menuIsOpened ? "login-container-sidebar-open" : "login-container-sidebar-close"}>
                {this.state.loggedIn ? null : (<form  onSubmit={this.handleSubmit}>
                    <input className="login-input" type="text" placeholder="username" name="username" id="username" onChange={this.handleChange} />
                    <input className="login-input" type="password" placeholder="password" name="password" id="password" onChange={this.handleChange} />
                    <button className="btn btn-outline-secondary btn-sm">Login</button>
                </form>)}
                {this.state.loggedIn ? (<span className="logout"><button className="btn btn-outline-secondary btn-sm" onClick={this.handleClickLogout}>Log out</button></span>) : null}
                </div>
                </div>
                <div className={this.state.menuIsOpened ? "top-menu-with-sidebar-open" : "top-menu-with-sidebar-close"}>
                    {this.state.showPopup ? <RegisterPopUp closePopup={this.togglePopup.bind(this)} /> : null}
                </div>
            </div>
        );
    }
}

export default Topnav;