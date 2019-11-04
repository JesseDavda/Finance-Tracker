"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accounts = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _schemas = require("./schemas.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Accounts = _mongoose["default"].model('Account', _schemas.accountSchema, 'Account');

exports.Accounts = Accounts;