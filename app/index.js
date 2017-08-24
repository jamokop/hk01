import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../components/App';
import payment from '../reducers/index';
require('./index.css');


const store = createStore(payment);


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);