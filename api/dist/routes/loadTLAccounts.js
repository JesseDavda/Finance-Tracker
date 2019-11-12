"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _refreshAccessToken = _interopRequireDefault(require("../lib/refreshAccessToken.js"));

var _models = require("../db/mongo/models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var router = _express["default"].Router();

function getBalances(_x, _x2) {
  return _getBalances.apply(this, arguments);
}

function _getBalances() {
  _getBalances = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(accounts, access_token) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Promise.all(accounts.map(function (account) {
              var config = {
                headers: {
                  "Authorization": "Bearer ".concat(access_token)
                }
              };
              return _axios["default"].get("https://api.truelayer.com/data/v1/accounts/".concat(account.account_id, "/balance"), config).then(function (response) {
                return _objectSpread({
                  balance: response.data.results[0]
                }, account);
              })["catch"](function (e) {
                return _objectSpread({
                  balance: {
                    current: "Balance not found"
                  }
                }, account);
              });
            }));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getBalances.apply(this, arguments);
}

function callForAccounts(_x3) {
  return _callForAccounts.apply(this, arguments);
}

function _callForAccounts() {
  _callForAccounts = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(googleId) {
    var accessToken, config;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("This is the google id: ", googleId);
            _context4.next = 3;
            return _models.Accounts.findOne({
              google_id: googleId
            }).exec().then(function (doc) {
              console.log("This is the doc returned from findOne: ", doc);
              return doc === null ? doc : doc.tl_access_token;
            })["catch"](function (e) {
              console.log(e);
            });

          case 3:
            accessToken = _context4.sent;
            config = {
              headers: {
                "Authorization": "Bearer ".concat(accessToken)
              }
            };

            if (!(accessToken !== null || accessToken !== undefined)) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", _axios["default"].get('https://api.truelayer.com/data/v1/accounts', config).then(function (response) {
              console.log(response);
              return getBalances(response.data.results, accessToken).then(function (res) {
                return res;
              });
            })["catch"](
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(e) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _refreshAccessToken["default"])(googleId);

                      case 2:
                        return _context3.abrupt("return", callForAccounts());

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x8) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 9:
            return _context4.abrupt("return", false);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _callForAccounts.apply(this, arguments);
}

function addAccounts(_x4, _x5) {
  return _addAccounts.apply(this, arguments);
}

function _addAccounts() {
  _addAccounts = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(googleId, accounts) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _models.Accounts.findOneAndUpdate({
              google_id: googleId
            }, {
              $set: {
                linked_bank_accounts: accounts
              }
            }, {
              "new": true
            }).exec().then(function (doc) {
              return doc._doc;
            })["catch"](function (e) {
              return e;
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _addAccounts.apply(this, arguments);
}

router.get('/loadAccounts',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var googleId, accounts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            googleId = req.query.google_id;
            accounts = [];
            _context.prev = 2;
            _context.next = 5;
            return callForAccounts(googleId);

          case 5:
            accounts = _context.sent;
            console.log(accounts); // try {
            // accounts = await addAccounts(googleId, accounts).linked_bank_accounts;

            res.status(200).json(accounts).end(); // } catch(e) {
            //     console.log(e);
            // }

            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function (_x6, _x7) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;