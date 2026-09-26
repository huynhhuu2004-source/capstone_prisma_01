import { buildQueryPrisma } from "../common/helpers/build_query.helper.js";
import { prisma } from "../common/prisma/conect.prisma.js";

export const homeService = {
   async findAll(req) {
        const {where,page,pageSize,index}=buildQueryPrisma(req);

       const resultPrisma = await prisma.hinh_anh.findMany({
        where: where,
        skip: index,
        take: pageSize,
       });

       const totalItems= await prisma.hinh_anh.count({
        where: where
       })

       const totalPages=  Math.ceil(totalItems/pageSize);

       return {
        items: resultPrisma,
        totalItems: totalItems,
        totalPages: totalPages,
        page:page,
        pageSize:pageSize,
       };
   },

    async findOne(req) {
        const {id} =req.params;
        
        const imagesDetail= await prisma.hinh_anh.findUnique({
            where:{hinh_id:Number(id)},
            include:{
                nguoi_dung:{omit :{mat_khau:true}}
            }
        })

       return imagesDetail;
   },

   async findAllComments(req) {
        const {id} = req.params;

        const result = await prisma.binh_luan.findMany({
            where:{ hinh_id: Number( id)},
            include:{
                nguoi_dung:{
                    omit: {mat_khau:true}
                }
            },
            orderBy:{
                ngay_binh_luan:'desc'
            }
        });
        return result;
    },

    async creatComment(req) {
        const { hinh_id, noi_dung } = req.body; // lấy nội dung nhập 
        const nguoi_dung_id = req.user?.nguoi_dung_id || 1; // lấy thằng đang nhập bình luận 

        const result = await prisma.binh_luan.create({
            data:{
                hinh_id:Number(hinh_id),
                nguoi_dung_id:Number(nguoi_dung_id),
                noi_dung:noi_dung,
                ngay_binh_luan:new Date(),
            },
            include:{
                nguoi_dung:{omit : {mat_khau:true}}
            }
        });
        return result;
    },

     async checkSave(req) {
        const { id } = req.params; 
         
        const check= await prisma.luu_anh.findFirst({
            where: {
                hinh_id: Number(id),
                nguoi_dung_id: Number(id),
            },
        });
        //trả thêm biến 
        return {
            isSaved: Boolean(check),
        }
    },

};