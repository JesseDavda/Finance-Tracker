import express from 'express';
import axios from 'axios';
import store from '../lib/store.js';
import refreshAccessToken from '../lib/refreshAccessToken.js';
import { Accounts } from '../db/mongo/models';

const router = express.Router();

async function getBalances(accounts, access_token) {
    return await Promise.all(accounts.map(account => {
        let config = {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }

        return axios.get(`https://api.truelayer.com/data/v1/accounts/${account.account_id}/balance`, config)
                    .then(response => {
                        return {
                            balance: response.data.results[0],
                            ...account
                        }
                    }).catch(e => {
                        
                        return {
                            balance: {
                                current: "Balance not found",
                            },
                            ...account
                        }
                    });
    }))
}

async function callForAccounts(googleId) {
    const accessToken = await Accounts.findOne({google_id: googleId}).exec()
        .then(doc => {
            return doc.tl_access_token;
        }).catch(e => {
            console.log(e);
        })

    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    
    return axios.get('https://api.truelayer.com/data/v1/accounts', config)
            .then(response => {
                return getBalances(response.data.results, accessToken).then(res => res)
            }).catch(async e => {
                await refreshAccessToken(googleId);
                return callForAccounts();
            });
}

router.get('/loadAccounts', async (req, res) => {
    const googleId = req.query.google_id;
    let accounts = [];

    try {
        accounts = await callForAccounts(googleId);

        res.status(200).json(accounts).end();
    } catch(e) {
        console.log(e.response.data);
    }
});

export default router;