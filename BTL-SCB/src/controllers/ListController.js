const ListService = require("../services/ListService");

class ListController {
    create = async (req, res, next) => {
        try {
            const {title, boardId} = req.body;
            let data1 = {title, boardId};
            let data2 = {boardId};
            const result = await ListService.checkBoardId(data2);

            if(result == false) {
                res.status(500).json({ error: 'BoardId not found' }); // Sai boardId 
            } else {
                const list = await ListService.create(data1)
                res.status(200).json({
                    list
                })  
            }
        } catch (error) {
            next(error);
        }
    };


    update = async (req, res, next) => {
        try {
            const {title} = req.body;
            const {listId} = req.params;
            let data = {title}


            const result = await ListService.checkListId(listId);
            if(result) {
                const listUpdate = await ListService.update(listId, data)
                if(listUpdate) {
                    const list = await ListService.getNewList(listId)
                    res.status(200).json({
                        'msg': 'Updated',
                        list
                    })
                }else {
                    throw new Error('Update failed');
                } 
                
            } else {
                res.status(404).json({ error: 'ListId not found' }); 
            }
        } catch (error) {
            next(error);
        }
    };


    delete = async (req, res, next) => {
        try {
            const {listId} = req.params;
            
            const result = await ListService.delete(listId)
            // console.log(result);
            if(result == true) {
                const deleteAllCard = await ListService.deleteAllCard(listId);
                // console.log(deleteAllCard);
                if(deleteAllCard == true) {
                    res.status(200).json({
                        'msg': 'Deleted'
                    })
                } else {
                    res.status(404).json({
                        'msg': 'Delete all card error'
                    })
                }
            }else {
                res.status(404).json({
                    'msg': 'ListId not found'
                })
            }
        } catch (error) {
            next (error);
        }
    };



    getAll = async (req, res, next) => {
        try {
            const {boardId} = req.params;
            // console.log(boardId);
            // Goi den service
            const lists = await ListService.getAll(boardId);
            res.status(200).json({
                lists
            });
        } catch (error) {
            res.status(200).json({
                'msg': 'BoardId not found'
            })
        }
    };
}

module.exports = new ListController();