import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.LOGOUT
    }
}

export const setAuthTimeout = expirationTime => {
    let expTime = expirationTime
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout())
        }, expTime)
    }
}

export const authSuccess = (authData) => {
    let expirationDate = new Date(new Date().getTime() + authData.expiresIn);
    localStorage.setItem('token', authData.idToken)
    localStorage.setItem('userId', authData.localId)
    localStorage.setItem('expirationDate', expirationDate)
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: authData.localId,
        token: authData.idToken,
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}


export const checkAuthState = () => {
    return dispatch => {
        let token = localStorage.getItem('token')
        if (!token){
            dispatch(logout())
        }
        let expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()){
            dispatch(logout())
        } else{
            // fit to format accepted for authSuccess
            let updatedExpirationDate = expirationDate.getTime() - new Date().getTime();
            let userId = localStorage.getItem('userId')
            dispatch(authSuccess({idToken: token, localId: userId, expiresIn: updatedExpirationDate}))
            dispatch(setAuthTimeout(expirationDate.getTime() - new Date().getTime()))
        }
    }
}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {email: email, password: password, returnSecureToken: true};
        let url = ''
        if (isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJMs49bJm42JOC95R3ADIIt_14aouT1_g'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJMs49bJm42JOC95R3ADIIt_14aouT1_g'
        }
        axios.post(url, authData).then(response => {
            response.data.expiresIn = response.data.expiresIn * 1000
            dispatch(authSuccess(response.data))
            // convert to milliseconds

            dispatch(setAuthTimeout(response.data.expiresIn))
        }).catch(error => {
            dispatch(authFailed(error))
        })
    }
}
