import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducers from '../reducers';
import * as types from '../actions/actionTypes';
import { routerReducer } from 'react-router-redux';

export default function configureStore(kc) {
  const loggerMiddleware = createLogger();

  var enchancer = {};

  if (process.env.NODE_ENV === 'development') {
    enchancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  } else {
    enchancer = compose(applyMiddleware(thunkMiddleware));
  }

  const initialState = {
    userReducer: {
      isModalOpen: false,
      isReportModalOpen: false,
      reportViewType: 'ALL',
      fileUpload: {
        progress: 0,
        state: types.FILE_UPLOAD_NOT_STARTED
      },
      kc: kc,
      path: '/'
    }
  };

  const combinedReducer = combineReducers({
    routing: routerReducer,
    ...reducers
  });

  let store = createStore(combinedReducer, initialState, enchancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
