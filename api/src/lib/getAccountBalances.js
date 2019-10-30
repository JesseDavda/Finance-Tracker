import store from './store.js';
import axios from 'axios';
import refreshAccessToken from './refreshAccessToken.js';

let access_token = store.get('TRUE_LAYER_ACCESS_TOKEN');

function requestBalance(account_id) {
    let config = {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }

    return axios.get(`https://api.truelayer.com/data/v1/accounts/${account_id}/balance`, config);
}

async function getBalance(account_id) {
    try {
        const response = await requestBalance(account_id);
        return response.data.results[0].current;
    } catch {
        await refreshAccessToken();
        const response = await requestBalance(account_id);
        return response.data.results[0].current;
    }
}

export default getBalance;