const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(403).json({
                success: false,
                msg: "Unauthorized"
            })
        }

        //verifying token
        let token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.decoded = decoded;
        next();


    } catch (err) {
        return res.json({
            success: false,
            msg: err.message
        })
    }
}