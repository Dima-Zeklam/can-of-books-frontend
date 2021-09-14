import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import './Header.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
// import Login from './Login';


class Header extends React.Component {
  render() {
    const {  isAuthenticated  } = this.props.auth0;
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        
        <Navbar.Brand style={{color:'red'}}>My Favorite Books</Navbar.Brand>
        <Link to="/" style={{margin:'10px'}}>Home</Link>
        <Link to="/profile" style={{margin:'10px'}}>Profile</Link>
        <Link to="/books" style={{margin:'10px'}}>IT Books</Link>
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
        { ( isAuthenticated ? <LogoutButton /> : <LoginButton />)}
      
      </Navbar>
    );
  }
}

export default withAuth0(Header);
