import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
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
            <h1>Home</h1>
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

            {
                categories.map(category => (
                    <button key={category.id}
                        onClick={() => dispatch(filterProductsThunk(category.id))}
                    >{category.name}</button>
                ))
            }

            <ul>
                {
                    productsList.map(product => (
                        <li key={product.id} onClick={() => navigate(`/product/${product.id}`)} >
                            <h2>{product.title}</h2>
                            <br />
                            <img src={product.images[0].url} alt="product-image" style={{ width: 300 }} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;