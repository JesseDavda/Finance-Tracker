import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    time_till_next_login: Date,
    linked_accounts: Array,
    cookie_key: String
});

export {
    accountSchema
}