import express from 'express';
import qs from 'querystring';
import axios from 'axios';

import { Accounts } from '../db/mongo/models';

const router = express.Router();

router.get('/getTrueLayerAccessToken', (req, res) => {
    const googleId = req.query.google_id;

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

                res.status(200).json({google_id: doc.google_id}).end();
            }); 
        }).catch(e => {
            console.log(e.response.data)
            res.status(500).json({error: e.response.data}).end();
        });
});

export default router;