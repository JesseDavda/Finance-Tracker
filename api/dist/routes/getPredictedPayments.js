"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _analayseRepeatingPayments = require("../lib/analayseRepeatingPayments");

var _getAccountTransactions = require("../lib/getAccountTransactions");

var _refreshAccessToken = require("../lib/refreshAccessToken");

var _moment = _interopRequireDefault(require("moment"));

var _axios = _interopRequireDefault(require("axios"));

var router = _express["default"].Router();

function getTransactions(_x, _x2, _x3, _x4) {
  return _getTransactions.apply(this, arguments);
}

function _getTransactions() {
  _getTransactions = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(accountId, googleId, from, to) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _getAccountTransactions.callAPIForData)(accountId, googleId, from, to).then(function (response) {
              return response;
            })["catch"](
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(e) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!(e.response.status === 401)) {
                          _context2.next = 6;
                          break;
                        }

                        _context2.next = 3;
                        return (0, _refreshAccessToken.refreshAccessToken)(googleId);

                      case 3:
                        return _context2.abrupt("return", getTransactions(accoundId, googleId, from, to));

                      case 6:
                        console.log("Error: ", e);
                        return _context2.abrupt("return", 0);

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x7) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getTransactions.apply(this, arguments);
}

router.get('/recurringPayments',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var accountId, googleId, from, to, transactions, analysedData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debugger;
            accountId = req.query.accountId;
            googleId = req.query.google_id;
            from = (0, _moment["default"])().subtract(1, 'year').format('YYYY-MM-DD'), to = (0, _moment["default"])().subtract(1, 'day').format('YYYY-MM-DD');
            _context.next = 6;
            return getTransactions(accountId, googleId, from, to);

          case 6:
            transactions = _context.sent;
            analysedData = transactions.hasOwnProperty("data") ? (0, _analayseRepeatingPayments.analysePayments)(transactions.data.results) : {
              "error": "No data returned"
            };
            res.status(200).json(analysedData).end();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x5, _x6) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;