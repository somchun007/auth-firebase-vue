const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

        const token = req.body.data.accessToken || req.query.accessToken || req.headers['x-access-token'];
        let user = req.body.data;
        console.log("1", user);
        if (!token) {
            res.status(403).send({ message: "ไม่มี Token!" });
        }
        else{
            jwt.verify(token, 'secret', (err, decode) => {
                if(err){
                    return res.status(401).send({ message: "Token  หมดอายุแล้ว" });
                }
                var tokenNew = jwt.sign({email: user.email}, 'secret', {
                    expiresIn: '30m',
                })
                
                user.accessToken = tokenNew;
                return res.status(200).send({
                    user, 
                    message: 'Token ต่ออายุ'
                })
            })
        }

   
}
const authJwt = { verifyToken };

module.exports = authJwt;