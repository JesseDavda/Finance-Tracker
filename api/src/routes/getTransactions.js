import express from 'express';
import axios from 'axios';
import store from '../lib/store';
import moment from 'moment';
import _ from 'lodash';

const router = express.Router();

import { getTransactionData } from '../lib/getAccountTransactions'

router.get('/transactions', async (req, res) => {
    debugger;
    const googleId = req.query.google_id;

    if(req.query.google_id !== undefined && req.query.accountId !== undefined) {
        const accountTransactions = await getTransactionData(req.query.accountId, googleId, "", "")
                                            .then(response => {
                                                res.status(200).json(response).end();
                                            });
    } else {
        res.status(400).json({error_message: "Request made with incomplete parameters!"}).end();
    }
});

export default router;