import axios from 'axios';
import store from './store';
import qs from 'querystring';
import { Accounts } from '../db/mongo/models';

async function refreshAccessToken(googleId) {
    const refreshToken = await Accounts.findOne({google_id: googleId}).exec()
    .then(doc => {
        return doc === null ? doc.tl_refresh_token : 0;
    }).catch(e => {
        console.log("There was an error finding the account: ", e);
        return 0;
    });

    const refreshBody = {
        grant_type: "refresh_token",
        client_id: process.env.TRUE_LAYER_CLIENT_ID,
        client_secret: process.env.TRUE_LAYER_CLIENT_SECRET,
        refresh_token: refreshToken
    }

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    if(refreshToken !== 0) {
        return axios.post('https://auth.truelayer.com/connect/token', qs.stringify(refreshBody), config)
            .then(async response => {
                console.log('Token Has Been refreshed!');
                
                const updateObject = {
                    tl_access_token: response.data.access_token,
                    tl_refresh_token: response.data.refresh_token
                }

                await Accounts.findOneAndUpdate({google_id: googleId}, {$set: {...updateObject}}, {new: true}).exec()
                .then(doc => {
                    console.log('saved!');
                }).catch(e => {
                    console.log("There was an error updating the data: ", e.response.data);
                }); 

                return response.data.access_token;
            }).catch(e => {
                console.log(e.response.data);
                return e.response.data;
            })
    } else {
        return null
    }
}

export default refreshAccessToken;