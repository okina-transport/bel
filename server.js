var webpack = require("webpack");
var convictConfig = require("./config/convict.js");
var express = require("express");
var app = express();
var port = process.env.port || 9000;
var fs = require("fs");

convictConfig
.then(convict => {
  var ENDPOINTBASE = convict.get("endpointBase");

  console.info("ENDPOINTBASE is set to", ENDPOINTBASE);

  app.use(ENDPOINTBASE + "public/", express.static(__dirname + "/public"));

  if (process.env.NODE_ENV !== "production") {
    let config = require("./webpack.config");

    config.output.publicPath = ENDPOINTBASE + "public/";

    var compiler = new webpack(config);

    app.use(
      require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        stats: { colors: true }
      })
    );
    app.use(require("webpack-hot-middleware")(compiler));
  } else {
    // expose build bundle for production
    app.get(ENDPOINTBASE + "public/bundle.js", function(req, res) {
      res.sendFile(__dirname + "/public/bundle.js");
    });

  }

  app.get(ENDPOINTBASE + "config.json", function(req, res) {
    var cfg = {
      providersBaseUrl: convict.get("providersBaseUrl"),
      eventsBaseUrl: convict.get("eventsBaseUrl"),
      endpointBase: convict.get("endpointBase"),
      timetableAdminBaseUrl: convict.get("timetableAdminBaseUrl"),
      chouetteBaseUrl: convict.get('chouetteBaseUrl')
    };

    createKeyCloakConfig(convict.get("authServerUrl"));

    res.send(cfg);
  });

  app.get(ENDPOINTBASE + "_health", function(req, res) {
    res.sendStatus(200);
  });

  app.get(ENDPOINTBASE + "config/keycloak.json", function(req, res) {
    res.sendFile(__dirname + "/config/keycloak.json");
  });

  app.get(ENDPOINTBASE + "translations/en/actions.js", function(req, res) {
    res.sendFile(__dirname + "/translations/translations/en/actions.js");
  });

  app.get(ENDPOINTBASE + 'doc/MAN-NA-RMRPA-V3.0.pdf', function(req, res) {
    res.sendFile(__dirname + '/doc/MAN-NA-RMRPA-V3.0.pdf');
  });

  app.get(ENDPOINTBASE + 'doc/MAN-NA-RMRTOPO-V1.1.pdf', function(req, res) {
    res.sendFile(__dirname + '/doc/MAN-NA-RMRTOPO-V1.1.pdf');
  });

  app.get(ENDPOINTBASE + 'doc/RMR-CharteNommage-V5.0.pdf', function(req, res) {
    res.sendFile(__dirname + '/doc/RMR-CharteNommage-V5.0.pdf');
  });

  app.get(ENDPOINTBASE + 'doc/RMR-GuideMethodo-V2.0.pdf', function(req, res) {
    res.sendFile(__dirname + '/doc/RMR-GuideMethodo-V2.0.pdf');
  });

  app.get(ENDPOINTBASE + 'doc/RMR-WEBINAR-19_12_2017-V1.0.pdf', function(req, res) {
    res.sendFile(__dirname + '/doc/RMR-WEBINAR-19_12_2017-V1.0.pdf');
  });

  app.get(ENDPOINTBASE + 'doc/RMR-WEBINAR-20_03_2018-V1.0.pdf', function(req, res) {
    res.sendFile(__dirname + '/doc/RMR-WEBINAR-20_03_2018-V1.0.pdf');
  });

  app.get(ENDPOINTBASE + 'doc/RMR-WEBINAR-24_04_2018-V2.0.pdf', function(req, res) {
    res.sendFile(__dirname + '/doc/RMR-WEBINAR-24_04_2018-V2.0.pdf');
  });

  app.get(ENDPOINTBASE + 'doc/WEBINAR_0006_V1.0-Formation_aux_outils_RMR_et_Mise_en_qualite_des_donnees-08-01-2019.pdf', function(req, res) {
    res.sendFile(__dirname + '/doc/WEBINAR_0006_V1.0-Formation_aux_outils_RMR_et_Mise_en_qualite_des_donnees-08-01-2019.pdf');
  });

  app.get(ENDPOINTBASE, function(req, res) {
    res.send(getPage());
  });

  app.get(ENDPOINTBASE + '*', function (req, res) {
    res.redirect(ENDPOINTBASE);
  });

  app.listen(port, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info(
        "==> Listening on port %s. Open up http://localhost:%s%s in your browser.",
        port,
        port,
        ENDPOINTBASE
      );
    }
  });

  const createKeyCloakConfig = authServerUrl => {
    let config = {
      realm: "Naq",
      "tokens-not-before": 1490857383,
      "public-client": true,
      "auth-server-url": authServerUrl,
      resource: "neti-frontend"
    };
    fs.writeFileSync(
      "./config/keycloak.json",
      JSON.stringify(config),
      "utf8"
    );
  };

  const getPage = () =>
    `<!DOCTYPE html>
     <html>
      <head>
        <title>BEL: Operational status</title>
      </head>
      <body>
        <div id="root">
        </div>
        ${getBundles()}
      </body>
    </html>`;

  const getBundles = () => {
    if (process.env.NODE_ENV === "production") {
      return `
        <script src="${ENDPOINTBASE}public/bundle.js"></script>
      `;
    }
    return `<script src="${ENDPOINTBASE}public/bundle.js"></script>`;
  };
})
.catch(function(err) {
  console.error("Unable to load convict configuration", err);
});
