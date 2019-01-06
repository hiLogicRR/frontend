import React, { Component } from 'react';
import axios from 'axios';

class Rankings extends Component {
    state = {
        users: [],
        sortingOrder: true,
        searchUsers: [],
        search: ''
    };

    componentDidMount() {
        axios.get('http://localhost:5000/api/users')
        .then((response) => {
            //Perform action based on response
            console.log(response.data);
            this.setState({
                users: response.data,
                searchUsers: response.data
            })
        })
        .catch((error) => {
            console.log(error);
            //Perform action based on error
        });
    }

    handleClick = (e) => {
        const users = [...this.state.users];
        const key = e.target.id;
        users.sort((a,b) => {
              return this.state.sortingOrder ? (a[key] > b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0) : (a[key] < b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
        });
        const sortingOrder = !this.state.sortingOrder;
        this.setState({
            users: users,
            sortingOrder: sortingOrder
        });
    }

    handleKeyUp = (e) => {
        console.log(e.target.value);
    }

    render() {
        this.state.users.map(user => {
            user.pullups = user.pullups ? user.pullups : 0;
            user.pushups = user.pushups ? user.pushups : 0;
            user.squats = user.squats ? user.squats : 0;
            return user;
        });
        const usersList = this.state.users.map(user => {
            return(
                <tr key={user.id}>
                    <th>{user.username}</th>
                    <th>{user.pullups}</th>
                    <th>{user.pushups}</th>
                    <th>{user.squats}</th>
                </tr>
            )
        })
        return(
            <div id="ranking-table" className="rankings">
                <input type="text" className="search form-control" onKeyUp={this.handleKeyUp} placeholder="&#128269; search ... " />
                <table>
                    <thead>
                        <tr>
                            <th id="username" className="sort-column" onClick={this.handleClick}>Username ▼▲</th>
                            <th id="pullups" className="sort-column" onClick={this.handleClick}>pullups ▼▲</th>
                            <th id="pushups" className="sort-column" onClick={this.handleClick}>pushups ▼▲</th>
                            <th id="squats" className="sort-column" onClick={this.handleClick}>squats ▼▲</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Rankings;