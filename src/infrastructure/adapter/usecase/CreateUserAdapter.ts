import { Exclude, Expose, plainToClass } from 'class-transformer';
import { UseCaseValidatableParameter } from "@core/common/validate/UseCaseValidatableParameter";
import { IsEmail, IsIn, IsString } from 'class-validator';
import { CreateUserPort } from '@core/domain/user/port/port/CreateUserPort';
import { UserRole } from '@core/common/enum/UserEnums';


@Exclude()
export class CreateUserAdapter extends UseCaseValidatableParameter implements CreateUserPort {
    
    @Expose()
    @IsString()
    public firstName: string;

    @Expose()
    @IsString()
    public lastName: string;

    @Expose()
    @IsEmail()
    public email: string;
      
    @Expose()
    @IsIn([UserRole.AUTHOR, UserRole.GUEST])
    public role: UserRole;

    @Expose()
    @IsString()
    public password : string;

    public static async new(payload : CreateUserPort) : Promise<CreateUserAdapter> {
        const adapter : CreateUserAdapter = plainToClass(CreateUserAdapter, payload)
        await adapter.validate()
        return adapter
    }

}