import _ from 'lodash';
import moment from 'moment';

function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = mapFn(object[key], key)
        return result
    }, {})
}

function analysePayments(transactions) {
    const functionChain = [
        filterOutNoClassification,
        groupByClassification,
        iterateOverClassifications,
        flattenMerchantObjects,
        filterOutNonWeekly,
        flattenedWeeklyGroupedData,
        collateData,
        removeEmptyClassifications
    ]

    return functionChain.reduce((value, nextFunction) => nextFunction(value), transactions);
}

function filterOutNoClassification(transactions) {
    return transactions.filter((transaction) => {
        return !_.isEmpty(transaction.transaction_classification) && transaction.transaction_type !== 'CREDIT';
    });
}

function groupByClassification(classifiedTransactions) {
    return _.groupBy(classifiedTransactions, (transaction) => transaction.transaction_classification[0]);
}

function iterateOverClassifications(classifications) {
    return objectMap(classifications, (transactionCategory) => {
        return _.groupBy(transactionCategory, transaction => transaction.merchant_name ? transaction.merchant_name : transaction.meta.provider_description)
    });
}

function flattenMerchantObjects(classifications) {
    return objectMap(classifications, Object.values);
}

function filterOutNonWeekly(flattenedGroupedTransactions) {
    return objectMap(flattenedGroupedTransactions, (classification) => {
        return classification.filter(merchant => {
            return merchant.length >= 12
        })
    })
}

// This function isn't used for now as I pivoted from trying to find recurring payments to finding biggest groups of payments
function groupWeekly(filteredFlattenedTransactions) {
    return objectMap(filteredFlattenedTransactions, (classification) => {
        return classification.map(merchant => {
            return _.groupBy(merchant, (transaction) => moment(transaction.timestamp).month());
        })
    });
}

function flattenGroupedData(transactionsToBeFlattened) {
    return objectMap(transactionsToBeFlattened, (classification) => {
        return Object.values(classification);
    });
}

function flattenedWeeklyGroupedData(transactionDataToBeFlattened) {
    return objectMap(transactionDataToBeFlattened, (classification) => {
        return classification.map((merchant) => {
            return Object.values(merchant);
        });
    });
}

function getMeanInterval(array, numberOfTransactions) {
    return array.reduce((accumulator, currentTransaction, currentIndex, array) => {
        return Number(accumulator) + Number(moment(currentTransaction.timestamp).subtract(array[currentIndex === 0 ? currentIndex : currentIndex - 1].timestamp).format('DD'))
    }, []) / numberOfTransactions;
}

function calculateStandardDeviation(array, mean) {
    const insideLoop = array.reduce((acc, curVal, curIndex, arrayToReduce) => {
        let calcVal = Math.pow(Number(moment(curVal.timestamp).subtract(arrayToReduce[curIndex === 0 ? curIndex : curIndex - 1].timestamp).format('DD') - mean), 2)
        return Number(acc) + Number(calcVal)
    }, 0)

    return Math.sqrt(insideLoop / (array.length - 1));
}

function collateData(formattedTransactionData) {
    return objectMap(formattedTransactionData, (classification) => {
        if(classification.length === 1) {
            const totalSpent = classification[0].reduce((acc, currentTransaction) => {
                return Number(acc) + Number(Math.abs(currentTransaction.amount));
            }, []);

            const merchantName = classification[0][0].merchant_name ? 
                                    classification[0][0].merchant_name : 
                                    classification[0][0].meta.provider_description.split(' ')[0];

            const numberOfTransactions = classification[0].length;

            const averageInterval = calculateStandardDeviation(classification[0], getMeanInterval(classification[0], numberOfTransactions));

            return {
                name_of_merchant: merchantName,
                number_of_transactions: numberOfTransactions,
                average_amount_spent: Number((totalSpent / numberOfTransactions).toFixed(2)),
                total_amount_spent: Number(totalSpent.toFixed(2)),
                average_interval: Math.floor(Number(averageInterval))
            }
        } else {
            return classification.map(merchant => {
                const totalSpent = merchant.reduce((acc, currentTransaction) => {
                    return Number(acc) + Number(Math.abs(currentTransaction.amount));
                }, [])

                const merchantName = merchant[0].merchant_name ? 
                                        merchant[0].merchant_name : 
                                        merchant[0].meta.provider_description.split(' ')[0];

                const numberOfTransactions = merchant.length;

                const averageInterval = calculateStandardDeviation(merchant, getMeanInterval(merchant, numberOfTransactions));


                return {
                    name_of_merchant: merchantName,
                    number_of_transactions: numberOfTransactions,
                    average_amount_spent: Number((totalSpent / numberOfTransactions).toFixed(2)),
                    total_amount_spent: Number(totalSpent.toFixed(2)),
                    average_interval: Math.floor(Number(averageInterval))
                }
            })
        }
    })
}

function removeEmptyClassifications(finalisedTransactionData) {
    return objectMap(finalisedTransactionData, (classification) => {
        if(!_.isEmpty(classification)) return classification
    })
}

export {
    analysePayments
}