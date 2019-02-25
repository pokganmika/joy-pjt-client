import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

// set up our composeEnhancers function, baed on the existence of the
// DevTools extension when creating the store
const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(logger, ReduxThunk, routerMiddleware(history))
    )
  );
  return store;
}

// export default store;
