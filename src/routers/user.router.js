import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get('/',protect, userController.getUser);
userRouter.get('/images-save', userController.getSavedImages);
userRouter.get('/images-update', userController.getCreatedImages);
userRouter.delete('/:id', userController.deleteImage);
userRouter.put('/update-info', userController.updateInfoUser);
export default userRouter;