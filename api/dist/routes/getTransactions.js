"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("../lib/store"));

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

var _getAccountTransactions = require("../lib/getAccountTransactions");

var router = _express["default"].Router();

router.get('/transactions',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var googleId, accountTransactions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debugger;
            googleId = req.query.google_id;

            if (!(req.query.google_id !== undefined && req.query.accountId !== undefined)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return (0, _getAccountTransactions.getTransactionData)(req.query.accountId, googleId, "", "").then(function (response) {
              res.status(200).json(response).end();
            });

          case 5:
            accountTransactions = _context.sent;
            _context.next = 9;
            break;

          case 8:
            res.status(400).json({
              error_message: "Request made with incomplete parameters!"
            }).end();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;