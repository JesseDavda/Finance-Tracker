import express from 'express';
import axios from 'axios';

import { storeUserInfo } from '../lib/getAndStoreUserInfo';

const router = express.Router();

const GOOGLE_CODE_EXCHANGE_URL = 'https://oauth2.googleapis.com/token';

router.post('/googleOAuthTokenHandler', (req, res) => {
    console.log(req.body);
    const code = req.body.code;

    const codeExchangeBody = {
        code: code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        redirect_uri: 'postmessage',
        grant_type: 'authorization_code'
    }

    axios.post(GOOGLE_CODE_EXCHANGE_URL, codeExchangeBody)
        .then(response => {

            storeUserInfo(response.data.access_token)
                .then(data => {
                    res.status(200).json(data).end();
                }).catch(e => {
                    res.status(500).json(e.response.data).end();
                });
        }).catch(e => {
            console.log(e);
            res.status(400).json({error: e}).end();
        });
});

export default router;