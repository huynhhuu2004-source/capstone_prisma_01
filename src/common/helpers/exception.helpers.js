import { statusCodes } from "./status.helpers.js";

//400
export class BadRequestException extends Error{
    code = statusCodes.BAD_REQUEST; // thêm mới code cho respone
    name ="BadRequestException";
    constructor(message= "Bad request"){ // ghi đè lại phương thức message 
        super(message);
    }
}

//401
export class UnauthorizedException extends Error{
    code = statusCodes.UNAUTHORIZED;
    name ="UnauthorizedException";
    constructor(message= "Unauthorized"){
        super(message);
    }
}

//403
export class ForbiddenException extends Error{
    code = statusCodes.FORBIDDEN;
    name ="ForbiddenException";
    constructor(message= "Forbidden"){
        super(message);
    }
}

//404
export class  NotFoundException extends Error{
    code = statusCodes.NOT_FOUND;
    name ="ForbiddenException";
    constructor(message= "Not found"){
        super(message);
    }
}

//429
export class  TOO_MANY_REQUESTS extends Error{
    code = statusCodes.TOO_MANY_REQUESTS;
    name ="TooManyRequestException";
    constructor(message= "Too_Many_Request"){
        super(message);
    }
}