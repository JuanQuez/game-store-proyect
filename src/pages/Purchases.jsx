import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            {purchases.map(purchase => (
                <h2 onClick={() => navigate(`/product/${purchase.product.id}`)}
                >{purchase.product?.title}
                </h2>
            ))}
        </div>
    );
};

export default Purchases;