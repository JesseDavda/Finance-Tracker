import store from './store';
import _ from 'lodash';
import axios from 'axios';

function collateTransactionData(transactions, callback) {
    const newArray = _.groupBy(transactions, (transaction) => {
        return transaction.timestamp.substring(0, 10)
    });

    callback(newArray);
}

function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = mapFn(object[key], key)
        return result
    }, {})
}

function callAPIForData(accountId, from, to) {
    const config = {
        headers: {
            'Authorization': `Bearer ${store.get('TRUE_LAYER_ACCESS_TOKEN')}`
        }
    }

    return axios.get(`https://api.truelayer.com/data/v1/accounts/${accountId}/transactions?from=${from}&to=${to}`, config)
}

function getTransactionData(accountId, from, to) {
    return callAPIForData(accountId, from, to)
            .then(response => {
                let collatedData = {};
                
                collateTransactionData(response.data.results, (transactions) => {
                    collatedData = objectMap(transactions,(date, key) => {
                                        return {
                                            date: key,
                                            count: date.length,
                                            transactions: date
                                        }
                                    });
                });

                return collatedData;
            }).catch(e => {
                console.log("The error: ", e);
            })
}

export {
    getTransactionData,
    callAPIForData,
    objectMap
};