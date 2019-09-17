import express from 'express';
import axios from 'axios';
import store from '../lib/store';

let access_token = store.get('TRUE_LAYER_ACCESS_TOKEN');

const router = express.Router();

function formatTransactionData(data) {
    return data.results.map(transaction => {
        return {
            date: transaction.timestamp,
            description: transaction.description,
            type: transaction.transaction_type,
            category: transaction.transaction_category,
            classifications: transaction.transaction_classification,
            amount: transaction.amount,
            currency: transaction.currency
        }   
    })
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
            console.log(response.data);
            let formattedTransactionData = formatTransactionData(response.data);
            res.status(200).json(formattedTransactionData).end();
        }).catch(e => {
            console.log(e);
        })
});

export default router;