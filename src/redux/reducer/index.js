import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, GET_CATEGORIES, ORDER_BY_PRICE, ORDER_BY_NAME,
FILTER_BY_CATEGORY, GET_PRODUCT_BY_NAME, CLEAR_MARKET, CLEAN_USER, CREATE_USER, UPDATE_USER,
GET_USER_BY_ID, ADD_TO_CART, REMOVE_ITEM_FROM_CART, CLEAN_CART, ADD_TO_TOTAL, LESS_TO_TOTAL, UPDATE_POST, GET_USERS,
GET_COMMENTS_BY_ID, REMOVE_SELECTED_COMMENT, REMOVE_STATE, UPDATE_CART, GET_POST_BY_ID  } from "../actionTypes";


const initialState = {
    allProducts: [],
    filterProducts: [],
    detail: [],
    categories: [],
    user: [],
    userById: [],
    cart: [],
    comments: [],
    postbyid: []
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
            }
        case GET_USERS:
            return {
                ...state,
                user: action.payload,
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
            const productByName = state.allProducts.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                detail: productByName
            }
        case GET_CATEGORIES:
            const categoriesfilter = [...state.allProducts]
            const reduceCategories = categoriesfilter.map(e => e.category).reduce((acc, current) => {
                if (!acc.includes(current)) {
                    acc.push(current)
                }
                return acc;
            }, [])
            return {
                ...state,
                categories: reduceCategories
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
        case UPDATE_POST:
            return {
                ...state
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
            const all = [...state.allProducts]
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
        case REMOVE_ITEM_FROM_CART:
            const productDelete = state.cart.filter(e => e.id !== action.payload);
            return {
                ...state,
                cart: productDelete
            }
        case CLEAN_CART:
            return {
                ...state,
                cart: []
            }
        case ADD_TO_TOTAL:
            return {
                ...state,
                cart: [...state.cart, state.cart.find(e => e.id === action.payload).total += 1]
            }
        case LESS_TO_TOTAL:
            return {
                ...state,
                cart: [...state.cart, state.cart.find(e => e.id === action.payload).total -= 1]
            }
        case GET_COMMENTS_BY_ID:
            return{
                ...state,
                comments: action.payload
            }
        case REMOVE_STATE:
            return {
                ...state,
                comments: [],
                postbyid: [],
                userById: [],
                }
        case UPDATE_CART:
            return {
                ...state,
                cart: action.payload
            }
        case GET_POST_BY_ID:
            return{
                ...state,
                postbyid: action.payload
            }
        default:
        return { ...state };
    }
}
export default reducer;