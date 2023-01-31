import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setproducts: (state, action) => {
            const products = action.payload
            return products
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products`)
        .then(res => dispatch(setproducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const filterProductsThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then(res => dispatch(setproducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const searchProductsThunk = (productsSearch) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${productsSearch}`)
        .then(res => dispatch(setproducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setproducts } = productsSlice.actions;

export default productsSlice.reducer;
