// src/controllers/AuthController
const AuthService = require("../services/AuthService");
const jwt = require('jsonwebtoken');
class AuthController {

    login = async (req, res, next) =>{
        try {
            const {username, password} = req.body;
            let data = {username, password};

            const result =  await AuthService.login(data);
            // // check username and password
            // => Tồn tại user đó => thực hiện việc tạo ra token
            // => Không tồn tại user đó => trả về lỗi user not found

            // // if true => create jwt token
            if(result == true){
                const token = jwt.sign({ username }, process.env.SECRET_KEY_JWT);

                res.status(200).json({
                    'msg': `Login success`,
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