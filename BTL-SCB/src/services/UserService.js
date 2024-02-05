const User = require("../models/User");
const bcrypt = require('bcrypt');


class UserService {

    checkUserId = async (id) => { 
        try {
            // Tìm kiếm list dựa trên các thuộc tính trong listData
            const user = await User.findOne({_id: id}); 
            // console.log(list);
            // Nếu list tồn tại, trả về true
            // console.log(user)
            return user;
          } catch (error) {
            // Xử lý lỗi nếu có
            throw new Error('Không tồn tại UserId này');
          }
        }


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
            console.log(user);
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


    getNewUser = async (id) => {
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

   

    update = async (id, data) =>{
        try {
            const hashPassword = async (password) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                return hashedPassword;
            };
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const hashedPassword = await hashPassword(data.password);

            const result = await User.updateOne({_id: id}, {
                username: data.username, 
                password: hashedPassword,
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
                // console.log(user);
                await user.deleteOne();
                return true;
            } else { 
                return false;
            }
            
        } catch (error) {
            throw new Error('Không tồn tại UserId này');
        }
    }
}

module.exports = new UserService();