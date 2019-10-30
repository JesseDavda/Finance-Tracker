import express from 'express';
import axios from 'axios';
import store from '../lib/store';

let access_token = store.get('TRUE_LAYER_ACCESS_TOKEN');

const router = express.Router();

router.get('/getBalance', (req, res) => {
    const accountId = req.query.accountId;

    let config = {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }

    axios.get(`https://api.truelayer.com/data/v1/accounts/${accountId}/balance`, config)
        .then((response) => {
            let balanceObj = {
                currency: response.data.results[0].currency,
                current_balance: response.data.results[0].current
            }

            res.status(200).json(balanceObj).end();
        }).catch(e => {
            console.log(e.response.data);
        });
});

export default router;