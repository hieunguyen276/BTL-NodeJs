const CardService = require("../services/CardService");

class CardController {
    create = async (req, res, next) => {
        try {
            const {title, descriptions, members, dueDate, listId } = req.body;
            
            if(req.files) {
                  // Xử lý cover
                const cover = req.files ? req.files['cover'] : null;
                const coverPath = cover ? cover[0].path : null;
                

                // Xử lý attachment
                const attachment = req.files ? req.files['attachment'] : null;
                const attachmentPaths = attachment ? attachment.map(file => file.path) : [];

                var data = {
                    title, descriptions, members, dueDate,
    
                    cover: coverPath, 
                    listId,
                    // attachment
                    attachment: attachmentPaths
                }
            }     

            let data2 = {listId};
            let data3 = {members};


            const result = await CardService.checkListId(data2);

            if(result == false) {
                res.status(404).json({ error: 'ListId not found' }); // Sai boardId 
            } else {
                const card = await CardService.create(data);
                const infoMembers = await CardService.getMembers(data3)
                res.status(200).json({
                    card, 
                    infoMembers
                })
            }
        } catch (error) {
            next(error);
        }
    };


    update = async (req, res, next) => {
        try {
            const {title, descriptions, members, dueDate } = req.body;
            const {cardId} = req.params;
            if(req.files) {
                  // Xử lý cover
                const cover = req.files ? req.files['cover'] : null;
                const coverPath = cover ? cover[0].path : null;
                

                // Xử lý attachment
                const attachment = req.files ? req.files['attachment'] : null;
                const attachmentPaths = attachment ? attachment.map(file => file.path) : [];

                var data = {
                    title, descriptions, members, dueDate,
    
                    cover: coverPath, 
                    // attachment
                    attachment: attachmentPaths
                }
            }     

            let data3 = {members};


            const result = await CardService.checkCardId(cardId);
            if(result) {
                const cardUpdate = await CardService.update(cardId, data)
                if(cardUpdate) {
                    const card = await CardService.getCard(cardId);
                    const infoMembers = await CardService.getMembers(data3)
                    res.status(200).json({
                        'msg': 'Updated card',
                        card,
                        infoMembers
                    })
                }else {
                    throw new Error('Update failed');
                } 
                
            } else {
                res.status(404).json({ error: 'CardId not found' }); 
            }
        } catch (error) {
            next(error);
        }
    };



    delete = async (req, res, next) => {
        try {
            const {cardId} = req.params;
            
            const result = await CardService.delete(cardId)
            if(result == true) {
                res.status(200).json({
                    'msg': 'Deleted'
                })
            }else {
                res.status(404).json({
                    'msg': 'CardId not found'
                })
            }
        } catch (error) {
            next (error);
        }
    };


    getAll = async (req, res, next) => {
        try {
            const {listId} = req.params;
            // Goi den service
            const cards = await CardService.getAll(listId);
            res.status(200).json({
                cards
            });
        } catch (error) {
            next (error);
        }
    };

    getCard = async (req, res, next) => {
        try {
            const {cardId} = req.params;

            const result = await CardService.checkCardId(cardId);
            if(result) {
                const card = await CardService.getCard(cardId);
                        res.status(200).json({
                            card
                        })                 
            } else {
                res.status(404).json({ error: 'CardId not found' }); 
            }
        } catch (error) {
            next(error);
        }
    };






    //         const card = await CardService.getCard(cardId);
    //         if(card) {
    //             res.status(200).json({
    //                 card
    //             })
    //         }
    //     } catch (error) {
    //         res.status(404).json({ error: 'CardId format is wrong' });  
    //     }
    // };
}

module.exports = new CardController();