"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _models = require("../db/mongo/models");

var _lodash = _interopRequireDefault(require("lodash"));

var router = _express["default"].Router();

function checkIfUserExists(googleId) {
  return _models.Accounts.findOne({
    google_id: googleId
  }).exec().then(function (data) {
    return !_lodash["default"].isEmpty(data);
  })["catch"](function (e) {
    return false;
  });
}

router.get('/validateUser',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var googleId, exists;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.cookies.hasOwnProperty('snapshot_user_account')) {
              _context.next = 8;
              break;
            }

            googleId = JSON.parse(req.cookies['snapshot_user_account']).google_id;
            _context.next = 4;
            return checkIfUserExists(googleId);

          case 4:
            exists = _context.sent;
            res.status(200).json({
              valid: exists
            }).end();
            _context.next = 9;
            break;

          case 8:
            res.status(200).json({
              valid: false
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