import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utils/updateObject";

const initialState = {
    ingredients: {},
    totalPrice: 4,
    pulledIngredients: false,
    purchasable: false,
    purchasing: false,
    error: false,
}

const INGREDIENTS_PRICES = {
    salad: 0.3, bacon: 0.7, meat: 1.6, cheese: 0.4
}

const fetchIngredientsSuccess = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients, totalPrice: 4, pulledIngredients: true, purchasable: false, purchasing: false
    });
}
const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: action.error});
}
const addIngredient = (state, action) => {
    // update ing
    let updatedIngredientValue = state.ingredients[action.ingredientName] + 1;
    let updatedTotalPrice = state.totalPrice + INGREDIENTS_PRICES[action.ingredientName];
    // update ingredients object
    let updatedIngredients = updateObject(state.ingredients,
        {[action.ingredientName]: updatedIngredientValue})
    // update totalPrice
    let purchasableUpdate = updatedTotalPrice > 4;
    // update state
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: updatedTotalPrice,
        purchasable: purchasableUpdate,
        purchasing: true
    });
}
const removeIngredient = (state, action) => {
    // update ing
    const newIngredientValue = state.ingredients[action.ingredientName] - 1;
    const newTotalPrice = state.totalPrice - INGREDIENTS_PRICES[action.ingredientName];
    let removePurchasableUpdate = newTotalPrice > 4;
    let updatedPurchasing = newTotalPrice > 4;
    // update ingredients object
    const newIngredients = updateObject(state.ingredients, {[action.ingredientName]: newIngredientValue})
    // update state
    return updateObject(state, {
        purchasable: removePurchasableUpdate,
        ingredients: newIngredients,
        totalPrice: newTotalPrice,
        purchasing: updatedPurchasing
    });
}

export const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS_SUCCESS:
            return fetchIngredientsSuccess(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action)
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state, action)
        default:
            return state
    }
}
