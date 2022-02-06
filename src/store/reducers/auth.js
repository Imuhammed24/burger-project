import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/updateObject";

const initialState = {
    token: null, userId: null, loading: false, error: false
}

const authSuccess = (state, actions) => {
    return updateObject(state, {loading: false, error: false, userId: actions.userId, token: actions.token})
}
const logout = (state, actions) => {
    return updateObject(state, {loading: false, error: false, userId: null, token: null})
}

const auth = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, actions);
        case actionTypes.LOGOUT:
            return logout(state, actions);
        case actionTypes.AUTH_START:
            return updateObject(state, {loading: true});
        case actionTypes.AUTH_FAILED:
            return updateObject(state, {loading: false, error: true});
        default:
            return state
    }
}

export default auth;
