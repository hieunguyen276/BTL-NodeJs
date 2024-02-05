const BoardService = require("../services/BoardService");

class BoardController {
    create = async (req, res, next) => {
        try {
            const {title, background} = req.body;
            
            let data = {
                title,
                background: req.file ? req.file.path : background
            }
            const board = await BoardService.create(data)

            if(board) {
                res.status(200).json({
                    board
                })
            } else { 
                res.status(404).json({
                    'msg': 'Tạo board thất bại'
                })
            }
        } catch (error) {
            throw error;
        }
    };


    update = async (req, res, next) => {
        try {
            const {title, background} = req.body;
            const {id} = req.params;

            let data = {
                title,
                background: req.file ? req.file.path : background
            }

            const result = await BoardService.checkBoardId(id);
            if(result) {
                const boardUpdate = await BoardService.update(id, data)
                if(boardUpdate) {
                    const board = await BoardService.getNewBoard(id)
                    res.status(200).json({
                        'msg': 'Updated',
                        board
                    })
                }else {
                    throw new Error('Update failed');
                } 
                
            } else {
                res.status(404).json({ error: 'BoardId not found' });
            }
        } catch (error) {
            throw error;
        }
    };

    delete = async (req, res, next) => {
        try {
            const {id} = req.params;
            
            const result = await BoardService.delete(id)
            if(result == true) {
                const deleteList = await BoardService.deleteAllList(id);
                // console.log(deleteList);
                if(deleteList) {
                    const deleteCard = await BoardService.deleteAllCard(deleteList);
                    if (deleteCard) { 
                        res.status(200).json({
                            'msg': 'Deleted'
                        })
                    } else {
                        res.status(404).json({
                            'msg': 'Delete all card error'
                        })
                    }
                } else {
                    res.status(404).json({
                        'msg': 'Delete error'
                    })
                }
            }else {
                res.status(404).json({
                    'msg': 'BoardId not found'
                })
            }
        } catch (error) {
            next (error);
        }
    };


    getAll = async (req, res, next) => {
        try {
            const boards = await BoardService.getAll();
            res.status(200).json({
                boards
            });
        } catch (error) {
            throw error;
        }
    };
}

module.exports = new BoardController();