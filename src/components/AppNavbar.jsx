import React, { useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk, searchProductsThunk } from '../store/slices/products.slice';
import CartSidebar from './CartSidebar';

const AppNavbar = () => {

    const dispatch = useDispatch()
    const [productsSearch, setProductsSearch] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

/*         const navigate = useNavigate()
    
        const logout = () => {
            localStorage.setItem("token", "")
            navigate('/login')
        }  */

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar  bg="light" expand="md">
                <Container>
                    <Navbar.Brand href="/">Covenant</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/#/login">Login</Nav.Link>
                            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                            <Nav.Link onClick={handleShow} >Cart</Nav.Link>
                            <Nav.Link  /* onClick={logout} */ >Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <InputGroup className="mb-4">
                        <Form.Control
                            placeholder="Search game"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            type="search"
                            value={productsSearch}
                            onChange={e => setProductsSearch(e.target.value)}
                        />
                        <Button
                            type="submit"
                            onClick={() => dispatch(searchProductsThunk(productsSearch))} variant="outline-secondary" id="button-addon2"
                        >
                            Button
                        </Button>
                    </InputGroup>
                </Container>
            </Navbar>

            <CartSidebar show={show} handleClose={handleClose} />
        </>
    );
};

export default AppNavbar;