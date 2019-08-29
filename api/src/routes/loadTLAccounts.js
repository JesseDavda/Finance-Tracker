import express from 'express';
import axios from 'axios';
import store from '../lib/store.js';

import getBalance from '../lib/getAccountBalances'; 

const router = express.Router();

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index]);
    }
}

async function insertBalances(accounts) {
    let modifiedAccounts = accounts;

    asyncForEach(modifiedAccounts, async (account) => {
        try {
            account.balance = await getBalance(account.account_id)
                                        .then(response => response)
        } catch(e) {
            console.log(e);
        }
    });

    return modifiedAccounts;
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
    } catch(e) {
        console.log(e);
    }

    console.log(insertBalances(accounts));
});

export default router;