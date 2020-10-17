import "bootstrap/dist/css/bootstrap.min.css";
import 'normalize.css'
import 'animate.css/animate.css'
import './index.scss'

import * as serviceWorker from './serviceWorker';

import { applyMiddleware, compose, createStore } from "redux";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";
import { loadState, saveState } from "./redux/localStorage";

import App from './App';
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import {firebaseConfig} from "./firebase";
import mainReducer from "./redux/reducer";

const persistedState = loadState();


const config = {
  // TOGGLE_TODO will not be triggered in other tabs
  blacklist: ['SET_LOAD_COMPARE'],
};
const middlewares = [createStateSyncMiddleware(config)];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);

const store = createStore(mainReducer, persistedState, enhancer);

store.subscribe(() => {
  saveState(store.getState());
});

firebase.initializeApp(firebaseConfig);
firebase.analytics();
initMessageListener(store);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
