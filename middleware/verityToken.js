import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.header('aut-token')
    if (!token) {

        res.status(401).end()
    }
    var payload
    try {
        // parse token string to payload
        payload = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error is because of JWT is unauthorized return 401 code
            console.log(e)
            return res.send({
                status: 401,
                code: 'VERIFY_TOKEN_FAILED',
                error: true,
                message: err.message,
              });
        }
        else
            return res.send({
                status: 400,
                code: '',
                error: true,
                message: '',
              });
    }
    next()
}