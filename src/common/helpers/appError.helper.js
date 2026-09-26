import jwt from "jsonwebtoken"
import { responseEror } from "./response.helpers.js";
import { statusCodes } from "./status.helpers.js";

export const appError= (err,req,res,next)=>{
    console.log("mid error đặc biệt");

    //jsonwebError là cha nên phải để đầu ( xử lý toàn bộ lỗi token ) phải để đầu 
    //Nếu để TokenExpireError trước thằng jsonweb sẽ ghi đè lại dẫn đến không đúng statusCode trả về 
    if (err instanceof jwt.JsonWebTokenError){
        err.code=statusCodes.UNAUTHORIZED; // 401 yêu cầu login lại 
    }

     if (err instanceof jwt.TokenExpiredError){
        err.code=statusCodes.FORBIDDEN; //403 FE sẽ gọi refreshToken 
    }

    
    const respone = responseEror(err?.message,err?.code,err?.stack);
    res.status(respone.statuscode).json({respone});
}

//phần bắt lỗi middleware ở ngoài server.js