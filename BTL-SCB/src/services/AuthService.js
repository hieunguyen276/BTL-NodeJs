const User = require("../models/User");
const bcrypt = require('bcrypt');

class AuthService {


    login = async (data) => {
        try {
            const user = await User.findOne({username: data.username});
            if (!user) {
                return 'Username information is incorrect';
            } else {
                const password = await bcrypt.compare(data.password, user.password);
                if (password) {
                    return user;
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