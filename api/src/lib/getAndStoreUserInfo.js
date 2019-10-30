import _ from 'lodash';
import axios from 'axios';
import shajs from 'sha.js';

import { Accounts } from '../db/mongo/models';

function checkIfUserExists(google_id) {
    return Accounts.findOne({google_id: google_id}).then(data => {
        return _.isEmpty(data) ? false : true;
    });
}

function generateStateToken(data) {
    const valuesArray = Object.values(data);
    
    const concatData = valuesArray.reduce((concatedValues, value) => {
        return concatedValue.concat(value);
    }, "");

    const hashedData = shajs('sha512').update(concatData).digest('hex');

    return hashedData;
}

async function saveNewUser(user_data) {
    const userBody = {
        redirect_url: process.env.TRUE_LAYER_REDIRECT_URL,
        google_id: user_data.id,
        first_name: user_data.given_name,
        last_name: user_data.family_name,
        email: user_data.email,
        picture_uri: user_data.picture,
        linked_bank_accounts: [],
        tl_access_token: "",
        tl_refresh_token: "",
        cookie_key: ""
    }

    const newUser = new Accounts(userBody);

    if(await checkIfUserExists(user_data.id)) {
        return userBody;
    } else {
        return newUser.save()
            .then(savedUser => savedUser._doc)
            .catch(e => e);
    }
}

function storeUserInfo(access_token) {
    const config = {
        headers: {
            'Authorization': `Bearer ${access_token}` 
        }
    }

    return axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', config)
        .then(response => {
           return saveNewUser(response.data)
        }).catch(e => e.response.data);
}

export {
    storeUserInfo
}