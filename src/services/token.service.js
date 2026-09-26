import jwt  from 'jsonwebtoken'
import { BadRequestException } from '../common/helpers/exception.helpers.js';
import { REFRESH_KEY, SECRET_KEY } from '../common/constants/app.constants.js';

export const TokenService = {
    createAccessToken(userID){
        if(!userID){
            throw new BadRequestException("Không có UserID")
        }

        const accessToken = jwt.sign({userId: userID}, SECRET_KEY, {expiresIn: "30m"})
        return accessToken;
    },

    createRefreshToken(userID){
        const accessToken = jwt.sign({userId: userID}, REFRESH_KEY, {expiresIn: "30m"})
        return accessToken;
    },

    verifyAccessToken(accessToken,option){
         const decodeAccessToken = jwt.decode(accessToken, SECRET_KEY, option)
        return decodeAccessToken;
    },

    verifyRefreshToken(refreshToken,option){
         const decodeAccessToken = jwt.decode(refreshToken, REFRESH_KEY, option)
        return decodeAccessToken;
    }
}