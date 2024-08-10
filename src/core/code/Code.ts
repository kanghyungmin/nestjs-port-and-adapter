export type CodeDescription = {
    code : number
    message : string,
}


export class Code {
    public static SUCCESS : CodeDescription = {
        code : 200,
        message : "Success"
    };

    public static BAD_REQUEST_ERROR : CodeDescription = {
        code : 400,
        message : "Bad Request"
    }
    public static UNAUTHORIZED_ERROR : CodeDescription = {
        code : 401,
        message : "Unauthorized"
    }
    public static WRONG_CREDENTIALS_ERROR : CodeDescription = {
        code : 402,
        message : "Wrong Credentials"
    }
    public static ACCESS_DENIED_ERROR : CodeDescription = {
        code : 403,
        message : "Access Denied"
    }
    public static INTERNAL_ERROR : CodeDescription = {
        code : 500,
        message : "Internal Error"
    }
    public static ENTITY_NOT_FOUND : CodeDescription = {
        code : 1000,
        message : "Entity Not Found"
    }
    public static ENTITY_VALIDATION_ERROR : CodeDescription = {
        code : 1001,
        message : "Entity Validation Error"
    }
    public static USECASE_PARAMETER_VALIDATION_ERROR : CodeDescription = {
        code : 1002,
        message : "Usecase Parameter Validation Error"
    }
    public static VALUE_OBJECT_VALIDATION_ERROR : CodeDescription = {
        code : 1003,
        message : "Value Object Validation Error"
    }
    public static ENTITY_ALREADY_EXISTS : CodeDescription = {
        code : 1004,
        message : "Entity Already Exists"
    }
}