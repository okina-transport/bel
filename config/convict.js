var convict = require('convict');
var request = require('request');
var fs = require('fs');

module.exports = new Promise(function(resolve, reject){
  var conf = convict({
    env: {
      doc: "The applicaton environment.",
      format: ["production", "development"],
      default: "development",
      env: "NODE_ENV"
    },
    configUrl: {
      doc: "URL for where to read the configuration",
      format: "*",
      default: "http://rutebanken.org/do_not_read",
      env: "CONFIG_URL"
    },
    providersBaseUrl: {
      doc: "Base URL for for Providers API including slash",
      format: "url",
      default: "https://api-test.entur.org/providers/1.0/",
      env: "PROVIDERS_BASE_URL"
    },
    eventsBaseUrl: {
      doc: "Base URL for for Events API including slash",
      format: "url",
      default: "https://api-test.entur.org/events/1.0/",
      env: "EVENTS_BASE_URL"
    },
    timetableAdminBaseUrl: {
      doc: "Base URL for for Timatable admin API including slash",
      format: "url",
      default: "https://api-test.entur.org/timetable_admin/1.0/",
      env: "TIMETABLE_ADMIN_BASE_URL"
    },
    endpointBase: {
      doc: "Namespace for client including slash, e.g. /admin/bel/",
      format: String,
      default: "/",
      env: "ENDPOINTBASE"
    },
    authServerUrl: {
      doc: "URL to keycloak auth server",
      format: String,
      default: "https://www-test.entur.org/auth",
      env: "AUTH_SERVER_URL"
    },
    chouetteBaseUrl: {
      doc: "URL to Chouette UI",
      format: String,
      default: "https://rutedb-test.entur.org/",
      env: "CHOUETTE_BASE_URL"
    }
  });

  // If configuration URL exists, read it and update the configuration object
  var configUrl = conf.get('configUrl');

  console.log("configUrl", configUrl);

  if ( configUrl.indexOf("do_not_read") == -1 ) {
    // Read contents from configUrl if it is given
    request( configUrl, function( error, response, body ) {
      if ( !error && response.statusCode == 200 ) {
        body = JSON.parse(body)
        conf.load(body);
        conf.validate();
        resolve(conf)
      } else {
        reject("Could not load data from " + configUrl, error)
      }
    });
  } else {
    console.log("The CONFIG_URL element has not been set, so you use the default dev-mode configuration")
    conf.validate();
    resolve(conf)
  }
})
