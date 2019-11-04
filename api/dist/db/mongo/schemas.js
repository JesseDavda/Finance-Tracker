"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var accountSchema = new Schema({
  first_name: String,
  last_name: String,
  google_id: Number,
  picture_uri: String,
  email: String,
  linked_bank_accounts: Array,
  cookie_key: String,
  state: String,
  tl_access_token: String,
  tl_refresh_token: String
});
exports.accountSchema = accountSchema;