import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.header('aut-token')
    if (!token) {
        res.status(401).json({
            status: 401,
            code: 'Unauthorize',
            error: true,
            message: 'User need to authorize'
        })
    }
    try {
        // parse token string to payload
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(payload)
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            // if the error is because of JWT is unauthorized return 401 code
            // console.log(err)
            return res.send({
                status: 401,
                code: 'VERIFY_TOKEN_FAILED',
                error: true,
                message: err.message,
              });
        }
        else
            return res.send({
                status: 500,
                code: '',
                error: true,
                message: '',
              });
    }
    next()
}