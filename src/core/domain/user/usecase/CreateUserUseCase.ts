import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { CreateUserPort } from '@core/domain/user/port/port/CreateUserPort';
import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';


export interface CreateUserUseCase extends TransactionalUseCase<CreateUserPort, UserUseCaseDto> {}
