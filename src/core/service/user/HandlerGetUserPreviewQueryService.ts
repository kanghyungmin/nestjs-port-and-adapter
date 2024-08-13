import { GetUserPreviewQuery } from '@core/domain/user/handler/input/GetUserPreviewQuery'
import { GetUserPreviewQueryResult } from '@core/domain/user/handler/output/GetUserPreviewQueryResult'
import { Optional } from '@core/common/type/CommonType'
import { User } from '@core/domain/user/entity/User'
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort'
import { GetUserPreviewQueryHandler } from '@core/domain/user/port/handler/GetUserPreviewQueryHandler'

export class HandleGetUserPreviewQueryService implements GetUserPreviewQueryHandler {
  
  constructor(
    private readonly userRepository: UserRepositoryPort,
  ) {}
  
  public async handle(query: GetUserPreviewQuery): Promise<Optional<GetUserPreviewQueryResult>> {
    let queryResult: Optional<GetUserPreviewQueryResult>
    
    const user: Optional<User> = await this.userRepository.findUser(query.by)
    if (user) {
      queryResult = GetUserPreviewQueryResult.new(user.getId(), user.getName())
    }
    
    return queryResult
  }
  
}
