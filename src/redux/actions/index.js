import axios from 'axios';
import { 
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_USERS,
    GET_CATEGORIES,
    ORDER_BY_PRICE,
    ORDER_BY_NAME,
    FILTER_BY_CATEGORY,
    GET_PRODUCT_BY_NAME,
    CLEAR_MARKET,
    CLEAN_USER,
    CREATE_USER,
    UPDATE_USER,
    GET_USER_BY_ID,
    ADD_TO_CART,
    CLEAN_CART,
    REMOVE_ITEM_FROM_CART,
    ADD_TO_TOTAL,
    LESS_TO_TOTAL,
    UPDATE_POST,
    GET_COMMENTS_BY_ID,
    REMOVE_STATE,
    GET_POST_BY_ID,
    UPDATE_CART
} from '../actionTypes';


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

export function getUsers() {
    return async (dispatch) => {
        try {
            const data = await axios(`https://dpower-production.up.railway.app/users`).then(e => e.data);
            return dispatch({
                type: GET_USERS,
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
    return { type: GET_CATEGORIES }
}

export function createUser(info) {
    return async (dispatch) => {
        try {
            const usuario = {
                id: info.email,
                name: info.name,
                mail: info.email,
                username: info.nickname,
                avatar: info.picture,
                powers: 0
            }
            const data = await axios.post(`https://dpower-production.up.railway.app/users`, usuario)
            axios.post(`https://dpower-production.up.railway.app/users/email/${usuario.id}`)
            return dispatch({
                type: CREATE_USER,
                payload: data
            })
        } catch (err) {
            console.log('ERROR DE VERIFICACION : ', err)
        }
    }
}

export function getUserById(id) {
    return async (dispatch) => {
        try {
            const data = await axios.get(`https://dpower-production.up.railway.app/users/${id}`)
            return dispatch({
                type: GET_USER_BY_ID,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function updateUser(info) {
    return async (dispatch) => {
        try {
            const data = await axios.put(`https://dpower-production.up.railway.app/users/${info.mail}`, info)
            return dispatch({
                type: UPDATE_USER,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function updatePost(info) {
    return async (dispatch) => {
        try {
            const likesPowers = {
                likes: info.likes,
                powersGained: info.powers
            }
            const data = await axios.put(`https://dpower-production.up.railway.app/post/${info.id}`, likesPowers)
            return dispatch({
                type: UPDATE_POST,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function updateCart(products) {
    return async (dispatch) => {
        try {
            products.map( async (el) => {
                await axios.put(`https://dpower-production.up.railway.app/products/${el.id}/${el.stock - el.total}`)
            })
            return dispatch({
                type: UPDATE_CART,
                payload: []
            })
        } catch (error) {
            console.log(error)
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

export function addToCart(product) {
    return { type: ADD_TO_CART, payload: product }
}

export function removeItemFromCart(id) {
    return { type: REMOVE_ITEM_FROM_CART, payload: id }
}

export function cleanCart() {
    return { type: CLEAN_CART }
}

export function addToTotal(id) {
    return { type: ADD_TO_TOTAL, payload: id }
}

export function lessToTotal(id) {
    return { type: LESS_TO_TOTAL, payload: id}
}


export function getCommentsById(id) {
    return async (dispatch) => {
        try {
            const data = await axios.get(`https://dpower-production.up.railway.app/post/${id}`).then(e => e.data.Comments)
            return dispatch({
                type: GET_COMMENTS_BY_ID,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getpostById(id) {
    return async (dispatch) => {
        try {
            const data = await axios.get(`https://dpower-production.up.railway.app/post/${id}`).then(e => e.data)
            return dispatch({
                type: GET_POST_BY_ID,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const postComments = (payload) => {
    return async function() {
        const create = await axios.post('https://dpower-production.up.railway.app/comments', payload);
        return create
    }
}

const removeState = (payload) => {
    return {
        type: REMOVE_STATE
    }
}

export{
    postComments,
    removeState,
}
