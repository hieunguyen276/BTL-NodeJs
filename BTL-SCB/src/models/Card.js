
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    descriptions: { type: String},
    members : {type: Array},
    dueDate: { type: Date},
    cover: { type: Array},
    listId: { type: String, required: true},
    attachment : { type: Array }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

// Sử dụng ListModel để tạo, truy vấn hoặc cập nhật danh sách trong MongoDB