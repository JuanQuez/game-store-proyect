import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cartProduct';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { filterProductsThunk } from '../store/slices/products.slice';

const ProductsDetail = () => {

    const { id } = useParams()
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()

    const productsSuggested = useSelector(state => state.products)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setIsLoading(true));
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProduct(res.data)
                dispatch(filterProductsThunk(res.data.categoryId))
            })
            .finally(() => dispatch(setIsLoading(false)));
    }, [id])

    const [productId, setProductId] = useState("")

    const addToCart = (id) => {
        const addCart = {
            quantity: 1,
            productId: product.id
        }
        dispatch(addCartThunk(addCart))
    }


    return (
        <div>
            <input type="number" value={productId} onChange={e => setProductId(e.target.value)} />
            <button onClick={addToCart} >Add to cart</button>
            <Row>
                <Col md={7}>
                    <Carousel fade>
                        <Carousel.Item interval={2000}>
                            <img
                                style={{ height: 400, objectFit: 'contain' }}
                                className="d-block w-100"
                                src={product.images?.[0].url}
                            />
                            <Carousel.Caption>
                                <h3>{product.category?.name}</h3>
                                <p>{product.brand}</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item interval={2000}>
                            <img
                                style={{ height: 400, objectFit: 'contain' }}
                                className="d-block w-100"
                                src={product.images?.[1].url}
                            />
                            <Carousel.Caption>
                                <h3>{product.category?.name}</h3>
                                <p>{product.brand}</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item interval={2000}>
                            <img
                                style={{ height: 400, objectFit: 'contain' }}
                                className="d-block w-100"
                                src={product.images?.[2].url}
                            />
                            <Carousel.Caption>
                                <h3>{product.category?.name}</h3>
                                <p>{product.brand}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>

                <Col md={5}>
                    <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
                    <Card.Title>{product.title}</Card.Title>
                    <p>{product.description}</p>
                </Col>
            </Row>

            <h2>Discover similar games</h2>

            <Row xs={1} md={2} lg={3} className="g-4">
                {productsSuggested.map(productItem => (
                    <Col key={productItem.id}>
                        <Card onClick={() => navigate(`/product/${productItem.id}`)}>
                            <Card.Img
                                variant="top"
                                style={{ height: 200, objectFit: 'contain' }}
                                src={productItem.images[0].url} />
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{productItem.brand}</Card.Subtitle>
                                <Card.Title>{productItem.title}</Card.Title>
                                <br />
                                <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                                <Card.Title>$ {productItem.price} USD</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductsDetail;