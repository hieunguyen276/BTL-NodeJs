const Board = require("../models/Board");

class BoardService {

    create = async (data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const board = new Board(data);
            await board.save();
            return board;
        } catch (error) {
            throw error;
        }
    }


    update = async (id, data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const result = await Board.updateOne({_id: id}, {
                title: data.title,
                background: data.background});
            return true;
        } catch (error) {
            throw error;
        }
    }


    delete = async (id) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const board = await Board.findById(id);
            await board.deleteOne();
            return true;
        } catch (error) {
            throw error;
        }
    }


    getAll = async () =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const boards = await Board.find();
            // const users = await User.find({'username': 'hieunguyen' });
            return boards;
        } catch (error) {
            throw error;
        }
    }

}


module.exports = new BoardService(); 