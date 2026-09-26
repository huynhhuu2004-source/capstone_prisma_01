import { statusCodes } from "./status.helpers.js"

export const responseSucess= (result,message="Lấy API thành công",statuscode =statusCodes.OK)=>{
    return {
        status:"Success",
        statuscode: statuscode,
        message:message,
        data:result,
        doc:"swagger.com"
    }
}

export const responseEror= (message="INTERNAL SERVER ERROR ",statuscode =statusCodes.INTERNAL_SERVER_ERROR,stack)=>{
    return {
        status:"Success",
        statuscode: statuscode,
        message:message,
        stack: stack,
        doc:"swagger.com"
    }
}