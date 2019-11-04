"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _models = require("../db/mongo/models");

var router = _express["default"].Router();

router.get('/getAccountInfo/:google_id', function (req, res) {
  var googleId = req.params.google_id;

  _models.Accounts.findOne({
    google_id: googleId
  }).exec().then(function (doc) {
    var resObject = {
      first_name: doc.first_name,
      last_name: doc.last_name,
      picture_uri: doc.picture_uri
    };
    res.status(200).json(resObject).end();
  })["catch"](function (e) {
    console.log("Error: ", e);
    res.status(400).json({
      error: e
    }).end();
  });
});
var _default = router;
exports["default"] = _default;