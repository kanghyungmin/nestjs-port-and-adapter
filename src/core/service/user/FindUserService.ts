import { CoreDITokens } from "@core/common/di/CoreDITokens";
import { QueryBusPort } from "@core/common/message/port/QueryBusPort";
import { Optional } from "@core/common/type/CommonType";
import { GetUserPreviewQuery } from "@core/domain/user/handler/input/GetUserPreviewQuery";
import { GetUserPreviewQueryResult } from "@core/domain/user/handler/output/GetUserPreviewQueryResult";
import { FindUserPort } from "@core/domain/user/port/port/FindUserPort";
import { UserUseCaseDto } from "@core/domain/user/usecase/dto/UserUseCaseDto";
import { FindUserUseCase } from "@core/domain/user/usecase/FindUserUseCase";
import { Inject} from "@nestjs/common";

export class FindUserService implements FindUserUseCase {
    constructor(
        @Inject(CoreDITokens.QueryBus)
        private readonly queryBus : QueryBusPort
    ) {

    }
    public async execute(payload: FindUserPort): Promise<Optional<UserUseCaseDto>> {
        const queryResult : Optional<GetUserPreviewQueryResult> = await this.queryBus.sendQuery(
            GetUserPreviewQuery.new({id : payload.id})
        )
        if(queryResult) {
            return UserUseCaseDto.newFromGetUserPreviewQueryResult(queryResult)
        }
        return undefined
    }


    
}