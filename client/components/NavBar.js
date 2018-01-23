/**
 * Created by hazem on 17/01/2018.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import {logoutUser,fetchConnectedUser} from '../actions';


class NavBar extends Component {
componentDidMount(){
    this.props.dispatch(fetchConnectedUser());

}
    render(){
        const { dispatch, isAuthenticated, user } = this.props

        return (

           <Navbar fluid collapseOnSelect>
        <Navbar.Header >
        <Navbar.Brand>
        <Link to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>


        {isAuthenticated ?
            <Nav pullRight>
                <NavDropdown title={user.email}>
                    <MenuItem href="/profile">Profile</MenuItem>
                    <MenuItem onClick={()=>{dispatch(logoutUser())}}>Log out</MenuItem>
                </NavDropdown>
            </Nav>
            :<Nav pullRight><NavItem href="/register" >Register</NavItem>
                <NavItem href="/login">Login</NavItem></Nav>
    }

    </Navbar.Collapse>
    </Navbar>
       )
   }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        user: state.user.user

    }
}
NavBar = connect(mapStateToProps)(NavBar);
export default NavBar;