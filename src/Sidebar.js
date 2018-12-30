import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import './App.css';

const Sidebar = ({ menuIsOpened }) => {
    return(
        <HashRouter>
            <nav className="sidebar">
                <ul className="list-unstyled components">
                    <li className="first-level-sidebar-item"><NavLink to="/" className="sidebar-item">Home</NavLink></li>
                    <li className="first-level-sidebar-item"><NavLink to="/profile" className="sidebar-item">Profile</NavLink></li>
                    <li className="first-level-sidebar-item">
                        <a href="#training-submenu" data-toggle="collapse" className="dropdown-toggle sidebar-item">Training</a>
                        <ul className="list-unstyled collapse" id="training-submenu">
                            <li className="second-level-sidebar-item"><NavLink to="/mytrainings" className="sidebar-item">My Trainings</NavLink></li>
                            <li className="second-level-sidebar-item"><NavLink to="/addtraining" className="sidebar-item">Add Training</NavLink></li>
                        </ul>
                    </li>
                    <li className="first-level-sidebar-item"><NavLink to="/rankings" className="sidebar-item">Rankings</NavLink></li>
                    <li className="first-level-sidebar-item"><NavLink to="/about" className="sidebar-item">About</NavLink></li>
                    <li className="first-level-sidebar-item"><NavLink to="/contactus" className="sidebar-item">Contact Us</NavLink></li>
                </ul>
            </nav>
        </HashRouter>
    )
}

export default Sidebar;