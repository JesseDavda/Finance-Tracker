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
    console.log("This is the google id: ", googleId);
    const accessToken = await Accounts.findOne({google_id: googleId}).exec()
        .then(doc => {
            console.log(doc);
            return doc === null ? doc : doc.tl_access_token;
        }).catch(e => {
            console.log(e);
        });

    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    
    if(accessToken !== null) {
        return axios.get('https://api.truelayer.com/data/v1/accounts', config)
                .then(response => {
                    return getBalances(response.data.results, accessToken).then(res => res)
                }).catch(async e => {
                    await refreshAccessToken(googleId);
                    return callForAccounts();
                });
    } else {
        return false;
    }
}

async function addAccounts(googleId, accounts) {
    // const currentAccounts = await Accounts.findOne({google_id: googleId}).exec()
    //     .then(doc => doc._doc.linked_bank_accounts)
    //     .catch(e => e);

    // accounts.map(account => currentAccounts.push(account));

    return Accounts.findOneAndUpdate({google_id: googleId}, {$set: {linked_bank_accounts: accounts}}, {new: true}).exec()
            .then(doc => doc._doc)
            .catch(e => e);
}

router.get('/loadAccounts', async (req, res) => {
    const googleId = req.query.google_id;
    let accounts = [];

    try {
        accounts = await callForAccounts(googleId);

        // try {
            // accounts = await addAccounts(googleId, accounts).linked_bank_accounts;
        res.status(200).json(accounts).end();
        // } catch(e) {
        //     console.log(e);
        // }
    } catch(e) {
        console.log(e);
    }
});

export default router;