import express from 'express';
import { analysePayments } from '../lib/analayseRepeatingPayments';
import { callAPIForData } from '../lib/getAccountTransactions';
import { refreshAccessToken } from '../lib/refreshAccessToken';
import moment from 'moment';
import axios from 'axios';

const router = express.Router();

async function getTransactions(accountId, googleId, from, to) {
    return await callAPIForData(accountId, googleId, from, to)
        .then(response => response)
        .catch(async e => {
            if(e.response.status === 401) {
                await refreshAccessToken(googleId);
                return getTransactions(accoundId, googleId, from, to);
            } else {
                console.log("Error: ", e);
                return 0;
            }
        });
}

router.get('/recurringPayments', async (req, res) => {
    debugger;
    const accountId = req.query.accountId;
    const googleId = req.query.google_id
    const from = moment().subtract(1, 'year').format('YYYY-MM-DD'), to = moment().subtract(1, 'day').format('YYYY-MM-DD');
    const transactions = await getTransactions(accountId, googleId, from, to);
    const analysedData = transactions.hasOwnProperty("data") ? analysePayments(transactions.data.results) : { "error": "No data returned" }; 
    res.status(200).json(analysedData).end();
});

export default router;