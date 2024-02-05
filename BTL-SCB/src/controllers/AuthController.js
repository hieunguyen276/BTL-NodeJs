// src/controllers/AuthController
const AuthService = require("../services/AuthService");
const jwt = require('jsonwebtoken');
class AuthController {

    login = async (req, res, next) =>{
        try {
            const {username, password} = req.body;
            let data = {username, password};

            const user =  await AuthService.login(data);

            if(user){
                const token = jwt.sign({ username }, process.env.SECRET_KEY_JWT);

                res.status(200).json({
                    'msg': `Login success`,
                    user,
                    token: token
                })
            } else {
                res.status(401).json({
                    'msg': result
                })
            }
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new AuthController();