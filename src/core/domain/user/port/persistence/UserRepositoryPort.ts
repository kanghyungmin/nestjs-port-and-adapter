import { User } from '@core/domain/user/entity/User';
import { Optional } from '@core/common/type/CommonType';


export interface UserRepositoryPort {
    findUser(by: {id?: string, email?: string}) : Promise<Optional<User>>;
    countUsers(by:{id?:string, email?: string}) : Promise<number>;
    addUser(user: User): Promise<{id: string}>;
    updateUser(user: User) : Promise<void>;
}