/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

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
