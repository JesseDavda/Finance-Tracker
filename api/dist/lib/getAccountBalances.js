"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _store = _interopRequireDefault(require("./store.js"));

var _axios = _interopRequireDefault(require("axios"));

var _refreshAccessToken = _interopRequireDefault(require("./refreshAccessToken.js"));

var access_token = _store["default"].get('TRUE_LAYER_ACCESS_TOKEN');

function requestBalance(account_id) {
  var config = {
    headers: {
      'Authorization': "Bearer ".concat(access_token)
    }
  };
  return _axios["default"].get("https://api.truelayer.com/data/v1/accounts/".concat(account_id, "/balance"), config);
}

function getBalance(_x) {
  return _getBalance.apply(this, arguments);
}

function _getBalance() {
  _getBalance = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(account_id) {
    var response, _response;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return requestBalance(account_id);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.data.results[0].current);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            _context.next = 11;
            return (0, _refreshAccessToken["default"])();

          case 11:
            _context.next = 13;
            return requestBalance(account_id);

          case 13:
            _response = _context.sent;
            return _context.abrupt("return", _response.data.results[0].current);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getBalance.apply(this, arguments);
}

var _default = getBalance;
exports["default"] = _default;