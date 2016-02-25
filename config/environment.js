/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'kube-admin',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      persistSession: true,
      version: process.env.KUBE_ADMIN_VERSION
    },

    flashMessageDefaults: {
      timeout: 4000,
      types: ['1', '2', '3', '4', '5', '6', 'positive', 'negative', 'info']
    },

    contentSecurityPolicy: {
      'default-src': ["'none'"],
      'script-src':  ["'self'"],
      'font-src':    ["'self'", "https://fonts.gstatic.com", "data:"],
      'connect-src': ["'self'" , "*"],
      'img-src':     ["'self'", "data:"],
      'style-src':   ["'self'", "'unsafe-inline'", "http://fonts.googleapis.com"],
      'media-src':   ["'self'"]
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.persistSession = false;
  }

  if (environment === 'production') {

  }

  return ENV;
};
