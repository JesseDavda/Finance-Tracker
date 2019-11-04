"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dataStore = _interopRequireDefault(require("data-store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = new _dataStore["default"]({
  path: '../config.json'
});
var _default = store;
exports["default"] = _default;