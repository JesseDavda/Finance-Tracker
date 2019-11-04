"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _analayseRepeatingPayments = require("../lib/analayseRepeatingPayments");

var _getAccountTransactions = require("../lib/getAccountTransactions");

var _refreshAccessToken = require("../lib/refreshAccessToken");

var _moment = _interopRequireDefault(require("moment"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

function getTransactions(_x, _x2, _x3, _x4) {
  return _getTransactions.apply(this, arguments);
}

function _getTransactions() {
  _getTransactions = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(accountId, googleId, from, to) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _getAccountTransactions.callAPIForData)(accountId, googleId, from, to).then(function (response) {
              return response;
            })["catch"](
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(e) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var accountId, googleId, from, to, transactions, analysedData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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