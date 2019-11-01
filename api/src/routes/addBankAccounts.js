import express from 'express';

import { Accounts } from '../db/mongo/models';

const router = express.Router();

router.post('/addLinkedBankAccounts/:google_id', (req, res) => {
    const googleId = req.params.google_id;
    const reqBody = req.body;

    const newAccounts = {
        linked_bank_accounts: reqBody.current_accounts
    }

    reqBody.accounts_to_add.map(account => newAccounts.linked_bank_accounts.push(account));

    Accounts.findOneAndUpdate({google_id: googleId}, {$set: {...newAccounts}}, {new: true}).exec()
        .then(updatedDoc => {
            res.status(200).json({accounts: updatedDoc.linked_bank_accounts}).end();
        }).catch(e => {
            console.log(e);
            res.status(400).json({error: e}).end();
        });
});

export default router;