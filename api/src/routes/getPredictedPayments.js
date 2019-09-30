import express from 'express';
import { analysePayments } from '../lib/analayseRepeatingPayments';
import { callAPIForData } from '../lib/getAccountTransactions';
import moment from 'moment';
import axios from 'axios';

const router = express.Router();


router.get('/recurringPayments', async (req, res) => {
    const accountId = req.query.accountId;
    const from = moment().subtract(1, 'year').format('YYYY-MM-DD'), to = moment().subtract(1, 'day').format('YYYY-MM-DD');

    const transactions = await callAPIForData(accountId, from, to).catch(e => console.log(e));

    res.status(200).json(analysePayments(transactions.data.results)).end();
});

export default router;