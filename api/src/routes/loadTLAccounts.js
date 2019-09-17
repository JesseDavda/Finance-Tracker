import express from 'express';
import axios from 'axios';
import store from '../lib/store.js';

import getBalance from '../lib/getAccountBalances'; 

const router = express.Router();

async function insertBalances(accounts) {
    let modifiedAccounts = accounts;

    return modifiedAccounts.map((account => {
        return {
            ...account,
            balance: getBalance(account.account_id)
        }
    }));
} 

router.get('/loadAccounts', async (req, res) => {
    let accounts = [];

    let config = {
        headers: {
            "Authorization": `Bearer ${store.get('TRUE_LAYER_ACCESS_TOKEN')}`
        }
    }

    try {
        accounts = await axios.get('https://api.truelayer.com/data/v1/accounts', config)
            .then(response => response.data.results);

        res.status(200).json(accounts).end();
    } catch(e) {
        console.log(e);
    }
});

export default router;