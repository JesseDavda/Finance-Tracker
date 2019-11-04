import express from 'express';
import cors from 'cors';
import path from 'path';
import serveStatic from 'serve-static';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('../../client/build'));
// app.use('/static', serveStatic(path.join(__dirname, '../../client/build/static')));
// app.get('*', (req, res) => {
//     res.sendFile('index.html', {root: path.join(__dirname, '../../client/build/')});
// });

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});