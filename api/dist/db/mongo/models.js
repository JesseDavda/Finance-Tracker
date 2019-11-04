"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accounts = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _schemas = require("./schemas.js");

var Accounts = _mongoose["default"].model('Account', _schemas.accountSchema, 'Account');

exports.Accounts = Accounts;