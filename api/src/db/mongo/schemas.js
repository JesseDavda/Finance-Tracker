import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    first_name: String,
    last_name: String,
    google_id: Number,
    picture_uri: String,
    email: String,
    linked_bank_accounts: Array,
    hasAccounts: Boolean,
    tl_access_token: String,
    tl_refresh_token: String
});

export {
    accountSchema
}