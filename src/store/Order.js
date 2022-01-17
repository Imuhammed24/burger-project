import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utils/updateObject";

const initialState = {
    orders: [],
    loading: true,
    error: false,
};

const fetch_order_success = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
    });
}

const fetch_order_failed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true,
    });
}

export const order = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetch_order_success(state, action)
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetch_order_failed(action, state)
        default:
            return state
    }
}
