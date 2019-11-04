"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _getAndStoreUserInfo = require("../lib/getAndStoreUserInfo");

var router = _express["default"].Router();

var GOOGLE_CODE_EXCHANGE_URL = 'https://oauth2.googleapis.com/token';
router.post('/googleOAuthTokenHandler', function (req, res) {
  console.log(req.body);
  var code = req.body.code;
  console.log("The process: ", process.env);
  console.log(process.env.GOOGLE_OAUTH_CLIENT_ID);
  var codeExchangeBody = {
    code: code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_SECRET,
    redirect_uri: 'postmessage',
    grant_type: 'authorization_code'
  };

  _axios["default"].post(GOOGLE_CODE_EXCHANGE_URL, codeExchangeBody).then(function (response) {
    (0, _getAndStoreUserInfo.storeUserInfo)(response.data.access_token).then(function (data) {
      res.status(200).json(data).end();
    })["catch"](function (e) {
      res.status(500).json(e.response.data).end();
    });
  })["catch"](function (e) {
    console.log(e.response.data);
  });
});
var _default = router;
exports["default"] = _default;