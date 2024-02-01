//userRoutes.js
const express = require('express');
const router = express.Router();
const ListController = require('../../controllers/ListController');
const verifyToken = require('../../middlewares/VerifyToken');


const Joi = require('joi');

const listValidationSchema = Joi.object({
  title: Joi.string(),
  boardId: Joi.string()
});

// Middleware kiểm tra và xác thực dữ liệu
const validateListData = (req, res, next) => {
    const { error, value } = listValidationSchema.validate(req.body, {abortEarly: false}); //abort early = true chỉ in ra 1 lỗi, false hiển thị tất cả các lỗi cho ng dùng
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
router.post('/',validateListData, verifyToken, ListController.create);
router.put('/:listId',validateListData, verifyToken, ListController.update);
router.delete('/:listId', verifyToken, ListController.delete);
router.get('/:boardId', verifyToken, ListController.getAll);


  




module.exports = router;