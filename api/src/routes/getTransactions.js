import express from 'express';
import axios from 'axios';
import store from '../lib/store';
import moment from 'moment';
import _ from 'lodash';

const router = express.Router();

import { getTransactionData } from '../lib/getAccountTransactions'

router.get('/transactions', async (req, res) => {
    const accountTransactions = await getTransactionData(req.query.accountId, "", "")
                                        .then(response => {
                                            res.status(200).json(response).end();
                                        });
});

export default router;