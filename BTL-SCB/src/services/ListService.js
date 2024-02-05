const List = require("../models/List");
const Board = require("../models/Board");


class ListService {


    checkListId = async (listId) => { 
        try {
            // Tìm kiếm list dựa trên các thuộc tính trong listData
            const list = await List.findOne({_id: listId}); 
            // console.log(list);
            // Nếu list tồn tại, trả về true
            // console.log(list)
            return list;
          } catch (error) {
            // Xử lý lỗi nếu có
            throw new Error('Không tồn tại ListId này');
          }
        }


    checkBoardId = async (data) => { 
        try {
            // Tìm kiếm board dựa trên các thuộc tính trong boardData
            const board = await Board.findOne({_id: data.boardId}) 
            
            // console.log(board);
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
            throw new Error('Không tồn tại BoardId này');
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

    getNewList = async (id) => {
        try {
            const list = await List.findById(id);
            return list;
        } catch (error) {
            throw error;
        }
    }


    update = async (id, data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const result = await List.updateOne({_id: id}, {title: data.title});
            return true;
        } catch (error) {
            throw new Error('Không tồn tại ListId này');

        }
    }


    delete = async (id) =>{
        try {
            const list = await List.findById(id);
            await list.deleteOne();
            return true;
        } catch (error) {
            throw new Error('Không tồn tại ListId này');
        }
    }


    getAll = async (boardId) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model'
            const lists = await List.find({ boardId }).sort({ position: -1 });
            console.log(lists);
            return lists;
        } catch (error) {
            throw error;
        }
    }

}


module.exports = new ListService(); 