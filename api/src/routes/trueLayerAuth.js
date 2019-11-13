import express from 'express';
import qs from 'querystring';
import axios from 'axios';

import { Accounts } from '../db/mongo/models';

const router = express.Router();

router.get('/getTrueLayerAccessToken', (req, res) => {
    console.log("The cookies: ", req.cookies);

    const postObject = {
        grant_type: 'authorization_code',
        client_id: process.env.TRUE_LAYER_CLIENT_ID,
        client_secret: process.env.TRUE_LAYER_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/myAccounts',
        code: req.query.code
    }

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    axios.post('https://auth.truelayer.com/connect/token', qs.stringify(postObject), config)
        .then(response => { 
            const updateObject = {
                tl_access_token: response.data.access_token,
                tl_refresh_token: response.data.refresh_token
            }

            Accounts.findOneAndUpdate({google_id: googleId}, {$set: {...updateObject}}, {new: true}, (err, doc) => {
                if(err) console.log("There was an error updating the data: ", err);
                else res.redirect('/');
            }); 
        }).catch(e => {
            console.log(e.response.data)
            res.redirect('/');
        });
});

export default router;