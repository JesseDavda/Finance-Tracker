import express from 'express';
import { Accounts } from '../db/mongo/models';
import _ from 'lodash';

const router = express.Router();

function checkIfUserExists(googleId) {
    return Accounts.findOne({google_id: googleId}).exec()
    .then(data => _.isEmpty(data))
    .catch(e => false);
}

router.get('/validateUser', async (req, res) => {
    const googleId = req.query.google_id;

    const exists = await checkIfUserExists;

    res.status(200).json({valid: exists}).end();
});

export default router;