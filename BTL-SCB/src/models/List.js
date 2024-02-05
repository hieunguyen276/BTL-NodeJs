const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    boardId: { type: String, required: true},
    createAt: {type: Date, default: Date.now()},
    position: {
        type: Number,
        required: true,
        default: 0
    }
});

listSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const maxPosition = await mongoose.model('List', listSchema).findOne().sort({ position: -1 }).select('position');
      const newPosition = maxPosition.position + 1;
      this.position = newPosition;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
});

const List = mongoose.model('List', listSchema);

module.exports = List;

// Sử dụng ListModel để tạo, truy vấn hoặc cập nhật danh sách trong MongoDB