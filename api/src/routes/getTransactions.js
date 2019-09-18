import express from 'express';
import axios from 'axios';
import store from '../lib/store';

let access_token = store.get('TRUE_LAYER_ACCESS_TOKEN');

const router = express.Router();

function collateTransactionData(transactions, callback) {
    let newArray = [], prevDate = transactions[0].date, tempObject = {
        date: "",
        count: 0,
        transactions: []
    };

    transactions.forEach(transaction => {
        if(transaction.date === prevDate) {
            tempObject.date = transaction.date;
            tempObject.count++;
            tempObject.transactions.push(transaction);
            prevDate = transaction.date;
        } else {
            newArray.push(tempObject);
            tempObject = {
                date: "",
                count: 0,
                transactions: []
            }
        }
    });

    callback(newArray);
}

router.get('/transactions', (req, res) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }

    let accountId = req.query.accountId;

    axios.get(`https://api.truelayer.com/data/v1/accounts/${accountId}/transactions?from=&to=`, config)
        .then(response => {
            collateTransactionData(response.data.results, (transactions) => {
                res.status(200).json(transactions).end();
            });
        }).catch(e => {
            console.log("The error: ", e);
        })
});

export default router;