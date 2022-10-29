import axios from 'axios';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, ALERT_SUCCESSFUL } from '../actionTypes';

export function getAllProducts() {
    return async (dispatch) => {
        try {
            const data = await axios(`https://fakestoreapi.com/products`).then(e => e.data);
            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function getProductById(id) {
    return async (dispatch) => {
        try {
            const data = await axios(`https://fakestoreapi.com/products/${id}`).then(e => e.data);
            return dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function testAlert() {
    return { type: ALERT_SUCCESSFUL, payload: 'ANDUVO' }
}