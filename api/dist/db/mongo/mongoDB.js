"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "mongoose", {
  enumerable: true,
  get: function get() {
    return _mongoose["default"];
  }
});

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DB_SRV_URL = "mongodb+srv://node_server_account:".concat(process.env.SRV_PASS, "@snapshot-accounts-hdccy.mongodb.net/test?retryWrites=true&w=majority");

_mongoose["default"].connect(DB_SRV_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('Connected to the snapshot mongodb database');
}, function (err) {
  console.log('There was an error connecting to the mongodb database: ', err);
});