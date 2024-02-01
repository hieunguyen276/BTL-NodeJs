//userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
const verifyToken = require('../../middlewares/VerifyToken')

// Test routes


const Joi = require('joi');

const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().required().messages({

  }),
  password: Joi.string().required().messages({
    
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(10).required(),
  age: Joi.number().min(18).required(),
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


router.post('/', validateUserData, verifyToken, UserController.signup);
router.get('/', UserController.getAll);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
  




module.exports = router;