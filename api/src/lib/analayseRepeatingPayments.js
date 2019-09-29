import _ from 'lodash';
import moment from 'moment';

function analysePayments(transactions) {
    const firstStage = filterOutNoClassification(transactions);
    const secondStage = groupByClassification(firstStage);
    const thirdStage = iterateOverClassifications(secondStage);

    return thirdStage;
}

function filterOutNoClassification(transactions) {
    return transactions.filter((transaction) => {
        return !_.isEmpty(transaction.transaction_classification);
    });
}

function groupByClassification(classifiedTransactions) {
    return _.groupBy(classifiedTransactions, (transaction) => transaction.transaction_classification[0]);
}

function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = mapFn(object[key], key)
        return result
    }, {})
}


function iterateOverClassifications(classifications) {
    return objectMap(classifications, (transactionCategory) => {
        return transactionCategory.reduce((acc, currentTransaction) => {
            let weekOfYear = moment(currentTransaction.timestamp).week();

            if(typeof acc[weekOfYear] === "undefined") {
                acc[weekOfYear] = [];
            }

            acc[weekOfYear].push(currentTransaction);

            return acc;
        });
    });
}

export {
    analysePayments
}