import express from 'express';
import cors from 'cors';
import mongoose from './db/mongo/mongoDB.js';

const app = express();

app.use(cors());

import monzoAccounts from './routes/monzoAccountList';
import monzoAuth from './routes/monzoAuth';
import trueLayerAuth from './routes/trueLayerAuth';
import refreshTLToken from './routes/refreshTLToken';
import loadTLAccounts from './routes/loadTLAccounts';
import getAccountBalance from './routes/getAccountBalance';
import getTransactions from './routes/getTransactions';
import getAverageDailySpend from './routes/getAverageDailySpend';

app.use(monzoAccounts);
app.use(monzoAuth);
app.use(trueLayerAuth);
app.use(refreshTLToken);
app.use(loadTLAccounts);
app.use(getAccountBalance);
app.use(getTransactions);
app.use(getAverageDailySpend);

const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});