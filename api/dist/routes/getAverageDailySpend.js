"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _lodash = _interopRequireDefault(require("lodash"));

var _getAccountTransactions = require("../lib/getAccountTransactions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

function filterOutRoundUpsAndReduce(transactions, date) {
  var filteredTransactions = transactions.filter(function (transaction) {
    return transaction.description.substring(0, 3) !== "pot" && transaction.amount < 0;
  });
  var reducedTransactions = 0;

  if (filteredTransactions.length > 1) {
    filteredTransactions.forEach(function (transaction) {
      reducedTransactions += Math.abs(transaction.amount);
    });
  } else {
    if (!_lodash["default"].isEmpty(filteredTransactions)) {
      reducedTransactions = Math.abs(filteredTransactions[0].amount);
    } else {
      reducedTransactions = 0;
    }
  }

  if (reducedTransactions !== 0) {
    return {
      date: date.substring(5, 10),
      average_spend: Number((reducedTransactions / filteredTransactions.length).toFixed(2))
    };
  } else {
    return {
      date: date.substring(5, 10),
      average_spend: Number(reducedTransactions.toFixed(2))
    };
  }
}

router.get('/averageSpendDaily',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var accountId, googleId, transactions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accountId = req.query.accountId;
            googleId = req.query.google_id;
            _context.next = 4;
            return (0, _getAccountTransactions.getTransactionData)(accountId, googleId).then(function (response) {
              var transactionData = Object.keys(response).map(function (key) {
                return response[key];
              });
              var finalTransactionArray = transactionData.map(function (day) {
                return filterOutRoundUpsAndReduce(day.transactions, day.date, day.count);
              });
              res.status(200).json(finalTransactionArray).end();
            });

          case 4:
            transactions = _context.sent;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;