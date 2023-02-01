import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { filterProductsThunk, getProductsThunk, searchProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const productsList = useSelector(state => state.products)

    const [productsSearch, setProductsSearch] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
            .then(res => setCategories(res.data))
    }, [])

    return (
        <div>
            <Row>
                <Col md={3}>
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Category</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {
                                        categories.map(category => (
                                            <ListGroup.Item key={category.id}
                                                onClick={() => dispatch(filterProductsThunk(category.id))}>{category.name}</ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>

                <Col md={9}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search game"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productsSearch}
                            onChange={e => setProductsSearch(e.target.value)}
                        />
                        <Button
                            onClick={() => dispatch(searchProductsThunk(productsSearch))} variant="outline-secondary" id="button-addon2"
                        >
                            Button
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {productsList.map(product => (
                            <Col key={product.id}>
                                <Card onClick={() => navigate(`/product/${product.id}`)}>
                                    <Card.Img
                                        variant="top"
                                        style={{ height: 200, objectFit: 'contain' }}
                                        src={product.images[0].url} />
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
                                        <Card.Title>{product.title}</Card.Title>
                                        <br />
                                        <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                                        <Card.Title>$ {product.price}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;