import { BadRequestException } from "../common/helpers/exception.helpers.js";
import { prisma } from "../common/prisma/conect.prisma.js";

export const userService = {
   async getUser(req) {
    const nguoi_dung_id = req.user.nguoi_dung_id ;

    const user = await prisma.nguoi_dung.findUnique({
        where: { nguoi_dung_id: Number(nguoi_dung_id) },
        omit: { mat_khau: true }
    });

    return user;
   },

   async getSavedImages(req) {
    const nguoi_dung_id = req.user.nguoi_dung_id; // Hoặc req.params.id

    const savedImages = await prisma.luu_anh.findMany({
     where: { nguoi_dung_id: Number(nguoi_dung_id) },
        include: {
        hinh_anh: true // Lấy chi tiết bức ảnh đã lưu
        }
    });

    return savedImages;
   },


   async getCreatedImages(req) {
      const nguoi_dung_id = req.user.nguoi_dung_id; 

      const createdImages = await prisma.hinh_anh.findMany({
        where: { 
            nguoi_dung_id: Number(nguoi_dung_id),
            isDeleted: false
            }
      });

      return createdImages;
   },

 

   async remove(req) {
      const { id } = req.params;
        const nguoi_dung_id = req.user.nguoi_dung_id;

        // 1. Kiểm tra ảnh có tồn tại và thuộc sở hữu của user này không
        const image = await prisma.hinh_anh.findFirst({
            where: {
              hinh_id: Number(id),
              nguoi_dung_id: Number(nguoi_dung_id)
            }
        });

        if (!image) {
            throw new BadRequestException("Hình ảnh không tồn tại ");
        }

        // cập nhật lại
        await prisma.hinh_anh.update({
            where: { hinh_id: Number(id) },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        });

        return true;
   },

   async updateInfoUser(req){
    const nguoi_dung_id = req.user.nguoi_dung_id;  
    const { email, ho_ten, tuoi, anh_dai_dien } = req.body;
 
    const updatedUser = await prisma.nguoi_dung.update({
      where: { 
        nguoi_dung_id: Number(nguoi_dung_id) 
      },
      data: {
        email,
        ho_ten,
        tuoi: tuoi ? Number(tuoi) : undefined,
        anh_dai_dien
      },
    });

    return updatedUser;
   }
};