import mongoose from 'mongoose';
import { accountSchema } from './schemas.js';

const Accounts = mongoose.model('Account', accountSchema, 'Account');

export {
    Accounts
}