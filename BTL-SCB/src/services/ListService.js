const List = require("../models/List");
const Board = require("../models/Board");


class ListService {

    checkBoardId = async (data) => { 
        try {
            // Tìm kiếm board dựa trên các thuộc tính trong boardData
            const board = await Board.findOne({_id: data.boardId}) 
            
            console.log(board);
            // Nếu board tồn tại, trả về true
            // Null = rỗng, kết quả không có giá trị nhưng được xác định rõ ràng và là 1 object
            // undefined = không tồn tại kiểu dữ liệu = undefined
            if(board == null) {
                return false;
            } else {

                return board;
            }
          } catch (error) {
            // Xử lý lỗi nếu có
            // throw new Error('Đã xảy ra lỗi khi kiểm tra sự tồn tại của board');
            next (error);
          }
        }
    

    create = async (data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
                // const board = await Board.findById(data);
                // if(board) {
                const list = new List(data);
                await list.save();
                return list;
                // } else {
                //     return null;
                // }
        } catch (error) {
            throw new Error('can not find board');
        }
    }


    update = async (id, data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const result = await List.updateOne({_id: id}, {title: data.title});
            return true;
        } catch (error) {
            throw error;
        }
    }


    delete = async (id) =>{
        try {
            
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const list = await List.findById(id);
            await list.deleteOne();
            return true;
        } catch (error) {
            throw error;
        }
    }


    getAll = async (boardId) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model'
            const lists = await List.find({ boardId });
            console.log(lists);
            return lists;
        } catch (error) {
            throw error;
        }
    }

}


module.exports = new ListService(); 