import { responseSucess } from "../common/helpers/response.helpers.js";
import { homeService } from "../services/home.service.js";

export const homeController = {
 
   async findAll(req, res, next) {
     const result = await homeService.findAll(req);
     const response = responseSucess(result.items, `Get all homes successfully`);
     res.status(response.statuscode).json(response);
   },

   async findOne(req, res, next) {
     const result = await homeService.findOne(req);
     const response = responseSucess(result, `Get home #${req.params.id} successfully`);
     res.status(response.statuscode).json(response);  
   },

    async findAllComments(req, res, next) {
     const result = await homeService.findAllComments(req);
     const response = responseSucess(result, `Get all comment of images #${req.params.id} successfully`);
     res.status(response.statuscode).json(response);
   },
  
   async creatComment(req, res, next) {
     const result = await homeService.creatComment(req);
     const response = responseSucess(result, `Create comment successfully`);
     res.status(response.statuscode).json(response);
   }, 
   async checkSave(req, res, next) {
     const result = await homeService.checkSave(req);
     const response = responseSucess(result, `Get type of save successfully`);
     res.status(response.statuscode).json(response);
   },
};