"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _store = _interopRequireDefault(require("./store.js"));

var _axios = _interopRequireDefault(require("axios"));

var _refreshAccessToken = _interopRequireDefault(require("./refreshAccessToken.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  _getBalance = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(account_id) {
    var response, _response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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