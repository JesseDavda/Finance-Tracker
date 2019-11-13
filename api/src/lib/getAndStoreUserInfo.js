import _ from 'lodash';
import axios from 'axios';

import { Accounts } from '../db/mongo/models';

function checkIfUserExists(google_id) {
    return Accounts.findOne({google_id: google_id}).then(data => {
        return _.isEmpty(data);
    });
}

async function saveNewUser(user_data) {
    const userBody = {
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
        return {
            redirect_url: process.env.TRUE_LAYER_REDIRECT_URL,
            first_name: userBody.first_name,
            last_name: userBody.last_name,
            picture_uri: userBody.picture_uri,
            linked_bank_accounts: userBody.linked_bank_accounts,
            google_id: userBody.google_id,
            hasAccounts: !_.isEmpty(userBody.linked_bank_accounts)
        };
    } else {
        return newUser.save()
            .then(savedUser => {
                return {
                    redirect_url: process.env.TRUE_LAYER_REDIRECT_URL,
                    first_name: savedUser._doc.first_name,
                    last_name: savedUser._doc.last_name,
                    picture_uri: savedUser._doc.picture_uri,
                    linked_bank_accounts: savedUser._doc.linked_bank_accounts,
                    google_id: savedUser._doc.google_id,
                    hasAccounts: !_.isEmpty(savedUser._doc.linked_bank_accounts)
                }
            })
            .catch(e => {
                console.log(e)
                return e;
            });
    }
}

function storeUserInfo(access_token) {
    console.log("Step 4: The user data is requested from the google API");
    const config = {
        headers: {
            'Authorization': `Bearer ${access_token}` 
        }
    }

    return axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', config)
        .then(response => {
            console.log("Step 5: The user data is recieved and then saved to the accounts database: ", response.data);
            return saveNewUser(response.data)
        }).catch(e => e.response.data);
}

export {
    storeUserInfo
}