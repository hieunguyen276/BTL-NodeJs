const UserService = require("../services/UserService");

class UserController {
    // Các hàm xử lý
    signup = async (req, res, next) => {
        try {
            const {username, password, email, phone, age} = req.body;
            // abc();
            // Gọi đến tầng service
            // console.log('createUser');
            let data = {
                username, password, email, phone, age
            }
            let data2 = {username, email, phone};
            const result = await UserService.checkUser(data2);
            if (result) {
                res.status(200).json({
                    'msg': result
                })
            } else {
                const user = await UserService.signup(data)
                res.status(200).json({
                    'msg' : 'SignUp successful'
            })
            }

        } catch (error) {
            next (error);
        }
    };


    getAll = async (req, res, next) => {
        try {
            // Goi den service
            const users = await UserService.getAll();
            res.status(200).json({
                users
            });
        } catch (error) {
            throw error;
        }
    };


    update = async (req, res, next) => {
        try {
            const {username, password, email, phone, age} = req.body;
            const {id} = req.params;
            let data = {
                username, password, email, phone, age
            }
            const result = await UserService.update(id, data)
            if(result) {
                res.status(200).json({
                    'msg': 'Updated'
                })
            }else {
                throw new Error('Update failed');
            }
            
        } catch (error) {
            throw error;
        }
    };


    delete = async (req, res, next) => {
        try {
            const {id} = req.params;
            
            const result = await UserService.delete(id)
            if(result == true) {
                res.status(200).json({
                    'msg': 'Deleted'
                })
            }else {
                res.status(200).json({
                    'msg': 'UserId not found'
                })
            }
        } catch (error) {
            next (error);
        }
    };

}

module.exports = new UserController();