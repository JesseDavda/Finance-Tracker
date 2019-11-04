"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analysePayments = analysePayments;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function (result, key) {
    result[key] = mapFn(object[key], key);
    return result;
  }, {});
}

function analysePayments(transactions) {
  var functionChain = [filterOutNoClassification, groupByClassification, iterateOverClassifications, flattenMerchantObjects, filterOutNonWeekly, flattenedWeeklyGroupedData, collateData, removeEmptyClassifications];
  return functionChain.reduce(function (value, nextFunction) {
    return nextFunction(value);
  }, transactions);
}

function filterOutNoClassification(transactions) {
  return transactions.filter(function (transaction) {
    return !_lodash["default"].isEmpty(transaction.transaction_classification) && transaction.transaction_type !== 'CREDIT';
  });
}

function groupByClassification(classifiedTransactions) {
  return _lodash["default"].groupBy(classifiedTransactions, function (transaction) {
    return transaction.transaction_classification[0];
  });
}

function iterateOverClassifications(classifications) {
  return objectMap(classifications, function (transactionCategory) {
    return _lodash["default"].groupBy(transactionCategory, function (transaction) {
      return transaction.merchant_name ? transaction.merchant_name : transaction.meta.provider_description;
    });
  });
}

function flattenMerchantObjects(classifications) {
  return objectMap(classifications, Object.values);
}

function filterOutNonWeekly(flattenedGroupedTransactions) {
  return objectMap(flattenedGroupedTransactions, function (classification) {
    return classification.filter(function (merchant) {
      return merchant.length >= 12;
    });
  });
} // This function isn't used for now as I pivoted from trying to find recurring payments to finding biggest groups of payments


function groupWeekly(filteredFlattenedTransactions) {
  return objectMap(filteredFlattenedTransactions, function (classification) {
    return classification.map(function (merchant) {
      return _lodash["default"].groupBy(merchant, function (transaction) {
        return (0, _moment["default"])(transaction.timestamp).month();
      });
    });
  });
}

function flattenGroupedData(transactionsToBeFlattened) {
  return objectMap(transactionsToBeFlattened, function (classification) {
    return Object.values(classification);
  });
}

function flattenedWeeklyGroupedData(transactionDataToBeFlattened) {
  return objectMap(transactionDataToBeFlattened, function (classification) {
    return classification.map(function (merchant) {
      return Object.values(merchant);
    });
  });
}

function getMeanInterval(array, numberOfTransactions) {
  return array.reduce(function (accumulator, currentTransaction, currentIndex, array) {
    return Number(accumulator) + Number((0, _moment["default"])(currentTransaction.timestamp).subtract(array[currentIndex === 0 ? currentIndex : currentIndex - 1].timestamp).format('DD'));
  }, []) / numberOfTransactions;
}

function calculateStandardDeviation(array, mean) {
  var insideLoop = array.reduce(function (acc, curVal, curIndex, arrayToReduce) {
    var calcVal = Math.pow(Number((0, _moment["default"])(curVal.timestamp).subtract(arrayToReduce[curIndex === 0 ? curIndex : curIndex - 1].timestamp).format('DD') - mean), 2);
    return Number(acc) + Number(calcVal);
  }, 0);
  return Math.sqrt(insideLoop / (array.length - 1));
}

function collateData(formattedTransactionData) {
  return objectMap(formattedTransactionData, function (classification) {
    if (classification.length === 1) {
      var totalSpent = classification[0].reduce(function (acc, currentTransaction) {
        return Number(acc) + Number(Math.abs(currentTransaction.amount));
      }, []);
      var merchantName = classification[0][0].merchant_name ? classification[0][0].merchant_name : classification[0][0].meta.provider_description ? classification[0][0].meta.provider_description.split(' ')[0] : classification[0][0].description;
      var numberOfTransactions = classification[0].length;
      var averageInterval = calculateStandardDeviation(classification[0], getMeanInterval(classification[0], numberOfTransactions));
      return {
        name_of_merchant: merchantName,
        number_of_transactions: numberOfTransactions,
        average_amount_spent: Number((totalSpent / numberOfTransactions).toFixed(2)),
        total_amount_spent: Number(totalSpent.toFixed(2)),
        average_interval: Math.floor(Number(averageInterval))
      };
    } else {
      return classification.map(function (merchant) {
        var totalSpent = merchant.reduce(function (acc, currentTransaction) {
          return Number(acc) + Number(Math.abs(currentTransaction.amount));
        }, []);
        var merchantName = merchant[0].merchant_name ? merchant[0].merchant_name : merchant[0].meta.provider_description ? merchant[0].meta.provider_description.split(' ')[0] : merchant[0].description;
        var numberOfTransactions = merchant.length;
        var averageInterval = calculateStandardDeviation(merchant, getMeanInterval(merchant, numberOfTransactions));
        return {
          name_of_merchant: merchantName,
          number_of_transactions: numberOfTransactions,
          average_amount_spent: Number((totalSpent / numberOfTransactions).toFixed(2)),
          total_amount_spent: Number(totalSpent.toFixed(2)),
          average_interval: Math.floor(Number(averageInterval))
        };
      });
    }
  });
}

function removeEmptyClassifications(finalisedTransactionData) {
  return objectMap(finalisedTransactionData, function (classification) {
    if (!_lodash["default"].isEmpty(classification)) return classification;
  });
}