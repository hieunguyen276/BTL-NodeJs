//userRoutes.js
const express = require('express');
const router = express.Router();
const BoardController = require('../../controllers/BoardController');
const verifyToken = require('../../middlewares/VerifyToken');
const upload = require('../../middlewares/uploadFile');
// Test routes


const Joi = require('joi');

const boardValidationSchema = Joi.object({
  title: Joi.string().alphanum().messages({
  }),
  background: Joi.string(),

});

// Middleware kiểm tra và xác thực dữ liệu
const validateBoardData = (req, res, next) => {
    const { error, value } = boardValidationSchema.validate(req.body, {abortEarly: false}); //abort early = true chỉ in ra 1 lỗi, false hiển thị tất cả các lỗi cho ng dùng
    console.log(error)
    if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};


// router.post('/', validateUserData, verifyToken, BoardController.create);
router.post('/', validateBoardData, verifyToken, upload.single('background'), BoardController.create);
router.put('/:id',validateBoardData, verifyToken, upload.single('background'), BoardController.update);
router.delete('/:id', verifyToken, BoardController.delete);
router.get('/', verifyToken, BoardController.getAll);


  




module.exports = router;