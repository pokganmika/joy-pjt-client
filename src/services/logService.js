import Raven from 'raven-js';

function init() {
  Raven.config('https://6885ea3482154a249d6c8718c182e21b@sentry.io/1360652', {
    relese: '1-0-0',
    environment: 'development-test'
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
