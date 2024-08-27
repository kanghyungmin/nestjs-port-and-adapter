import { UserController } from "@application/controller/UserController"
import { CoreDITokens } from "@core/common/di/CoreDITokens"
import { UserDITokens } from "@core/domain/user/di/UserDITokens"
import { CreateUserService } from "@core/service/user/CreateUserService"
import { HandleGetUserPreviewQueryService } from "@core/service/user/HandlerGetUserPreviewQueryService"
import { TypeOrmUser } from "@infrastructure/adapter/persistence/typeorm/entity/user/TypeOrmUser"
import { TypeOrmUserRepositoryAdapter } from "@infrastructure/adapter/persistence/typeorm/repository/user/TypeOrmUserRepositoryAdapter"
import { NestWrapperGetUserPreviewQueryHandler } from "@infrastructure/handler/user/NestWrapperGetUserPreviewQueryHandler"
import { Module, Provider } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DataSource } from "typeorm"


const persistenceProviders: Provider[] = [
    {
      provide   : UserDITokens.UserRepository,
      useFactory: (dataSource: DataSource) => {
        const manager = dataSource.manager;
        return new TypeOrmUserRepositoryAdapter(manager);
      },
      inject    : [CoreDITokens.DataSource]
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
      // UserDITokens.UserRepository
    ]
  })
  export class UserModule {}
  