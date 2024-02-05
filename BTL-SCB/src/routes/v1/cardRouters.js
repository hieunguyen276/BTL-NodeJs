//userRoutes.js
const express = require('express');
const router = express.Router();
const CardController = require('../../controllers/CardController');
const verifyToken = require('../../middlewares/VerifyToken');
const upload = require('../../middlewares/uploadFile');



const Joi = require('joi');

// title, descriptions, members, dueDate, cover, listId, attachment
const cardValidationSchema = Joi.object({
  title: Joi.string(),
  descriptions: Joi.string(),
  members: Joi.array(),
  dueDate: Joi.date(),
  cover: Joi.array(),
  listId: Joi.string(), 
  attachment: Joi.array()
});

// Middleware kiểm tra và xác thực dữ liệu
const validateCardData = (req, res, next) => {
    const { error, value } = cardValidationSchema.validate(req.body, {abortEarly: false}); //abort early = true chỉ in ra 1 lỗi, false hiển thị tất cả các lỗi cho ng dùng
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
router.post('/',validateCardData, verifyToken, upload.fields([
    { name : 'cover', maxCount :1 },
    { name : 'attachment', maxCount :5 },
]), CardController.create);
router.put('/:cardId',validateCardData, verifyToken, upload.fields([
    { name : 'cover', maxCount :1 },
    { name : 'attachment', maxCount :5 },
]), CardController.update);
router.delete('/:cardId', verifyToken, CardController.delete);
router.get('/:listId', verifyToken, CardController.getAll);
router.get('/getCard/:cardId', verifyToken, CardController.getCard);



  




module.exports = router;