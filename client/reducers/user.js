/**
 * Created by hazem on 17/01/2018.
 */
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST} from '../constants';
import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST} from '../constants';
import { LOGOUT_SUCCESS, LOGOUT_REQUEST} from '../constants';
import { CONNECTED_USER_REQUEST,CONNECTED_USER_RECEIVE,NO_CONNECTED_USER} from '../constants';
import { auth } from '../Firebase';
import getInitialState from '../components/helper';



let INITIAL_STATE = {
        isFetching: false,
        isAuthenticated: false,
        user: null
};

 function user  (state=INITIAL_STATE,action)  {
    switch (action.type){
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.email
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.email
            })
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
            })
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case CONNECTED_USER_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: action.user
            })
        case CONNECTED_USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                user: null
            })
        case NO_CONNECTED_USER:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                user: null
            })
        default: return state;
    }
};
 export default user;