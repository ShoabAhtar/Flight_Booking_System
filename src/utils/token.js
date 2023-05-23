
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import fs from 'fs'
import csv from 'csv-parser';

function createToken(user) {
    const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.secretKey,
        { expiresIn: '8h' },
    );
    return token
}
const filePath = 'token.csv';

function blacklistToken(token) {
    fs.appendFile(filePath, token + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Token blacklisted successfully.');
        }
    });
}

function getBlacklistedToken() {
    return new Promise((resolve, reject) => {
        const result = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => result.push(data))
            .on('end', () => {
                resolve(result);
            })
            .on('error', (error) => reject(error));
    });
}

export { createToken, blacklistToken, getBlacklistedToken }