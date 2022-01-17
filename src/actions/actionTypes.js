import axios from "axios";

export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS';


export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILED = 'FETCH_ORDERS_FAILED';


export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: FETCH_INGREDIENTS_SUCCESS, ingredients: ingredients,
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: FETCH_INGREDIENTS_FAILED, error: true
    }
}

export const addIngredients = (ingredientName) => {
    return {
        type: ADD_INGREDIENTS, ingredientName: ingredientName
    }
}

export const removeIngredients = (ingredientName) => {
    return {
        type: REMOVE_INGREDIENTS, ingredientName: ingredientName
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
            if (response.data) {
                dispatch(fetchIngredientsSuccess(response.data))
            }
        }).catch(error => {
            dispatch(fetchIngredientsFailed(error))
        })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS, orders: orders
    }
}


export const fetchOrdersFailed = (error) => {
    return {
        type: FETCH_ORDERS_FAILED, error: true
    }
}

export const fetchOrders = () => {
    return dispatch => {
        axios.get('/orders.json').then(response => {
            if (response.data) {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        key: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            }
        }).catch(error => {
            dispatch(fetchOrdersFailed(error))
        })
    }
}