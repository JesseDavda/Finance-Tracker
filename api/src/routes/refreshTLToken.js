import express from 'express';
import axios from 'axios';
import store from '../lib/store';
import qs from 'querystring';

const router = express.Router();

router.get('/refreshTLToken', (req, res) => {
    let refreshBody = {
        grant_type: "refresh_token",
        client_id: process.env.TRUE_LAYER_CLIENT_ID,
        client_secret: process.env.TRUE_LAYER_CLIENT_SECRET,
        refresh_token: store.get('TRUE_LAYER_REFRESH_TOKEN')
    }

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    axios.post('https://auth.truelayer.com/connect/token', qs.stringify(refreshBody), config)
        .then(response => {
            console.log(response)
            store.set('TRUE_LAYER_ACCESS_TOKEN', response.data.access_token);
            store.set('TRUE_LAYER_REFRESH_TOKEN', response.data.refresh_token);
            res.status(200).json({token_refreshed: true}).end();
        }).catch(e => {
            console.log(e);
            res.status(500).json({token_refreshed: false, error: e}).end();
        })
});

export default router;