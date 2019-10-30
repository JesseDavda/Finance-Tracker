import express from 'express';
import axios from 'axios';
import store from '../lib/store';
import moment from 'moment';
import _ from 'lodash';

const router = express.Router();

import { getTransactionData } from '../lib/getAccountTransactions'

router.get('/transactions', async (req, res) => {
    const googleId = req.query.google_id;

    const accountTransactions = await getTransactionData(req.query.accountId, googleId, "", "")
                                        .then(response => {
                                            res.status(200).json(response).end();
                                        });
});

export default router;