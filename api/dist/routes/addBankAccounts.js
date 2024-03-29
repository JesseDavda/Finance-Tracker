"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = _interopRequireDefault(require("express"));

var _models = require("../db/mongo/models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var router = _express["default"].Router();

router.post('/addLinkedBankAccounts/:google_id', function (req, res) {
  var googleId = req.params.google_id;
  var reqBody = req.body;
  var newAccounts = {
    linked_bank_accounts: reqBody.current_accounts
  };
  reqBody.accounts_to_add.map(function (account) {
    return newAccounts.linked_bank_accounts.push(account);
  });

  _models.Accounts.findOneAndUpdate({
    google_id: googleId
  }, {
    $set: _objectSpread({}, newAccounts)
  }, {
    "new": true
  }).exec().then(function (updatedDoc) {
    res.status(200).json({
      accounts: updatedDoc.linked_bank_accounts
    }).end();
  })["catch"](function (e) {
    console.log(e);
    res.status(400).json({
      error: e
    }).end();
  });
});
var _default = router;
exports["default"] = _default;