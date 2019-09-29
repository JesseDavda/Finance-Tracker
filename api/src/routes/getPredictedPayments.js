import express from 'express';
import { analysePayments } from '../lib/analayseRepeatingPayments';
import { callAPIForData } from '../lib/getAccountTransactions';
import axios from 'axios';

const router = express.Router();

router.get('/recurringPayments', async (req, res) => {
    const accountId = req.query.accountId;

    const transactions = await callAPIForData(accountId);

    res.status(200).json(analysePayments(transactions.data.results)).end();
});

export default router;