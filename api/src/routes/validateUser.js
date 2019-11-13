import express from 'express';
import { Accounts } from '../db/mongo/models';
import _ from 'lodash';

const router = express.Router();

function checkIfUserExists(googleId) {
    return Accounts.findOne({google_id: googleId}).exec()
    .then(data => !_.isEmpty(data))
    .catch(e => false);
}

router.get('/validateUser', async (req, res) => {
    if(req.cookies.hasOwnProperty('snapshot_user_account')) {
        const googleId = JSON.parse(req.cookies['snapshot_user_account']).google_id;

        const exists = await checkIfUserExists(googleId);

        res.status(200).json({valid: exists}).end();
    } else {
        res.status(200).json({valid: false}).end();
    }
});

export default router;