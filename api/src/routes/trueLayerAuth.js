import express from 'express';
import qs from 'queryString';
import axios from 'axios';
import store from '../lib/store';
console.log("STORE: ", store);

const router = express.Router();

router.get('/trueLayerAuth', (req, res) => {
    res.redirect(process.env.TRUE_LAYER_REDIRECT_URL);
});

router.get('/trueLayerCallback', (req, res) => {
    console.log("Request Parameters: ", req.query.code);

    let postObject = {
        grant_type: 'authorization_code',
        client_id: process.env.TRUE_LAYER_CLIENT_ID,
        client_secret: process.env.TRUE_LAYER_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3001/trueLayerCallback',
        code: req.query.code
    }

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    axios.post('https://auth.truelayer.com/connect/token', qs.stringify(postObject), config)
        .then(response => { 
            store.set('TRUE_LAYER_ACCESS_TOKEN', response.data.access_token);
            store.set('TRUE_LAYER_REFRESH_TOKEN', response.data.refresh_token);
            res.redirect('/loadAccounts'); 
        }).catch(e => console.log(e));
});

export default router;