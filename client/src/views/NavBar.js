import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import LoginView from './LoginView';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';

import './NavBar.css';


export default function NavBar(props) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    
    <Navbar bg="light" expand="lg" sticky="top">
      <Container className='NavBar'>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

    {
        props.user
        ?   <Navbar.Collapse id="basic-navbar-nav">
                
                <div className='leftAlignedNav'>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/rooms">Zimmer / Apartments verwalten</Nav.Link>

                        <Nav.Link href="/admin/bookings">Buchungsanfragen / Verfügbarkeiten verwalten</Nav.Link>

                        <Nav.Link href="/admin/users">Users verwalten</Nav.Link>
                    </Nav>
                </div>
                

                <div className='rightAlignedNav'>
                    <Nav className="me-auto">
                        <Navbar.Text>
                            Signed in as: {props.user.username}
                        </Navbar.Text>

                        <Button onClick={props.logoutCb}>
                            Logout
                        </Button>
                    </Nav>
                </div>

            </Navbar.Collapse>

        :   <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">

                <div className='leftAlignedNav'>
                <Nav.Link href="#home">Kleinbreitenbach und Umgebung</Nav.Link>
                <Nav.Link href="#link">Über uns</Nav.Link>
                </div>

                <div className='rightAlignedNav'>
                <NavDropdown title="Wohnungen" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Familienwohnung</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Singlewohnung</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Zimmer" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Stallzimmer</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Gästezimmer Reinsberge</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Gästezimmer Bettelborn</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#link">Preise</Nav.Link>
                <Nav.Link href="#link">Kontakt</Nav.Link>
                </div>
                
                </Nav>
            </Navbar.Collapse>
    }
        
      </Container>
    </Navbar>
  )
}
