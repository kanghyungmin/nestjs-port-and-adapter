import { IsString, validate } from 'class-validator';
import { FindUserPort } from "@core/domain/user/port/port/FindUserPort";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { UseCaseValidatableParameter } from '@core/common/validate/UseCaseValidatableParameter';


@Exclude()
export class FindUserAdapter extends UseCaseValidatableParameter implements FindUserPort {

    @Expose()
    @IsString()
    public id : string;


    public static async new(payload : FindUserPort) : Promise<FindUserAdapter> {
        const adapter : FindUserAdapter = plainToClass(FindUserAdapter, payload)
        adapter.validate()
        return adapter
    }

}