import { responseSucess } from "../common/helpers/response.helpers.js";
import { authService } from "../services/auth.service.js";

export const authController = {
   async register(req, res, next) {
     const result = await authService.register(req);
     const response = responseSucess(result, `Register successfully`);
     res.status(response.statuscode).json(response);
   },

   async login(req, res, next) {
     const result = await authService.login(req);
     const response = responseSucess(true, `Login successfully`);
     res.cookie("accessToken",result.accessToken);
     res.cookie("refreshToken",result.refreshToken);
     res.status(response.statuscode).json(response);
   },

    
   
};