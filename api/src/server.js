import express from 'express';

const app = express();

import monzoAccounts from './routes/monzoAccountList';
import monzoAuth from './routes/monzoAuth';
import trueLayerAuth from './routes/trueLayerAuth';
import refreshTLToken from './routes/refreshTLToken';
import loadTLAccounts from './routes/loadTLAccounts';

app.use(monzoAccounts);
app.use(monzoAuth);
app.use(trueLayerAuth);
app.use(refreshTLToken);
app.use(loadTLAccounts);

const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});