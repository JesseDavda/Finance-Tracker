import express from 'express';
import axios from 'axios';
import store from '../lib/store';
import _ from 'lodash';

const router = express.Router();

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

router.get('/transactions', (req, res) => {
    console.log('called')
    let config = {
        headers: {
            'Authorization': `Bearer ${store.get('TRUE_LAYER_ACCESS_TOKEN')}`
        }
    }

    let accountId = req.query.accountId;

    axios.get(`https://api.truelayer.com/data/v1/accounts/${accountId}/transactions?from=&to=`, config)
        .then(response => {
            collateTransactionData(response.data.results, (transactions) => {
                
                res.status(200).json(objectMap(transactions,(date, key) => {
                    return {
                        date: key,
                        count: date.length,
                        transactions: date
                    }
                })).end();
            });
        }).catch(e => {
            console.log("The error: ", e);
        })
});

export default router;