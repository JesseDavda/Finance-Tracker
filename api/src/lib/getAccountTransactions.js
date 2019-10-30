import _ from 'lodash';
import axios from 'axios';
import refreshAccessToken from './refreshAccessToken';
import { Accounts } from '../db/mongo/models';

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

async function callAPIForData(accountId, googleId ,from, to) {
    const accessToken = await Accounts.findOne({google_id: googleId}).exec()
        .then(doc => {
            return doc.tl_access_token;
        }).catch(e => {
            console.log(e);
        });

    debugger;

    const config = {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }

    return axios.get(`https://api.truelayer.com/data/v1/accounts/${accountId}/transactions?from=${from}&to=${to}`, config)
}

function getTransactionData(accountId, googleId ,from, to) {
    return callAPIForData(accountId, googleId, from, to)
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
            }).catch(async (e) => {
                console.log(e.response.data)
                await refreshAccessToken();
                return getTransactionData(accountId, from, to);
            })
}

export {
    getTransactionData,
    callAPIForData,
    objectMap
};