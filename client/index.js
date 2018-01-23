import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import todoApp from './reducers'
import App from './components/App'
import './index.css'

let middleware = applyMiddleware(thunk,logger);
let store = createStore(todoApp,middleware);

render(
    <Provider store={store}>

            <App />

    </Provider>,
    document.getElementById('root')
)