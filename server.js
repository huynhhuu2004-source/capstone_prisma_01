import express from 'express'
import cookieParser from 'cookie-parser';
import rootRouter from './src/routers/root.router.js';
import { prisma } from './src/common/prisma/conect.prisma.js';
import { appError } from './src/common/helpers/appError.helper.js';

const app=express();

//Middleware 
app.use(express.json());
app.use(cookieParser());
 
prisma
app.use('/api',rootRouter);
 
app.use(appError);

const PORT=3069;
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})