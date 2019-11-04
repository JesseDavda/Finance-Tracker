"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("../lib/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var access_token = _store["default"].get('TRUE_LAYER_ACCESS_TOKEN');

var router = _express["default"].Router();

router.get('/getBalance', function (req, res) {
  var accountId = req.query.accountId;
  var config = {
    headers: {
      'Authorization': "Bearer ".concat(access_token)
    }
  };

  _axios["default"].get("https://api.truelayer.com/data/v1/accounts/".concat(accountId, "/balance"), config).then(function (response) {
    var balanceObj = {
      currency: response.data.results[0].currency,
      current_balance: response.data.results[0].current
    };
    res.status(200).json(balanceObj).end();
  })["catch"](function (e) {
    console.log(e.response.data);
  });
});
var _default = router;
exports["default"] = _default;