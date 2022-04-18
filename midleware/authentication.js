var jwt = require('jsonwebtoken');
let privateKey = 'helloworld'

const verify = async (req, res, next) => {
    const token = req.headers["x-access-token"]    
    jwt.verify(token, privateKey, (err, decoded)=> {
        if(err) {
            return res.status(401).send({
                err: err
            })
        }
        req.id = decoded.id
        next();
    });
}

const generateToken = (payload) => {
    return jwt.sign(payload, privateKey, {
         algorithm: 'HS256',
         expiresIn: "1h"
    });
}
module.exports = {
    verify,
    generateToken
}