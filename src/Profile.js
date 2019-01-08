import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    state = {
        user: [null,null,null,0,0,0],
        maxPullups: 0,
        maxPushups: 0,
        maxSquats: 0,
        password1: null,
        password2: null,
    }

    handleSubmitReps = (e) => {
        console.log({'id': this.props.user['id'], 'pullups': this.state.maxPullups, 'pushups': this.state.maxPushups, 'squats': this.state.maxSquats});
        axios.post('http://localhost:5000/api/updateReps', {'id': this.state.user[0], 'pullups': this.state.maxPullups, 'pushups': this.state.maxPushups, 'squats': this.state.maxSquats}).then((response) => {
            console.log(response);
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    handleClick = (e) => {
        console.log(this.state);
        console.log(this.checkPasswordMatch());
    }

    checkPasswordMatch() {
        if(this.state.password1 === this.state.password2) {
            return true;
        }
        return false;
    }

    handleSubmitPass = (e) => {
        axios.post('http://localhost:5000/api/updatePassword', {'id': this.props.user['id'], 'password': this.state.password1}).then((response) => {
            console.log(response);
        });
    }

    render() {
        return(
            <div className="profile">
                <h1 style={{textAlign:"center", marginBottom:"30px"}} >Hi {this.props.user['username']} !</h1>
                <form onSubmit={this.handleSubmitReps}>
                    <label className="label">UPDATE MAX REPS IN PULL UPS </label>
                    <input min="0" value={this.state.maxPullups} id="maxPullups" type="number" className="input-number" onChange={this.handleChange} />
                    <label className="label-max label">CURRENT MAX : {this.props.user['pullups']}</label>
                    <br />

                    <label className="label">UPDATE MAX REPS IN PUSH UPS</label>
                    <input min="0" value={this.state.maxPushups} id="maxPushups" type="number" className="input-number" onChange={this.handleChange} />
                    <label className="label-max label">CURRENT MAX : {this.props.user['pushups']}</label>
                    <br />

                    <label className="label">UPDATE MAX REPS IN SQUATS UPS</label>
                    <input min="0" value={this.state.maxSquats} id="maxSquats" type="number" className="input-number" onChange={this.handleChange} />
                    <label className="label-max label">CURRENT MAX : {this.props.user['squats']}</label>
                    <br />

                    <button className="btn btn-outline-secondary btn-dark btn-sm">SET NEW MAX REPS</button>
                </form>
                <br />
                <form onSubmit={this.handleSubmitPass}>
                    <h2 className="h1-pass">CHANGE PASSWORD</h2>

                    <label className="label">NEW PASSWORD</label>
                    <input id="password1" className="input-pass" type="password" onChange={this.handleChange} required/>
                    <br />

                    <label className="label">CONFIRM NEW PASSWORD</label>
                    <input id="password2" className="input-pass" type="password" onChange={this.handleChange} required/>
                    <br />

                    <button className="btn btn-outline-secondary btn-dark btn-sm" onClick={this.handleSubmitPass}>SET NEW PASSWORD</button>
                </form>
                <br />
            </div>
        );
    }
}

export default Profile;