"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _refreshAccessToken = _interopRequireDefault(require("../lib/refreshAccessToken"));

var router = _express["default"].Router();

router.get('/refreshTLToken', function (req, res) {
  var googleId = req.query.google_id;
  (0, _refreshAccessToken["default"])(googleId);
});
var _default = router;
exports["default"] = _default;