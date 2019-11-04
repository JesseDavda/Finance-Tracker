"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("./store"));

var _querystring = _interopRequireDefault(require("querystring"));

var _models = require("../db/mongo/models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function refreshAccessToken(_x) {
  return _refreshAccessToken.apply(this, arguments);
}

function _refreshAccessToken() {
  _refreshAccessToken = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(googleId) {
    var refreshToken, refreshBody, config;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(googleId === undefined)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", 'googleId is undefined');

          case 2:
            _context2.next = 4;
            return _models.Accounts.findOne({
              google_id: googleId
            }).exec().then(function (doc) {
              return doc !== null ? doc.tl_refresh_token : 0;
            })["catch"](function (e) {
              console.log("There was an error finding the account: ", e);
              return 0;
            });

          case 4:
            refreshToken = _context2.sent;
            refreshBody = {
              grant_type: "refresh_token",
              client_id: process.env.TRUE_LAYER_CLIENT_ID,
              client_secret: process.env.TRUE_LAYER_CLIENT_SECRET,
              refresh_token: refreshToken
            };
            config = {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            };

            if (!(refreshToken !== 0)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", _axios["default"].post('https://auth.truelayer.com/connect/token', _querystring["default"].stringify(refreshBody), config).then(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(response) {
                var updateObject;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        console.log('Token Has Been refreshed!');
                        updateObject = {
                          tl_access_token: response.data.access_token,
                          tl_refresh_token: response.data.refresh_token
                        };
                        _context.next = 4;
                        return _models.Accounts.findOneAndUpdate({
                          google_id: googleId
                        }, {
                          $set: _objectSpread({}, updateObject)
                        }, {
                          "new": true
                        }).exec().then(function (doc) {
                          console.log('saved!');
                        })["catch"](function (e) {
                          console.log("There was an error updating the data: ", e.response.data);
                        });

                      case 4:
                        return _context.abrupt("return", response.data.access_token);

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (e) {
              console.log(e.response.data);
              return e.response.data;
            }));

          case 11:
            return _context2.abrupt("return", null);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _refreshAccessToken.apply(this, arguments);
}

var _default = refreshAccessToken;
exports["default"] = _default;