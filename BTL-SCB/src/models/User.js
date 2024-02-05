// models/User.js
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  age: { type: Number, min: 18 },
});


// Hàm trước khi lưu người dùng vào cơ sở dữ liệu
userSchema.pre('save', function(next) {
  const user = this;

  // Chỉ mã hoá mật khẩu nếu nó mới hoặc đã thay đổi
  if (!user.isModified('password')) {
    return next();
  }

  // Mã hoá mật khẩu với bcrypt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Gán mật khẩu đã mã hoá cho người dùng
      user.password = hash;
      next();
    });
  });
});



const User = mongoose.model('User', userSchema);

module.exports = User;