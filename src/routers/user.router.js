import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';
import { upload } from '../common/multer/memory-storage.js';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get('/',protect, userController.getUser);
userRouter.get('/images-save', userController.getSavedImages);
userRouter.get('/images-update', userController.getCreatedImages);
userRouter.delete('/:id', userController.deleteImage);
userRouter.put('/update-info', userController.updateInfoUser);

userRouter.post("/images-cloud",upload.single("avatar"),  userController.uploadImages); //Chức năng up ảnh  
export default userRouter;