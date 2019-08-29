import express from 'express';
import axios from 'axios';
import store from '../lib/store.js';

const router = express.Router();

router.get('/loadAccounts', (req, res) => {
    let config = {
        headers: {
            "Authorization": `Bearer ${store.get('TRUE_LAYER_ACCESS_TOKEN')}`
        }
    }

    axios.get('https://api.truelayer.com/data/v1/accounts', config)
        .then(response => {
            console.log(response.data.results);
        }).catch(e => {
            console.log(e);
        });
});

export default router;