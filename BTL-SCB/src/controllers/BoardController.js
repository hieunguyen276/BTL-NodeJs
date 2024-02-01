const BoardService = require("../services/BoardService");

class BoardController {
    create = async (req, res, next) => {
        try {
            const {title, background} = req.body;
            
            // abc();
            // Gọi đến tầng service
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
                res.status(200).json({
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
            // abc();
            // Gọi đến tầng service
            let data = {
                title,
                background: req.file ? req.file.path : background
            }
            const result = await BoardService.update(id, data)

            if(result) {
                res.status(200).json({
                    'msg': 'Updated board'
                })
            } else { 
                throw new Error('Update failed');
            }
        } catch (error) {
            throw error;
        }
    };


    delete = async (req, res, next) => {
        try {
            const {id} = req.params;
            const result = await BoardService.delete(id)

            if(result) {
                res.status(200).json({
                    'msg': 'Deleted'
                })
            }else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            throw error;
        }
    };


    getAll = async (req, res, next) => {
        try {
            // Goi den service
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