/**
 * Created by hazem on 15/01/2018.
 */
import { auth } from '../Firebase';
import {LOGIN_SUCCESS,LOGIN_FAILURE,LOGIN_REQUEST} from '../constants';
import {REGISTER_SUCCESS,REGISTER_FAILURE,REGISTER_REQUEST} from '../constants';
import {LOGOUT_FAILURE,LOGOUT_REQUEST,LOGOUT_SUCCESS} from '../constants';
import {CONNECTED_USER_RECEIVE,CONNECTED_USER_REQUEST,NO_CONNECTED_USER} from '../constants';
function requestLogin(email) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        email
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}
export function loginUser(email,password,history) {
    return (dispatch) => {
        auth.signOut();
        console.log('request')
        dispatch(requestLogin(email));

        auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch(receiveLogin(user));
                history.push('/')
                console.log('login success');
            })
            .catch(error => {
                dispatch(loginError(error.message));
                console.log('login fails');
            })

    }
}
function requestRegister(email) {
    return {
        type: REGISTER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        email
    }
}

function receiveRegister(user) {
    return {
        type: REGISTER_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: user,
        message: 'A verification email has been sent to your address please consider verifying your account'
    }
}

function registerError(message) {
    return {
        type: REGISTER_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}
export function registerUser(email,password,history) {
    
    return (dispatch) => {
        dispatch(requestRegister(email));
        auth.createUserWithEmailAndPassword(email, password)
            .then(user => {
                dispatch(receiveRegister(user))
                history.push('/profile')

            user.sendEmailVerification();
            ;
        })
            .catch(err =>{
                    dispatch(registerError(err.message));
                }
            );

    }
    
}
function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
        user: null
    }
}



// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        auth.signOut().then(
            dispatch(receiveLogout()));

    }
}
function requestConnectedUser(){
    return {
        type: CONNECTED_USER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        user: null
    }
}
function receiveConnectedUser(user){
    return {
        type: CONNECTED_USER_RECEIVE,
        isFetching: false,
        isAuthenticated: true,
        user: user
    }
}
function noConnectedUser(){
    return {
        type: NO_CONNECTED_USER,
        isFetching: false,
        isAuthenticated: false,
        user: null
    }
}
export function fetchConnectedUser() {
    return dispatch => {
        dispatch(requestConnectedUser());
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(receiveConnectedUser(user))
                console.log('user Found')
            } else {
                dispatch(noConnectedUser())
                console.log('user Not Found')
            }

        })
    }
}