import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

function getAssetPath() {
    return path.join(__dirname, "../client/build/static");
}
 
app.use(express.static('../client/build'));
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(getAssetPath(), 'index.html'), {etag: false});
});
app.get('/login', (req, res) => {
    res.status(200).sendFile(path.resolve(getAssetPath(), 'index.html'), {etag: false});
});
app.get('/myAccounts', (req, res) => {
    res.status(200).sendFile(path.resolve(getAssetPath(), 'index.html'), {etag: false});
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