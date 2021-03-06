import mongoose from 'mongoose';

const DB_SRV_URL = `mongodb+srv://node_server_account:${process.env.SRV_PASS}@snapshot-accounts-hdccy.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(DB_SRV_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log('Connected to the snapshot mongodb database') },
    err => { console.log('There was an error connecting to the mongodb database: ', err) }
);

mongoose.set('useFindAndModify', false);

export {
    mongoose
}