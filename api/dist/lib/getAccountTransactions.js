"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionData = getTransactionData;
exports.callAPIForData = callAPIForData;
exports.objectMap = objectMap;

var _lodash = _interopRequireDefault(require("lodash"));

var _axios = _interopRequireDefault(require("axios"));

var _refreshAccessToken = _interopRequireDefault(require("./refreshAccessToken"));

var _models = require("../db/mongo/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function collateTransactionData(transactions, callback) {
  var newArray = _lodash["default"].groupBy(transactions, function (transaction) {
    return transaction.timestamp.substring(0, 10);
  });

  callback(newArray);
}

function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function (result, key) {
    result[key] = mapFn(object[key], key);
    return result;
  }, {});
}

function callAPIForData(_x, _x2, _x3, _x4) {
  return _callAPIForData.apply(this, arguments);
}

function _callAPIForData() {
  _callAPIForData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(accountId, googleId, from, to) {
    var accessToken, config;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            debugger;
            _context2.next = 3;
            return _models.Accounts.findOne({
              google_id: googleId
            }).exec().then(function (doc) {
              return doc.tl_access_token;
            })["catch"](function (e) {
              console.log(e);
            });

          case 3:
            accessToken = _context2.sent;
            config = {
              headers: {
                'Authorization': "Bearer ".concat(accessToken)
              }
            };
            return _context2.abrupt("return", _axios["default"].get("https://api.truelayer.com/data/v1/accounts/".concat(accountId, "/transactions?from=").concat(from, "&to=").concat(to), config));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _callAPIForData.apply(this, arguments);
}

function getTransactionData(accountId, googleId, from, to) {
  debugger;
  return callAPIForData(accountId, googleId, from, to).then(function (response) {
    var collatedData = {};
    collateTransactionData(response.data.results, function (transactions) {
      collatedData = objectMap(transactions, function (date, key) {
        return {
          date: key,
          count: date.length,
          transactions: date
        };
      });
    });
    return collatedData;
  })["catch"](
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(e.response);

              if (!(e.response.status === 401)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return (0, _refreshAccessToken["default"])(googleId);

            case 4:
              return _context.abrupt("return", getTransactionData(accountId, from, to));

            case 7:
              return _context.abrupt("return", e);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x5) {
      return _ref.apply(this, arguments);
    };
  }());
}