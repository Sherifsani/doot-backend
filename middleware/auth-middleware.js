const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userInfo = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "unauthorized"
        })
    }
}


module.exports = authMiddleware