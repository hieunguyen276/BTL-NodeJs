const ListService = require("../services/ListService");

class ListController {
    create = async (req, res, next) => {
        try {
            const {title, boardId} = req.body;
            // const {idBoard} = req.params;
            
            // abc();
            // Gọi đến tầng service
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
            // console.error(error); // In ra lỗi để xác định nguyên nhân
            
            res.status(500).json({ error: 'BoardId format is wrong '});  // Sai địng dạng ở đây là dài hơn or ngắn hơn
        }
    };


    update = async (req, res, next) => {
        try {
            const {title} = req.body;
            const {listId} = req.params;
            // abc();
            // Gọi đến tầng service
            let data = {title}
            const result = await ListService.update(listId, data)

            if(result) {
                res.status(200).json({
                    'msg': 'Updated list'
                })
            } else { 
                throw new Error('Update failed');
            }
        } catch (error) {
            res.status(200).json({
                'msg': 'ListId not found'
            })
        }
    };


    delete = async (req, res, next) => {
        try {
            const {listId} = req.params;
            const result = await ListService.delete(listId)

            if(result) {
                res.status(200).json({
                    'msg': 'Deleted'
                })
            }else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            res.status(200).json({
                'msg': 'ListId not found'
            })
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