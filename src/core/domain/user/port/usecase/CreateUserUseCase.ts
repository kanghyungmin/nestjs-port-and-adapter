

import { CreateUserParam } from '@core/domain/user/usecase/param/CreateUserParam';
import { UseCase } from '@core/common/usecase/UseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';


export interface CreateUserUseCase extends UseCase<CreateUserParam, UserUseCaseDto> {}
