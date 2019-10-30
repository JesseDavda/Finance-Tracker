import express from 'express';
import { analysePayments } from '../lib/analayseRepeatingPayments';
import { callAPIForData } from '../lib/getAccountTransactions';
import moment from 'moment';
import axios from 'axios';

const router = express.Router();


router.get('/recurringPayments', async (req, res) => {
    const accountId = req.query.accountId;
    const googleId = req.query.google_id
    const from = moment().subtract(1, 'year').format('YYYY-MM-DD'), to = moment().subtract(1, 'day').format('YYYY-MM-DD');
    debugger;
    const transactions = await callAPIForData(accountId, googleId, from, to).catch(e => console.log(e.response.data));
    debugger;                   
    const analysedData = transactions.hasOwnProperty("data") ? analysePayments(transactions.data.results) : { "error": "No data returned" }; 
    debugger;
    res.status(200).json(analysedData).end();
});

export default router;