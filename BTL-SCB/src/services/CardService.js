const Card = require("../models/Card");
const List = require("../models/List");
const User = require("../models/User");


class CardService {

    checkCardId = async (cardId) => { 
        try {
            // Tìm kiếm list dựa trên các thuộc tính trong listData
            const card = await Card.findOne({_id: cardId}) 
            
            // console.log(card);
            // Nếu card tồn tại, trả về true
           return card;
          } catch (error) {
            // Xử lý lỗi nếu có
            throw new Error('Không tồn tại CardId này');
          }
        }


    checkListId = async (data) => { 
        try {
            // Tìm kiếm board dựa trên các thuộc tính trong boardData
            const list = await List.findOne({_id: data.listId}) 
            
            // console.log(list);
            // Nếu list tồn tại, trả về true
            // Null = rỗng, kết quả không có giá trị nhưng được xác định rõ ràng và là 1 object
            // undefined = không tồn tại kiểu dữ liệu = undefined
            if(list == null) {
                return false;
            } else {

                return list;
            }
            } catch (error) {
            // Xử lý lỗi nếu có
            throw new Error('Không tồn tại ListId này');
            }
        }

    
    
    getMembers = async (data) => {
        try {
            // $in lặp trong mảng 
            const user = await User.find({email: { $in: data.members} }).select('-_id username phone');
            // const members = await User.find({ email: { $in: email } });
            console.log(user);
            return user;
        } catch (error) {
            throw error;
        }
    }
    

    create = async (data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
                // const list = await List.findById(data);
                // if(list) {
                const card = new Card(data);
                await card.save();
                return card;
                // } else {
                //     return null;
                // }
        } catch (error) {
            throw error;
        }
    }

    // title, descriptions, members, dueDate,
    
    // cover: coverPath, 
    // // attachment
    // attachment: attachmentPaths
    update = async (cardId, data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            // const result = await Board.updateOne({_id: id}, {title: data.title}, {background: data.background});
            // const result = await Card.updateOne({_id: id}, {title: data.title}, {descriptions: data.descriptions}, {members: data.members}, {dueDate: data.dueDate}, {cover: data.cover}, {attachment: data.attachment});
            const result = await Card.updateOne({ _id: cardId }, {
                title: data.title,
                descriptions: data.descriptions,
                members: data.members,
                dueDate: data.dueDate,
                cover: data.cover,
                attachment: data.attachment
              });
            return true;
        } catch (error) {
            throw error;
        }
    }


    delete = async (id) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const checkCardId = await Card.findOne({_id: id});
            if (checkCardId) {
                const card = await Card.findById(id);
                // console.log(card);
                await card.deleteOne();
                return true;
            } else { 
                return false;
            }
            
        } catch (error) {
            throw new Error('Không tồn tại CardId này');
        }
    }


    getAll = async (listId) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model'
            const cards = await Card.find({ listId });
            // console.log(cards);
            return cards;
        } catch (error) {
            throw error;
        }
    }


    getCard = async (id) => { 
        try {
            // Tìm kiếm list dựa trên các thuộc tính trong listData
            const card = await Card.findOne({_id: id}); 
            // console.log(list);
            // Nếu list tồn tại, trả về true
            // console.log(card)
            return card;
          } catch (error) {
            // Xử lý lỗi nếu có
            throw new Error('Không tồn tại CardId này');
          }
        }



}


module.exports = new CardService(); 