import { UserRole } from "@core/common/enum/UserEnums"



export type CreateUserEntityPayload = {
    socialID? : string,
    firstName? : string,
    lastName? : string,
    email? : string,
    role : UserRole,
    password? : string,
    id? : string, 
    createdAt? : Date,
    updatedAt? : Date,
    removedAt? : Date
}