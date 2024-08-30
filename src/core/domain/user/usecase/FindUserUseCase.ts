
import { UseCase } from '@core/common/usecase/UseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { FindUserPort } from '@core/domain/user/port/port/FindUserPort';
import { Optional } from '@core/common/type/CommonType';


export interface FindUserUseCase extends UseCase<FindUserPort, Optional<UserUseCaseDto>> {}
