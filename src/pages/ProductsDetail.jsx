import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.images?.[1].url} />
            <p>{product.description}</p>
            {
                productsSuggested.map(productItem => (
                    <li key={productItem.id}
                        onClick={() => navigate(`/product/${productItem.id}`)}
                    >{productItem.title}</li>
                ))
            }
        </div>
    );
};

export default ProductsDetail;