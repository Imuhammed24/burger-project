import axios from "axios";
import {FETCH_ORDERS_FAILED, ADD_ORDER, FETCH_ORDERS_SUCCESS} from "./actionTypes";


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

export const addOrder = (orderData) => {
    return {
        type: ADD_ORDER, orderData: orderData
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        let queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParam).then(response => {
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