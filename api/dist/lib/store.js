"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dataStore = _interopRequireDefault(require("data-store"));

var store = new _dataStore["default"]({
  path: '../config.json'
});
var _default = store;
exports["default"] = _default;