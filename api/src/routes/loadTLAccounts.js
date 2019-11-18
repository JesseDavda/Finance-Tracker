import express from 'express';
import axios from 'axios';
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
            return doc === null ? doc : doc.tl_access_token;
        }).catch(e => {
            console.log(e);
        });

    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    
    if(accessToken !== null || accessToken !== undefined) {
        return axios.get('https://api.truelayer.com/data/v1/accounts', config)
                .then(response => {
                    return getBalances(response.data.results, accessToken).then(res => res)
                }).catch(async e => {
                    if(e.response.status === 401) {
                        await refreshAccessToken(googleId);
                        return callForAccounts(googleId);
                    } else {
                        return e;
                    }
                });
    } else {
        return false;
    }
}

async function addAccounts(googleId, accounts) {
    return Accounts.findOneAndUpdate({google_id: googleId}, {$set: {linked_bank_accounts: accounts}}, {new: true}).exec()
            .then(doc => doc._doc)
            .catch(e => e);
}

router.get('/loadAccounts', async (req, res) => {
    const googleId = JSON.parse(req.cookies['snapshot_user_account']).google_id;
    let accounts = [];

    try {
        accounts = await callForAccounts(googleId);
        await addAccounts(googleId, accounts);
        
        if(accounts !== false) res.status(200).json(accounts).end();
        else res.status(500).json({error_message: "The accounts could not be loaded, please try again later"});
    } catch(e) {
        res.status(500).json(e).end();
    }
});

export default router;