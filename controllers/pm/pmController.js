import { ProjectManager } from '../../models/ProjectManager.js';
import { generateToken } from '../../utils/generateToken.js';
import { logger } from '../../helpers/logger.js';
const expiredTime=300000000;
const loginPM = async (req) => {
    try {
        const data = req.body;
        const pm = await ProjectManager.findOne({ userName: data.userName, status: 'active' });
        if (!pm) {
            return {
                status: 404,
                code: 'USER_NOT_FOUND',
                error: true,
            };
        }
        const result = await ProjectManager.verifyPassword(pm.password, data.password);
        if (result) {
            const token = await generateToken(result.message, expiredTime);

            return {
                status: 200,
                code: 'TOKEN_GENERATE_SUCCESS',
                error: false,
                data: token,
            };
        }

        return {
            status: 203,
            code: 'TOKEN_GENERATE_FAILED',
            error: true,
            message: result.message,
        };
    } catch (err) {
        logger(`loginPM ${err}`);
        return {
            status: 500,
            code: 'INTERNAL_SERVER_ERROR',
            error: true,
        };
    }
};

const createPM = async (req,res) => {
    const data = req.body;
    try {
        const pm = await ProjectManager.findOne({ userName: data.userName });
        if (pm) {
            return res.status(404).json({
                status: 404,
                code: 'USER_NAME_EXISTED',
                error: true,
            });
        }
        const pm1 = await ProjectManager.findOne({ userName: data.email });
        if (pm1) {
            return res.status(500).json({
                status: 500,
                code: 'EMAIL_EXISTED',
                error: true,
            });
        }
        const newPM = await ProjectManager.create(data);

        return res.status(200).json({
            status: 200,
            code: 'CREATE_NEW_ADMIN_SUCCESS',
            error: false,
            data: newPM._id,
        });
    } catch (err) {
        logger(`createUser ${err}`);

        return res.status(500).json({
            status: 500,
            code: 'INTERNAL_SERVER_ERROR',
            error: true,
        });
    }
};

export { loginPM, createPM };