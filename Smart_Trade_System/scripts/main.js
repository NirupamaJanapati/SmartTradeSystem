import 'babel-polyfill';
import 'fastclick';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../styles/main.scss';
import '../styles/table.scss';
import '../styles/maps.scss';
import '../styles/login.scss';
import '../styles/trade.scss';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
