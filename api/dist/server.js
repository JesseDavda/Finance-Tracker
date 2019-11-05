"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _mongoDB = _interopRequireDefault(require("./db/mongo/mongoDB"));

var FinanceTracker = _interopRequireWildcard(require("./config/spa.config"));

var _expressHistoryApiFallback = _interopRequireDefault(require("express-history-api-fallback"));

var _trueLayerAuth = _interopRequireDefault(require("./routes/trueLayerAuth"));

var _refreshTLToken = _interopRequireDefault(require("./routes/refreshTLToken"));

var _loadTLAccounts = _interopRequireDefault(require("./routes/loadTLAccounts"));

var _getAccountBalance = _interopRequireDefault(require("./routes/getAccountBalance"));

var _getTransactions = _interopRequireDefault(require("./routes/getTransactions"));

var _getAverageDailySpend = _interopRequireDefault(require("./routes/getAverageDailySpend"));

var _getPredictedPayments = _interopRequireDefault(require("./routes/getPredictedPayments"));

var _googleLoginHandler = _interopRequireDefault(require("./routes/googleLoginHandler"));

var _addBankAccounts = _interopRequireDefault(require("./routes/addBankAccounts"));

var _getAccountInfo = _interopRequireDefault(require("./routes/getAccountInfo"));

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());

function getAssetPath() {
  return _path["default"].join(__dirname, "../client/build/static");
}

app.use(_express["default"]["static"]('../client/build')); // app.use(fallback('index.html', {root: path.join(__dirname, '../client/build')}));

app.get('/', function (req, res) {
  res.sendFile(_path["default"].resolve(getAssetPath(), "".concat(FinanceTracker.getRedirectName(), ".html")), {
    etag: false
  });
});
app.get('/:entryPoint', function (req, res) {
  if (req.params.entryPoint.toLowerCase() === 'myaccounts' || req.params.entryPoint.toLowerCase() === "login") {
    res.sendFile(_path["default"].resolve(getAssetPath(), req.params.entryPoint), {
      etag: false
    });
  } else {
    res.redirect(303, '/');
  }
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server listening on port: ", PORT);
});
app.use(_trueLayerAuth["default"]);
app.use(_refreshTLToken["default"]);
app.use(_loadTLAccounts["default"]);
app.use(_getAccountBalance["default"]);
app.use(_getTransactions["default"]);
app.use(_getAverageDailySpend["default"]);
app.use(_getPredictedPayments["default"]);
app.use(_googleLoginHandler["default"]);
app.use(_addBankAccounts["default"]);
app.use(_getAccountInfo["default"]);