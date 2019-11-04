"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _mongoDB = _interopRequireDefault(require("./db/mongo/mongoDB"));

var _serveStatic = _interopRequireDefault(require("serve-static"));

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
app.use('/static', (0, _serveStatic["default"])(_path["default"].join(__dirname, '../../client/build/static'))); // app.get('*', (req, res) => {
//     res.sendFile('index.html', {root: path.join(__dirname, '../../client/build/')});
// });

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
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server listening on port: ", PORT);
});