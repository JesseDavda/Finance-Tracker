import express from 'express';
import axios from 'axios';
import qs from 'querystring';
import store from '../lib/store';
import { log } from 'util';

const router = express.Router();

const authRedirectURI = 'http://localhost:3000/monzoAuthCallback'
const authState = 'w92uc29vg67397r2bcvs76FHghc0aHCA3597C0cgbCBA78';

router.get('/monzoAuth', (req, res) => {

    let monzoSignInURL = `https://auth.monzo.com/?` + 
                            `client_id=${process.env.MONZO_CLIENT_ID}&` +
                            `redirect_uri=${authRedirectURI}&` +
                            `response_type=code&` +
                            `state=${authState}`;

    res.redirect(monzoSignInURL);
})

router.get('/monzoAuthCallback', (req, res) => {
    
    let monzoAuthCode = req.query.code;

    let postObject = {
        grant_type: 'authorization_code',
        client_id: process.env.MONZO_CLIENT_ID,
        client_secret: process.env.MONZO_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3001/getMonzoAccounts',
        code: monzoAuthCode
    }

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    axios.post('https://api.monzo.com/oauth2/token', qs.stringify(postObject), config)
        .then(response => console.log(response))
        .catch(e => console.log(e));
    
})

export default router;