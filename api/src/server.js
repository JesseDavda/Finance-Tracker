import express from 'express';
import cors from 'cors';
import mongoose from './db/mongo/mongoDB.js';

const app = express();

app.use(cors());
app.use(express.json());

import trueLayerAuth from './routes/trueLayerAuth';
import refreshTLToken from './routes/refreshTLToken';
import loadTLAccounts from './routes/loadTLAccounts';
import getAccountBalance from './routes/getAccountBalance';
import getTransactions from './routes/getTransactions';
import getAverageDailySpend from './routes/getAverageDailySpend';
import getPredictedPayments from './routes/getPredictedPayments';
import googleAuth from './routes/googleLoginHandler';

app.use(trueLayerAuth);
app.use(refreshTLToken);
app.use(loadTLAccounts);
app.use(getAccountBalance);
app.use(getTransactions);
app.use(getAverageDailySpend);
app.use(getPredictedPayments);
app.use(googleAuth);

const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});