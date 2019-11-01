import express from 'express';

import { Accounts } from '../db/mongo/models';

const router = express.Router();

router.get('/getAccountInfo/:google_id', (req, res) => {
    const googleId = req.params.google_id;

    Accounts.findOne({google_id: googleId}).exec()
        .then(doc => {
            const resObject = {
                first_name: doc.first_name,
                last_name: doc.last_name,
                picture_uri: doc.picture_uri
            }

            res.status(200).json(resObject).end();
        }).catch(e => {
            console.log("Error: ", e);
            res.status(400).json({error: e}).end();
        });
});

export default router;