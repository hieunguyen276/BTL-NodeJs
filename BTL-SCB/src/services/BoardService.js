const Board = require("../models/Board");

class BoardService {

    checkBoardId = async (id) => { 
        try {
            const board = await Board.findOne({_id: id}) 

            if(board == null) {
                return false;
            } else {

                return board;
            }
          } catch (error) {
            throw new Error('Không tồn tại BoardId này');
          }
        }


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

    getNewBoard = async (id) => {
        try {
            const board = await Board.findById(id);
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
            const checkBoardId = await Board.findOne({_id: id});
            if (checkBoardId) {
                const board = await Board.findById(id);
                // console.log(board);
                await board.deleteOne();
                return true;
            } else { 
                return false;
            }
            
        } catch (error) {
            throw new Error('Không tồn tại BoardId này');
        }
    }

    // delete = async (id) =>{
    //     try {
    //         const board = await Board.findById(id);
    //         await board.deleteOne();
    //         return true;
    //     } catch (error) {
    //         throw new Error('Không tồn tại BoardId này');
    //     }
    // }


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