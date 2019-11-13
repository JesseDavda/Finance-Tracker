import Cookies from 'universal-cookie';
import moment from 'moment';
import axios from 'axios';

const Cookie = new Cookies();

const defaultExpiry = moment().add(1, 'week').toDate();

function createCookie(name, value, options) {
    const defaultOptions = {
        path: '/',
        expires: defaultExpiry,
        maxAge: 1000,
        httpOnly: false,
        sameSite: false
    }

    Object.assign(defaultOptions, options);

    Cookie.set(name, value, {...defaultOptions});
}

async function checkUser(name) {
    const cookie = Cookie.get(name);

    if(cookie !== undefined) {
        return await axios.get(`/validateUser?googleId=${cookie.google_id}`)
        .then((response) => response.data.valid)
        .catch(e => false);
    } else {
        return false
    }
}

function getCookie(name) {
    return Cookie.get(name);
}

function getAllCookies() {
    return Cookie.getAll();
}

function deleteCookie(name) {
    return Cookie.remove(name);
}

export {
    createCookie,
    getCookie,
    getAllCookies,
    checkUser,
    deleteCookie
}