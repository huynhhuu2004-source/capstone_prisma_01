import express from 'express';
import { homeController } from '../controllers/home.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';

const homeRouter = express.Router();

// Tạo route CRUD
homeRouter.get('/', homeController.findAll);
homeRouter.get('/:id', homeController.findOne);
homeRouter.get('/:id/binh-luan', homeController.findAllComments);
homeRouter.post('/binh-luan', protect,homeController.creatComment);
homeRouter.get('/:id/check-Save', protect,homeController.checkSave);
export default homeRouter;