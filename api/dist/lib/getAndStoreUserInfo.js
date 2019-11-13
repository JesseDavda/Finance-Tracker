"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeUserInfo = storeUserInfo;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _axios = _interopRequireDefault(require("axios"));

var _models = require("../db/mongo/models");

function checkIfUserExists(google_id) {
  return _models.Accounts.findOne({
    google_id: google_id
  }).then(function (data) {
    return _lodash["default"].isEmpty(data);
  });
}

function saveNewUser(_x) {
  return _saveNewUser.apply(this, arguments);
}

function _saveNewUser() {
  _saveNewUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(user_data) {
    var userBody, newUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userBody = {
              google_id: user_data.id,
              first_name: user_data.given_name,
              last_name: user_data.family_name,
              email: user_data.email,
              picture_uri: user_data.picture,
              linked_bank_accounts: [],
              tl_access_token: "",
              tl_refresh_token: "",
              cookie_key: ""
            };
            newUser = new _models.Accounts(userBody);
            _context.next = 4;
            return checkIfUserExists(user_data.id);

          case 4:
            if (!_context.sent) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              redirect_url: process.env.TRUE_LAYER_REDIRECT_URL,
              first_name: userBody.first_name,
              last_name: userBody.last_name,
              picture_uri: userBody.picture_uri,
              linked_bank_accounts: userBody.linked_bank_accounts,
              google_id: userBody.google_id,
              hasAccounts: !_lodash["default"].isEmpty(userBody.linked_bank_accounts)
            });

          case 8:
            return _context.abrupt("return", newUser.save().then(function (savedUser) {
              return {
                redirect_url: process.env.TRUE_LAYER_REDIRECT_URL,
                first_name: savedUser._doc.first_name,
                last_name: savedUser._doc.last_name,
                picture_uri: savedUser._doc.picture_uri,
                linked_bank_accounts: savedUser._doc.linked_bank_accounts,
                google_id: savedUser._doc.google_id,
                hasAccounts: !_lodash["default"].isEmpty(savedUser._doc.linked_bank_accounts)
              };
            })["catch"](function (e) {
              console.log(e);
              return e;
            }));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _saveNewUser.apply(this, arguments);
}

function storeUserInfo(access_token) {
  console.log("Step 4: The user data is requested from the google API");
  var config = {
    headers: {
      'Authorization': "Bearer ".concat(access_token)
    }
  };
  return _axios["default"].get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', config).then(function (response) {
    console.log("Step 5: The user data is recieved and then saved to the accounts database: ", response.data);
    return saveNewUser(response.data);
  })["catch"](function (e) {
    return e.response.data;
  });
}