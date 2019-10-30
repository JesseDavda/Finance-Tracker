import express from 'express';
import refreshAccessToken from '../lib/refreshAccessToken';

const router = express.Router();

router.get('/refreshTLToken', (req, res) => {
    const googleId = req.query.google_id;

    refreshAccessToken(googleId);
});

export default router;