"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("../lib/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/getTransactionFrequency', function (req, res) {
  var config = {
    headers: {
      'Authorization': "Bearer ".concat(_store["default"].get('TRUE_LAYER_ACCESS_TOKEN'))
    }
  };

  _axios["default"].get("https://api.truelayer.com/data/v1/accounts/".concat(accountId, "/transactions?from=&to="), config).then(function (response) {
    response;
  });
});
var _default = router;
exports["default"] = _default;