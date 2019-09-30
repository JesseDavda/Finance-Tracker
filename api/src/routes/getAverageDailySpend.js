import express from 'express';
import _ from 'lodash';
import { getTransactionData } from '../lib/getAccountTransactions';

const router = express.Router();

function filterOutRoundUpsAndReduce(transactions, date) {
    const filteredTransactions = transactions.filter(transaction => {
        return (transaction.description.substring(0, 3) !== "pot") && (transaction.amount < 0);
    });

    let reducedTransactions = 0;

    if(filteredTransactions.length > 1) {
        filteredTransactions.forEach(transaction => {
            reducedTransactions += Math.abs(transaction.amount);
        });
    } else {
        if(!_.isEmpty(filteredTransactions)) {
            reducedTransactions = Math.abs(filteredTransactions[0].amount);
        } else {
            reducedTransactions = 0;
        }
    }
    
    if(reducedTransactions !== 0) {
        return {
            date: date.substring(5, 10),
            average_spend: Number((reducedTransactions / filteredTransactions.length).toFixed(2))
        }
    } else {
        return {
            date: date.substring(5, 10),
            average_spend: Number((reducedTransactions).toFixed(2))
        }
    }
}

router.get('/averageSpendDaily', async (req, res) => {
    console.log("called");
    const accountId = req.query.accountId;

    const transactions = await getTransactionData(accountId)
        .then(response => {
            const transactionData = Object.keys(response).map((key) => {
                return response[key];
            });

            const finalTransactionArray = transactionData.map(day => {
                return filterOutRoundUpsAndReduce(day.transactions, day.date, day.count)
            });

            res.status(200).json(finalTransactionArray).end();
        });
});

export default router;