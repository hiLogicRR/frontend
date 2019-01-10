import React, { Component } from 'react';
import axios from 'axios';

class Rankings extends Component {
    state = {
        users: [],
        sortingOrder: true,
        searchUsers: [],
        search: '',
        searchEnabled: false
    };

    componentDidMount() {
        axios.get('http://localhost:5000/api/users')
        .then((response) => {
            //Perform action based on response
            console.log(response.data);
            this.setState({
                users: response.data,
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
        if(e.target.value === '') 
        {
            this.setState({
                search: e.target.value,
                searchEnabled: false,
                searchUsers: this.state.users
            });
        }
        else {
            this.setState({
                search: e.target.value,
                searchEnabled: true,
                searchUsers: this.state.users
            });
        }
        if(this.state.search !== '') {
            console.log('here');
            const searchUsers = this.state.users.filter(user => {
                console.log('here2');
            return user['username'].includes(this.state.search);
            });
            this.setState({
                searchUsers: searchUsers,
                searchEnabled: true
            });
            console.log(this.state.searchUsers);
        }
        else {
            this.setState({
                searchUsers: this.state.users,
                searchEnabled: false
            });
        }
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
        const searchUsersHTML = this.state.searchUsers.map(user => {
            return(
                <tr key={user['id']}>
                    <th>{user['username']}</th>
                    <th>{user['pullups']}</th>
                    <th>{user['pushups']}</th>
                    <th>{user['squats']}</th>
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
                        {this.state.search ? searchUsersHTML : usersList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Rankings;