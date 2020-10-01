import { loginPM, createPM } from './pmController.js';

const login = async (req, res) => {
    const requiredFields = [
        { 'key': 'userName', 'type': 'string' },
        { 'key': 'password', 'type': 'string' }
    ];
    console.log(req.body)
    // check require fields
    for (let field of requiredFields) {
        if (!(field.key in req.body)) {
            return res.status(404).json(
                {
                    status: 404,
                    code: `${field.key.toUpperCase()}_IS_REQUIRED`,
                    error: true,
                    message: `${field.key} is required`,
                },
            );

        } else if (field.key in req.body && typeof req.body[field.key] !== field.type) {
            return res.status(404).json(
                {
                    status: 404,
                    code: `${field.key.toUpperCase()}_IS_A_${field.type.toUpperCase()}`,
                    error: true,
                    message: `${field.key} must be a ${field.type}`,
                },
            );

        }
    }
    const result = await loginPM(req);
    res.status(result.status).json(result);
};
const signup = async (req, res) => {
    const requiredFields = [
        { 'key': 'userName', 'type': 'string' },
        { 'key': 'password', 'type': 'string' },
        { 'key': 'email', 'type': 'string' }
    ];
    // check required fields
    for (let field of requiredFields) {
        if (!(field.key in req.body)) {
            return res.status(404).json(
                {
                    status: 404,
                    code: `${field.key.toUpperCase()}_IS_REQUIRED`,
                    error: true,
                    message: `${field.key} is required`,
                },
            );

        } else if (field.key in req.body && typeof req.body[field.key] !== field.type) {
            return res.status(404).json(
                {
                    status: 404,
                    code: `${field.key.toUpperCase()}_IS_A_${field.type.toUpperCase()}`,
                    error: true,
                    message: `${field.key} must be a ${field.type}`,
                },
            );

        }
    }
    const result = await createPM(req,res);
}
export { login, signup }