import axios from "axios";
import {ADD_INGREDIENTS, FETCH_INGREDIENTS_FAILED, FETCH_INGREDIENTS_SUCCESS, REMOVE_INGREDIENTS} from "./actionTypes";

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: FETCH_INGREDIENTS_SUCCESS, ingredients: ingredients,
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: FETCH_INGREDIENTS_FAILED, error: error
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