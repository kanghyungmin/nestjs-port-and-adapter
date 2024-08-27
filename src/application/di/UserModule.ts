import { UserController } from "@application/controller/UserController"
import { UserDITokens } from "@core/domain/user/di/UserDITokens"
import { CreateUserService } from "@core/service/user/CreateUserService"
import { HandleGetUserPreviewQueryService } from "@core/service/user/HandlerGetUserPreviewQueryService"
import { TypeOrmUserRepositoryAdapter } from "@infrastructure/adapter/persistence/typeorm/repository/user/TypeOrmUserRepositoryAdapter"
import { NestWrapperGetUserPreviewQueryHandler } from "@infrastructure/handler/user/NestWrapperGetUserPreviewQueryHandler"
import { Module, Provider } from "@nestjs/common"
import { DataSource } from "typeorm"


const persistenceProviders: Provider[] = [
    {
      provide   : UserDITokens.UserRepository,
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(TypeOrmUserRepositoryAdapter);
      },
      inject    : ['DATA_SOURCE']
    }
  ]
  
  const useCaseProviders: Provider[] = [
    {
      provide   : UserDITokens.CreateUserUseCase,
      useFactory: (userRepository) => new CreateUserService(userRepository),
      inject    : [UserDITokens.UserRepository]
    },
  ]
  
  const handlerProviders: Provider[] = [
    NestWrapperGetUserPreviewQueryHandler,
    {
      provide   : UserDITokens.GetUserPreviewQueryHandler,
      useFactory: (userRepository) => new HandleGetUserPreviewQueryService(userRepository),
      inject    : [UserDITokens.UserRepository]
    }
  ]
  
  @Module({
    controllers: [
      UserController
    ],
    providers: [
      ...persistenceProviders,
      ...useCaseProviders,
      ...handlerProviders,
    ],
    exports: [
      UserDITokens.UserRepository
    ]
  })
  export class UserModule {}
  