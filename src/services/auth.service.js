import { decode } from "jsonwebtoken";
import { BadRequestException } from "../common/helpers/exception.helpers.js";
import { prisma } from "../common/prisma/conect.prisma.js";
import bcrypt from'bcrypt'
import { TokenService } from "./token.service.js";

export const authService = {
   async register(req) {
      const {email,mat_khau,ho_ten,tuoi } =req.body;
      console.log( {email,mat_khau,ho_ten,tuoi });
      //Kiểm tra tài khoản đang đăng ký có tồn tại 
      const userExist= await prisma.nguoi_dung.findUnique({
        where:{email :email}
      })
      console.log(userExist);

      //nếu đã tồn tại rồi thông báo đã đk 
      if(userExist){
        throw new BadRequestException("Tài khoản đã tồn tại");
      }
      //chưa thì cho phép tạo
      const hashPass = bcrypt.hashSync(mat_khau,10);
      await prisma.nguoi_dung.create({
        data:{email:email, mat_khau:hashPass, ho_ten:ho_ten,tuoi: tuoi}
      })

      return true;
    },
 
     async login(req) {
      const {email,mat_khau } =req.body;
      console.log( {email,mat_khau});

      const userExist= await prisma.nguoi_dung.findUnique({
         where:{email :email},omit:{mat_khau:false}
       })

       if(!userExist){
        throw new BadRequestException("Tài khoản không chính xác")
       }
       
       //giải mã lại code 
       const deocdePass = bcrypt.compareSync(mat_khau,userExist.mat_khau);
       if(!decode) {
        throw new BadRequestException("Tài khoản không chính xác")
       }

       //đăng nhập đúng hết thì tạo token 
       const accessToken = TokenService.createAccessToken(userExist.nguoi_dung_id);
       const refreshToken = TokenService.createRefreshToken(userExist.nguoi_dung_id);
       return {accessToken: accessToken,refreshToken: refreshToken};
     }
};