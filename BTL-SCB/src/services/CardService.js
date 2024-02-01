const Card = require("../models/Card");
const List = require("../models/List");


class CardService {

    checkListId = async (data) => { 
        try {
            // Tìm kiếm list dựa trên các thuộc tính trong listData
            const list = await List.findOne({_id: data.listId}) 
            
            // console.log(list);
            // Nếu list tồn tại, trả về true
           return list;
          } catch (error) {
            // Xử lý lỗi nếu có
            throw new Error('Đã xảy ra lỗi khi kiểm tra sự tồn tại của list');
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
    update = async (id, data) =>{
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            // const result = await Board.updateOne({_id: id}, {title: data.title}, {background: data.background});
            // const result = await Card.updateOne({_id: id}, {title: data.title}, {descriptions: data.descriptions}, {members: data.members}, {dueDate: data.dueDate}, {cover: data.cover}, {attachment: data.attachment});
            const result = await Card.updateOne({ _id: id }, {
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
            const list = await Card.findById(id);
            await list.deleteOne();
            return true;
        } catch (error) {
            throw error;
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


    getCard = async (cardId) => {
        try {
          const card = await Card.findOne({ _id: cardId });
          console.log(card);
          return card;
        } catch (error) {
          throw error;
        }
      }

}


module.exports = new CardService(); 