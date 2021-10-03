const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const authorizationHeader = req.headers.authorization.split(" ");
        const token = authorizationHeader[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);    //.decoded() returns decoded token but not verified. .verify() verifies token validity and returns de decoded
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};