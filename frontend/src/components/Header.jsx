import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <div className="container">
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
    </div>
  </Navbar>
);

export default Header;
