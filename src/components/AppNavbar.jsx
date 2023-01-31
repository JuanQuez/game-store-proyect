import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const AppNavbar = () => {
    return (
        <Navbar fixed='top' bg="light" expand="md">
            <Container>
                <Navbar.Brand href="/">Covenant</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/#/login">Login</Nav.Link>
                        <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                        <Nav.Link>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;