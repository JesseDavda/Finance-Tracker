"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _refreshAccessToken = _interopRequireDefault(require("../lib/refreshAccessToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/refreshTLToken', function (req, res) {
  var googleId = req.query.google_id;
  (0, _refreshAccessToken["default"])(googleId);
});
var _default = router;
exports["default"] = _default;