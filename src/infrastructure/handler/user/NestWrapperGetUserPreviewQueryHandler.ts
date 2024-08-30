import { Optional } from "@core/common/type/CommonType";
import { UserDITokens } from "@core/domain/user/di/UserDITokens";
import { GetUserPreviewQuery } from "@core/domain/user/handler/input/GetUserPreviewQuery";
import { GetUserPreviewQueryResult } from "@core/domain/user/handler/output/GetUserPreviewQueryResult";
import { GetUserPreviewQueryHandler } from "@core/domain/user/port/handler/GetUserPreviewQueryHandler";
import { Inject, Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";


@Injectable()
@QueryHandler(GetUserPreviewQuery)
export class NestWrapperGetUserPreviewQueryHandler implements IQueryHandler<GetUserPreviewQuery> {
    
    constructor(
        @Inject(UserDITokens.GetUserPreviewQueryHandler)
        private readonly handleService: GetUserPreviewQueryHandler
    ) {}

    async execute(query: GetUserPreviewQuery) : Promise<Optional<GetUserPreviewQueryResult>> {
        return this.handleService.handle(query)
    }
}