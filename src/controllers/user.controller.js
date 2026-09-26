import { responseSucess } from "../common/helpers/response.helpers.js";
import { userService } from "../services/user.service.js";

export const userController = {
 

   async getUser (req, res, next) {
         const result = await userService.getUser(req);
         const response = responseSucess(result, `Get infor users successfully`);
         res.status(response.statuscode).json(response);
   },

   async getSavedImages(req, res, next) {
         const result = await userService.getSavedImages(req);
         const response = responseSucess(result, `Get user #${req.params.id} successfully`);
         res.status(response.statuscode).json(response);
   },

   async getCreatedImages(req, res, next) {
         const result = await userService.getCreatedImages(req);
         const response = responseSucess(result, `get infor successfully`);
         res.status(response.statuscode).json(response);
   },

   async deleteImage(req, res, next) {
      try {
         const result = await userService.remove(req);
         const response = responseSucess(result, `Remove user #${req.params.id} successfully`);
         res.status(response.statuscode).json(response);
      } catch (err) {
         next(err);
      }
   } ,

    async updateInfoUser(req, res, next) {
         const result = await userService.updateInfoUser(req);
         const response = responseSucess(result, `update info successfully`);
         res.status(response.statuscode).json(response);
   },
    async uploadImages(req, res, next) {
         const result = await userService.uploadImages(req);
         const response = responseSucess(result, `upload images successfully`);
         res.status(response.statuscode).json(response);
   },
};