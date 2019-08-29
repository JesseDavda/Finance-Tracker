import express from 'express';
import axios from 'axios';
import store from '../lib/store.js';

const router = express.Router();

import { assemblePots, getTotalBalance } from '../lib/assembleMonzoAccounts';

router.get('/getMonzoAccounts', (req, res) => {
    let recievedAccounts = [];
    let accountsArray = [];
    let account_id = '';


    let monzoHeaders = {
        Authorization: `Barer ${store.get('MONZO_API_TOKEN')}`
    }

    axios.get('https://api.monzo.com/pots', monzoHeaders)
        .then(response => {
            res.json(response).end();        
        }).catch(e => {
            res.status(400).json(e).end();
        });

    // let reqConfig  = {
    //     headers: {
    //         Authorization: `Bearer ${process.env.MONZO_API_ACCESS_TOKEN}`
    //     }
    // }

    // axios.get('https://api.monzo.com/accounts', reqConfig)
    //     .then(response => {
    //         // recievedAccounts.push(response.data.accounts);
    //         console.log(response.data);
    //         account_id = response.data.accounts[0].id;
    //         let responseObject = assemblePots(response.data.accounts[0].id);

    //         console.log(responseObject);
    //         res.status(400).json(responseObject).end();
    //         getTotalBalance(account_id);
    //     }).catch(e => {
    //         console.log(e);
    //     });

    // recievedAccounts.forEach(account => {
    //     let monzoAccount = {
    //         id: account.id,
    //         owner: account.owners[0].preferred_name,
    //         account_number: account.account_number,
    //         sort_code: account.sort_code 
    //     }

    //     recievedAccounts.push(monzoAccount);
    // });

    // res.status(200).json(recievedAccounts);
});

export default router;