import axios from 'axios';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, GET_CATEGORIES, ORDER_BY_PRICE, ORDER_BY_NAME,
FILTER_BY_CATEGORY, GET_PRODUCT_BY_NAME, CLEAR_MARKET, CLEAN_USER, CREATE_USER } from '../actionTypes';



export function getAllProducts() {
    return async (dispatch) => {
        try {
            const data = await axios(`https://dpower-production.up.railway.app/products`).then(e => e.data);
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
            const data = await axios(`https://dpower-production.up.railway.app/products/${id}`).then(e => e.data);
            return dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function getCategories() {
    return async (dispatch) => {
        try {
            const data = await axios(`https://dpower-production.up.railway.app/products`).then(e => e.data);
            return dispatch({
                type: GET_CATEGORIES,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function createUser(info) {
    return async (dispatch) => {
        try {
            const usuario = {
                id: info.exp,
                name: info.name,
                mail: info.email,
                username: info.nickname,
                avatar: info.picture
            }
            const data = await axios.post(`https://dpower-production.up.railway.app/users`, usuario)
            return dispatch({
                type: CREATE_USER,
                payload: data
            })
        } catch (err) {
            console.log('ERROR DE VERIFICACION : ', err)
        }
    }
}

export function orderByPrice(payload) {
    return { type: ORDER_BY_PRICE, payload }
}

export function orderByName(payload) {
    return { type: ORDER_BY_NAME, payload }
}

export function filterByCategory(payload) {
    return { type: FILTER_BY_CATEGORY, payload }
}

export function getProductByName(payload) {
    return { type: GET_PRODUCT_BY_NAME, payload }
}

export function clearMarket() {
    return { type: CLEAR_MARKET }
}

export function cleanUser() {
    return { type: CLEAN_USER }
}