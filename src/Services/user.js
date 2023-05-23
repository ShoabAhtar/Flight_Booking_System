import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


import { create, find, update } from '../Repo/user.js';
import { createToken } from '../utils/token.js';

dotenv.config();
const { secretKey } = process.env;



async function register(body) {
  try {
    // console.log("in services")
    const { password, email } = body;
    const checkUser = await find(email);
    if (checkUser) {
      return { statusCode: 409, message: 'User Already Exist' };
    }
    const hash = await bcrypt.hash(password, 10);
    body.password = hash;
    const user = await create(body);
    return { statusCode: 201, message: 'User Registered Successfully' };
  } catch (error) {
    console.log("we have an error in services", error.message)
    throw new Error(error.message);
  }
}
async function findUser(body) {
  try {
    const { email, password } = body;
    const user = await find(email);
    if (!user) {
      return { statusCode: 404, errMessage: 'User does not exist' }
    }
    if (user) {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify) {
        return { statusCode: 401, errMessage: 'Invalid credentials' }
      }
      if (verify) {
        const token = await createToken(user)
        delete user._id
        delete user.password
        delete user.__v
        return { statusCode: 200, userData: user, token: token }
      }

    }
  } catch (error) {
    throw new Error(error.message);
  }
}
async function logoutUser(token) {
  try {

    const user = await blacklistingToken(token)
    return { statusCode: 200, message: 'Logout Successful' }
  } catch (error) {

  }
}
export { register, findUser, logoutUser };
