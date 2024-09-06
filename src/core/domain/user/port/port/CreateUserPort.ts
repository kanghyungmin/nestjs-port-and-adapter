import { UserRole } from "@core/common/enum/UserEnums";

export interface CreateUserPort { 
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    role : UserRole;
}