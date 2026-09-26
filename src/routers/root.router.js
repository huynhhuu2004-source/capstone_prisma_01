import express from 'express';
import authRouter from './auth.router.js';
import homeRouter from './home.router.js';
import userRouter from './user.router.js';
import { protect } from '../common/middleware/protect.middleware.js';

const rootRouter = express.Router();

// Tạo route CRUD
rootRouter.use("/auth",authRouter); //Chức năng đăng ký ,đăng nhập 
rootRouter.use("/home",homeRouter); //Chức năng hiện ảnh , tìm kiếm ảnh 
rootRouter.use("/user",protect,userRouter); //Chức năng quản lý user  
export default rootRouter;