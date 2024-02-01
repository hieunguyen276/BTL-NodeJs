const express = require('express');
const AuthController = require('../../controllers/AuthController');
const router = express.Router();


const Joi = require('joi');

const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().required().messages({
    'any.required': `"username" không được bỏ trống !`
  }),
  password: Joi.string().required().messages({
    'any.required': `"password" không được bỏ trống !`
  })
});


// Middleware kiểm tra và xác thực dữ liệu
const validateUserData = (req, res, next) => {
    const { error, value } = userValidationSchema.validate(req.body, {abortEarly: false}); //abort early = true chỉ in ra 1 lỗi, false hiển thị tất cả các lỗi cho ng dùng
    console.log(error)
    if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};

//Định nghĩa router và gọi đến controller
router.post('/login', validateUserData, AuthController.login);

module.exports = router