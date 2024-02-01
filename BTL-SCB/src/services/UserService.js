const User = require("../models/User");

class UserService {


    checkUser = async (data) => {
        try {
            const user = await User.findOne({username: data.username});
            if (user) {
                return 'Username already exists';
            } else {
                const email = await User.findOne({ email : data.email });
                if (email) {
                    return 'Email already exists';
                } else {
                    const phone = await User.findOne({phone : data.phone});
                    if (phone) {
                        return 'Phone already exists';
                    } else {
                        return user;
                    }
                }
            }
           
        } catch (err) {
            throw err;
        }
    }

    signup = async (dataUser) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const user = new User(dataUser);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }


    getAll = async () =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const users = await User.find();
            // const users = await User.find({'username': 'hieunguyen' });
            return users;
        } catch (error) {
            throw error;
        }
    }


    update = async (id, data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const result = await User.updateOne({_id: id}, {
                username: data.username, 
                password: data.password,
                email: data.email,
                phone: data.phone,
                age: data.age})
            return true;
        } catch (error) {
            throw error;
        }
    }


    delete = async (id) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const checkUserId = await User.findOne({_id: id});
            if (checkUserId) {
                const user = await User.findById(id);
                console.log(user);
                await user.deleteOne();
                return true;
            } else { 
                return false;
            }
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();