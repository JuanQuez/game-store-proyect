import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkCartThunk, getCartThunk } from '../store/slices/cartProduct';

const CartSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    return (
        <div>
            <Offcanvas placement='bottom' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart.map(product => (
                        <div key={product.id} >
                                <h1>{product.product.title}</h1>
                                <img style={{ height: 200, objectFit: 'contain' }} className='img-fluid' src={product.product.images[1].url} />
                        </div>
                    ))}
                    <button onClick={() => dispatch(checkCartThunk())} >Checkout</button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default CartSidebar;