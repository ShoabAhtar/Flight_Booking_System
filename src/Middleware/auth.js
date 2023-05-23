import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { blacklistToken, getBlacklistedToken } from '../utils/token.js';
import lodash from 'lodash'

config();

const verifyToken = (req, res, next) => {
  const { headers } = req;
  const accessToken = headers.authorization
    ? headers.authorization.split(' ')[1]
    : '';
  (async () => {
    const token = `'${accessToken}'`
    const isBlacklisted = await getBlacklistedToken();
    const stringArray = isBlacklisted.map(obj => Object.values(obj)[0]);
    const accessTokenExists = stringArray.some(element => element === accessToken);

    if (accessTokenExists) {
      return res.status(400).json({ msg: 'Token Revoked' });
    }
    if (accessToken === '') {
      return res.status(400).json({ msg: 'Bearer Token is required.' });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.secretKey);
      req.user = decoded;
      // console.log()
      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Token has expired.' });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ msg: err.message });
      }
      return res.status(401).json({ msg: err.message });
    }
  })();
};

export { verifyToken };
