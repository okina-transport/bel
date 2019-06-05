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
      default: "http://127.0.0.1:16001/services/providers/",
      env: "PROVIDERS_BASE_URL"
    },
    eventsBaseUrl: {
      doc: "Base URL for for Events API including slash",
      format: "url",
      default: "http://127.0.0.1:9004/services/events/",
      env: "EVENTS_BASE_URL"
    },
    timetableAdminBaseUrl: {
      doc: "Base URL for for Timatable admin API including slash",
      format: "url",
      default: "http://127.0.0.1:8888/services/timetable_admin/",
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
      default: "https://auth-rmr.nouvelle-aquitaine.pro/auth",
      env: "AUTH_SERVER_URL"
    },
    chouetteBaseUrl: {
      doc: "URL to Chouette UI",
      format: String,
      default: "http://127.0.0.1:3000/",
      env: "CHOUETTE_BASE_URL"
    }
  });

  // If configuration URL exists, read it and update the configuration object
  var configUrl = conf.get('configUrl');

  console.log("configUrl", configUrl);

  if ( configUrl.indexOf("do_not_read") == -1 ) {
      // Read contents from configUrl if it is given

      if (configUrl.indexOf("http") == -1) {
          fs.readFile(configUrl, (error, data) => {
              if (!error) {
                  data = JSON.parse(data)
                  conf.load(data);
                  conf.validate();
                  resolve(conf)
              } else {
                  reject("Could not load data from " + configUrl, error)
              }
          });
      } else {
          request(configUrl, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  body = JSON.parse(body)
                  conf.load(body);
                  conf.validate();
                  resolve(conf)
              } else {
                  reject("Could not load data from " + configUrl, error)
              }
          });
      }
  } else {
    console.log("The CONFIG_URL element has not been set, so you use the default dev-mode configuration")
    conf.validate();
    resolve(conf)
  }
})
