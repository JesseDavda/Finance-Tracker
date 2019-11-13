import express from 'express';
import axios from 'axios';

import { storeUserInfo } from '../lib/getAndStoreUserInfo';

const router = express.Router();

const GOOGLE_CODE_EXCHANGE_URL = 'https://oauth2.googleapis.com/token';

router.post('/googleOAuthTokenHandler', (req, res) => {
    console.log("Step 2: The code is recieved from the client and posts the code to google: ", req.body.code);
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
            console.log("Step 3: The recieved access token is passed to the storeUserInfo: ", response.data.access_token)
            storeUserInfo(response.data.access_token)
                .then(data => {
                    console.log("Step 6: The data is now saved and the object that will become the JWT is sent back to the user");
                    res.status(200).json(data).end();
                }).catch(e => {
                    console.log(e);
                    res.status(500).json(e.response.data).end();
                });
        }).catch(e => {
            console.log(e);
            res.status(400).json({error: e}).end();
        });
});

export default router;