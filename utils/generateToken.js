import jwt from 'jsonwebtoken';
import { logger } from '../helpers/logger.js';
export const generateToken = async (data, expiredTime) => {
    try {
        const result = await jwt.sign({ data }, process.env.TOKEN_SECRET, { expiresIn: expiredTime });

        return result;
    } catch (err) {
        logger(`generateToken ${err}`);
    }
};