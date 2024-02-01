const User = require("../models/User");

class AuthService {


    login = async (data) => {
        try {
            // const user = await User.findOne({ $and: [{ username: data.username }, { password: data.password }] });
            const user = await User.findOne({username: data.username});
            if (!user) {
                return 'Username information is incorrect';
            } else {
                const password = await User.findOne({password: data.password});
                if (password) {
                    return true;
                } else {
                    return 'Password information is incorrect';
                }
            }
           
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new AuthService();