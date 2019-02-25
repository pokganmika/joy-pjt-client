import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store/configureStore';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import newTheme from './theme';

import App from './App';
import logger from './services/logService';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

logger.init();

const store = configureStore();

ReactDOM.render(
  <MuiThemeProvider theme={newTheme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept();
}
