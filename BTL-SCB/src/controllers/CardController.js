const CardService = require("../services/CardService");

class CardController {
    create = async (req, res, next) => {
        try {
            const {title, descriptions, members, dueDate, listId } = req.body;
            
            // abc();
            // Gọi đến tầng service
            
            // if (req.files) {
            //     let path = ''
            //     req.files.forEach(function (files, index, arr) {
            //         path = path + files.path + ','
            //     })
            //     path =  path.substring(0, path.lastIndexOf(","))
            //     attachment = path
            // }
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
            const list = await CardService.checkListId(data2)

            if(list) {
                const card = await CardService.create(data);
                res.status(200).json({
                    card
                })
            } else { 
                res.status(200).json({
                    'msg': 'ListId not found'
                })
            }
        } catch (error) {
            res.status(500).json({ error: 'Không tồn tại listId này' });  
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

            // let data2 = {listId};
            const result = await CardService.update(cardId, data)
            // console.log(result)
            if(result) {
                res.status(200).json({
                    'msg': 'Updated card'
                })
            } else { 
                throw new Error('Update failed');
            }
        } catch (error) {
            next (error);
        }
    };



    delete = async (req, res, next) => {
        try {
            const {cardId} = req.params;
            const result = await CardService.delete(cardId)

            if(result) {
                res.status(200).json({
                    'msg': 'Deleted'
                })
            }else {
                throw new Error('Delete failed');
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
            // Goi den service
            const card = await CardService.getCard(cardId);
            res.status(200).json({
                card
            });
        } catch (error) {
            next (error);
        }
    };
}

module.exports = new CardController();