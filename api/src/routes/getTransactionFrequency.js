import express from 'express';
import axios from 'axios';
import store from '../lib/store';

const router = express.Router();

router.get('/getTransactionFrequency', (req, res) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${store.get('TRUE_LAYER_ACCESS_TOKEN')}`
        }
    }

    axios.get(`https://api.truelayer.com/data/v1/accounts/${accountId}/transactions?from=&to=`, config)
        .then(response => {
            response
        })
});

export default router;