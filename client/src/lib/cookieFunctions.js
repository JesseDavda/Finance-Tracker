import Cookies from 'universal-cookie';
import moment from 'moment';

const Cookie = new Cookies();

const defaultExpiry = moment().add(1, 'week').toDate();

function createCookie(name, value, options) {
    const defaultOptions = {
        path: '/',
        expires: defaultExpiry,
        maxAge: 1000,
        httpOnly: false,
        sameSite: true
    }

    Object.assign(defaultOptions, options);

    Cookie.set(name, value, {...defaultOptions});
}

function getCookie(name) {
    return Cookie.get(name);
}

function getAllCookies() {
    return Cookie.getAll();
}

export {
    createCookie,
    getCookie,
    getAllCookies
}