import axios from 'axios';

function getBalance(account_id) {

}

function getTotalBalance(account_id) {
    let monzoHeaders = {
        Authorization: `Barer ${process.env.MONZO_API_ACCESS_TOKEN}`
    }

    axios.get(`https://api.monzo.com/balance?account_id=${account_id}`)
        .then(response => {
            console.log("getTotalbalance response: ", response.data);
        }).catch(e => {
            console.log("getTotalbalance response: ", e);
        })
}

async function assemblePots() {
    let monzoHeaders = {
        Authorization: `Barer ${process.env.MONZO_API_ACCESS_TOKEN}`
    }

    let returnBody = await axios.get('https://api.monzo.com/pots', monzoHeaders)
        .then(response => response)
        .catch(e => e)

    return returnBody;
}

function assembleAccounts() {

}

export {
    assembleAccounts,
    assemblePots,
    getTotalBalance
}