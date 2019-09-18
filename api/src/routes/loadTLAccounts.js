import express from 'express';
import axios from 'axios';
import store from '../lib/store.js';

const router = express.Router();

async function getBalances(accounts) {
    return await Promise.all(accounts.map(account => {
        let config = {
            headers: {
                "Authorization": `Bearer ${store.get('TRUE_LAYER_ACCESS_TOKEN')}`
            }
        }

        return axios.get(`https://api.truelayer.com/data/v1/accounts/${account.account_id}/balance`, config)
                    .then(response => {
                        return {
                            balance: response.data.results[0],
                            ...account
                        }
                    });
    }))
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
            .then(response => getBalances(response.data.results).then(res => res));

        res.status(200).json(accounts).end();
    } catch(e) {
        console.log(e);
    }
});

export default router;