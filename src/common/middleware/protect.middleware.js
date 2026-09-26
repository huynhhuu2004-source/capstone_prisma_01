import { TokenService } from "../../services/token.service.js";
import { BadRequestException } from "../helpers/exception.helpers.js";
import { prisma } from "../prisma/conect.prisma.js";

export const protect=async (req,res,next)=>{
    const { accessToken } = req.cookies;

    if(!accessToken){
        throw new BadRequestException("Không có accessToken");
    }

    const decode= TokenService.verifyAccessToken(accessToken);
    const userExist =await prisma.nguoi_dung.findUnique({
        where :{nguoi_dung_id: decode.userId},
    })

    if(!userExist){
        throw new BadRequestException("User không tồn tại");
    }
    req.user= userExist; // ghi đè chuyển user tới trang tiếp 
    next();
}