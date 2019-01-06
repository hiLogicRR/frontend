import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import './App.css';

const Sidebar = ({ loggedIn }) => {
    return(
        <HashRouter>
            <nav className="sidebar">
                <ul className="list-unstyled components">
                    <li className="first-level-sidebar-item"><NavLink to="/" className="sidebar-item">Home</NavLink></li>
                    <li className="first-level-sidebar-item"><NavLink to="/profile" 
                    className={loggedIn ? "sidebar-item activated" : "sidebar-item disabled"}>Profile</NavLink></li>
                    <li className="first-level-sidebar-item">
                        <a href="#training-submenu" data-toggle="collapse" 
                        className={loggedIn ? "dropdown-toggle sidebar-item activated" : "dropdown-toggle sidebar-item disabled"}>Training</a>
                        <ul className="list-unstyled collapse" id="training-submenu">
                            <li className="second-level-sidebar-item"><NavLink to="/mytrainings" className="sidebar-item">My Trainings</NavLink></li>
                            <li className="second-level-sidebar-item"><NavLink to="/addtraining" className="sidebar-item">Add Training</NavLink></li>
                        </ul>
                    </li>
                    <li className="first-level-sidebar-item"><NavLink to="/rankings" className={loggedIn ? "sidebar-item activated" : "sidebar-item disabled"}>Rankings</NavLink></li>
                    <li className="first-level-sidebar-item"><NavLink to="/about" className="sidebar-item">About</NavLink></li>
                    <li className="first-level-sidebar-item"><NavLink to="/contactus" className="sidebar-item">Contact Us</NavLink></li>
                </ul>
            </nav>
        </HashRouter>
    )
}

export default Sidebar;