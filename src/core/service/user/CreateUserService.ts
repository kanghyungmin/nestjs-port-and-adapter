
import { Code } from "@core/common/code/Code";
import { Exception } from "@core/exception/Exception";
import { CoreAssert } from "@core/common/util/assert/CoreAssert";

import { User } from "@core/domain/user/entity/User";
import { UserRepositoryPort } from "@core/domain/user/port/persistence/UserRepositoryPort";

import { UserUseCaseDto } from "@core/domain/user/usecase/dto/UserUseCaseDto";
import { CreateUserUseCase } from "@core/domain/user/usecase/CreateUserUseCase";
import { CreateUserPort } from "@core/domain/user/port/port/CreateUserPort";



export class CreateUserService implements CreateUserUseCase {
    constructor(
        private readonly UserRepository : UserRepositoryPort
    ) {}
    
    public async execute(payload : CreateUserPort) : Promise<UserUseCaseDto> {
        const doesUserExist : boolean = !!(await this.UserRepository.countUsers({email : payload.email}));
        CoreAssert.isFalse(doesUserExist, Exception.new({
            code : Code.ENTITY_ALREADY_EXISTS,
            overrideMessage : 'User already exists'
        }))
        const user: User = await  User.new({
            firstName : payload.firstName,
            lastName : payload.lastName, 
            email : payload.email,
            password : payload.password,
        })
        await this.UserRepository.addUser(user);
        return UserUseCaseDto.newFromUser(user);
    }
}
