import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, ALERT_SUCCESSFUL } from "../actionTypes";

const initialState = {
    allProducts: [],
    product: [],
    alert: ''
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: state.allProducts.length ? state.allProducts : action.payload
            }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            }
        case ALERT_SUCCESSFUL:
            return {
                ...state,
                alert: action.payload
            }
        default:
        return { ...state };
    }
}

export default reducer;