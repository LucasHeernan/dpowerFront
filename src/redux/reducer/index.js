import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, GET_CATEGORIES, ORDER_BY_PRICE, ORDER_BY_NAME,
FILTER_BY_CATEGORY, GET_PRODUCT_BY_NAME, CLEAR_MARKET, CLEAN_USER, CREATE_USER, UPDATE_USER,
GET_USER_BY_ID, ADD_TO_CART } from "../actionTypes";

const initialState = {
    allProducts: [],
    filterProducts: [],
    detail: [],
    categories: [],
    user: [],
    userById: [],
    cart: []
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts:  action.payload,    
            }
        case CLEAR_MARKET:
            return {
                ...state,
                filterProducts: [],
                detail: [],
            }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                detail: action.payload
            }
        case GET_PRODUCT_BY_NAME:
            const productByName = state.allProducts.filter(e => e.name.includes(action.payload))
            return {
                ...state,
                detail: productByName
            }
        case GET_CATEGORIES:
            const categoriesfilter = state.allProducts.map(e => e.category)
            return {
                ...state,
                categories: categoriesfilter
            }
        case GET_USER_BY_ID:
            return {
                ...state,
                userById: [action.payload]
            }
        case CREATE_USER:
            return {
                ...state,
                user: [action.payload]
            }
        case UPDATE_USER:
            return {
                ...state,
                user: [...state.user, action.payload]
            }
        case ORDER_BY_PRICE:
            let allProductsPPrice = [...state.allProducts]
            allProductsPPrice = allProductsPPrice.sort((a, b) => {
                if (action.payload === 'more to less') return b.price - a.price;
                if (action.payload === 'less to more') return a.price - b.price;
                return 0
            })
            let filterProductsPPrice = [...state.filterProducts]
            filterProductsPPrice = filterProductsPPrice.sort((a, b) => {
                if (action.payload === 'more to less') return b.price - a.price;
                if (action.payload === 'less to more') return a.price - b.price;
                return 0
            })
            return {
                ...state,
                filterProducts: state.filterProducts.length ? filterProductsPPrice : allProductsPPrice
            }
        case ORDER_BY_NAME:
            let abc = [...state.allProducts];
            abc = abc.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return action.payload === 'A - Z' ? -1 : 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return action.payload === 'Z - A' ? -1 : 1;
                return 0
            })
            let filterProductsAbc = [...state.filterProducts];
            filterProductsAbc = filterProductsAbc.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return action.payload === 'A - Z' ? -1 : 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return action.payload === 'Z - A' ? -1 : 1;
                return 0
            })
            return {
                ...state,
                filterProducts: state.filterProducts.length ? filterProductsAbc : abc
            }
        case FILTER_BY_CATEGORY:
            const all = state.allProducts
            const filterCategories = all.filter(e => e.category === action.payload)
            return {
                ...state,
                filterProducts: filterCategories
            }
        case CLEAN_USER:
            return {
                ...state,
                user: []
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        default:
        return { ...state };
    }
}

export default reducer;