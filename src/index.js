import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {applyMiddleware} from "redux";
import App from './containers/App/App';
import {order} from "./store/reducers/Order";
import {burgerBuilder} from "./store/reducers/BurgerBuilder";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import auth from "./store/reducers/auth";

axios.defaults.baseURL = 'https://burger-builder-3aa92-default-rtdb.firebaseio.com/';

const rootReducer = combineReducers({
    order: order,
    burgerBuilder: burgerBuilder,
    auth: auth,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    <React.StrictMode>{app}</React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
