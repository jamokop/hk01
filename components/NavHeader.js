import React from 'react';
import {
  NavLink
} from 'react-router-dom';

const NavHeader = () => {
    return (
            <ul className="nav-list">
                <li>
                    <NavLink exact activeClassName="active" to="/">Payment Form</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/query">Checking Form</NavLink>
                </li>
            </ul>
    );
}


export default NavHeader;