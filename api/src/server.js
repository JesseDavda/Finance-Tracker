import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from './db/mongo/mongoDB';
import * as FinanceTracker from './config/spa.config';
import fallback from 'express-history-api-fallback';

const app = express();

app.use(cors());
app.use(express.json());

function getAssetPath() {
    return path.join(__dirname, "../client/build/static");
}
 
app.use(express.static('../client/build'));
// app.use(fallback('index.html', {root: path.join(__dirname, '../client/build')}));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(getAssetPath(), `${FinanceTracker.getRedirectName()}.html`), {etag:false});
});

app.get('/:entryPoint', (req, res) => {
    if(req.params.entryPoint.toLowerCase() === 'myaccounts' || req.params.entryPoint.toLowerCase() === "login") {
        res.sendFile(path.resolve(getAssetPath(), req.params.entryPoint), {etag: false});
    } else {
        res.redirect(303, '/')
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});

import trueLayerAuth from './routes/trueLayerAuth';
import refreshTLToken from './routes/refreshTLToken';
import loadTLAccounts from './routes/loadTLAccounts';
import getAccountBalance from './routes/getAccountBalance';
import getTransactions from './routes/getTransactions';
import getAverageDailySpend from './routes/getAverageDailySpend';
import getPredictedPayments from './routes/getPredictedPayments';
import googleAuth from './routes/googleLoginHandler';
import addBankAccounts from './routes/addBankAccounts';
import getAccountInfo from './routes/getAccountInfo';

app.use(trueLayerAuth);
app.use(refreshTLToken);
app.use(loadTLAccounts);
app.use(getAccountBalance);
app.use(getTransactions);
app.use(getAverageDailySpend);
app.use(getPredictedPayments);
app.use(googleAuth);
app.use(addBankAccounts);
app.use(getAccountInfo);