import express, { response } from 'express';
import bodyParser from 'body-parser';

import { findUser, register, logoutUser } from '../Services/user.js';
import { blacklistToken } from '../utils/token.js'


async function userRegistation(req, res) {
    try {

        const { body } = req;
        const { email } = body
        const user = await register(body)
        return res.status(user.statusCode).json({ msg: user.message });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

async function userLogin(req, res) {
    try {

        const { body } = req;
        const user = await findUser(body);
        return res.status(user.statusCode).json({ userRecord: user.userData, token: user.token, Error: user.errMessage });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

async function userLogout(req, res) {
    try {
        const { headers } = req;
        const accessToken = headers.authorization
            ? headers.authorization.split(' ')[1]
            : '';
        const user = await blacklistToken(accessToken);
        return res.status(201).json({ msg: 'logout successful' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export { userRegistation, userLogin, userLogout };
