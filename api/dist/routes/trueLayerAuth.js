"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = _interopRequireDefault(require("express"));

var _querystring = _interopRequireDefault(require("querystring"));

var _axios = _interopRequireDefault(require("axios"));

var _models = require("../db/mongo/models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var router = _express["default"].Router();

router.get('/getTrueLayerAccessToken', function (req, res) {
  var googleId = JSON.parse(req.cookies['snapshot_user_account']).google_id;
  var postObject = {
    grant_type: 'authorization_code',
    client_id: process.env.TRUE_LAYER_CLIENT_ID,
    client_secret: process.env.TRUE_LAYER_CLIENT_SECRET,
    redirect_uri: process.env.TRUE_LAYER_REDIRECT_URI,
    code: req.query.code
  };
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  _axios["default"].post('https://auth.truelayer.com/connect/token', _querystring["default"].stringify(postObject), config).then(function (response) {
    var updateObject = {
      tl_access_token: response.data.access_token,
      tl_refresh_token: response.data.refresh_token
    };

    _models.Accounts.findOneAndUpdate({
      google_id: googleId
    }, {
      $set: _objectSpread({}, updateObject)
    }, {
      "new": true
    }, function (err, doc) {
      if (err) console.log("There was an error updating the data: ", err);else res.redirect('/');
    });
  })["catch"](function (e) {
    console.log(e.response.data);
    res.redirect('/');
  });
});
var _default = router;
exports["default"] = _default;