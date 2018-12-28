import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import './App.css';

const Sidebar = ({ menuIsOpened }) => {
    return(
        <HashRouter>
            <nav className="navbar-dark bg-dark sidebar">
                <ul className="list-unstyled components">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/example">Example</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </nav>
        </HashRouter>
    )
}

export default Sidebar;