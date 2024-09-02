import { NestHttpExceptionFilter } from "@application/exception-filter/NestHttpExceptionFilter"
import { NestHttpLoggingInterceptor } from "@application/interceptor/NestHttpLoggingInterceptor"
import { CoreDITokens } from "@core/common/di/CoreDITokens"
import { NestCommandBusAdapter } from "@infrastructure/adapter/message/NestCommandBusAdapter"
import { NestEventBusAdapter } from "@infrastructure/adapter/message/NestEventBusAdapter"
import { NestQueryBusAdapter } from "@infrastructure/adapter/message/NestQueryBusAdapter"
import { ApiServerConfig } from "@infrastructure/config/ApiServerConfig"
import { Global, Module, OnApplicationBootstrap, Provider } from "@nestjs/common"
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core"
import { CqrsModule } from "@nestjs/cqrs"
import { initializeTransactionalContext,addTransactionalDataSource} from "typeorm-transactional"

import { PostgresDataSource } from "@infrastructure/adapter/persistence/typeorm/DataSource"


const providers: Provider[] = [
    {
      provide : APP_FILTER,
      useClass: NestHttpExceptionFilter,
    },
    {
      provide: CoreDITokens.CommandBus,
      useClass: NestCommandBusAdapter,
    },
    {
      provide: CoreDITokens.QueryBus,
      useClass: NestQueryBusAdapter,
    },
    {
      provide: CoreDITokens.EventBus,
      useClass: NestEventBusAdapter,
    }
  ]
  
  if (ApiServerConfig.LOG_ENABLE) {
    providers.push({
      provide : APP_INTERCEPTOR,
      useClass: NestHttpLoggingInterceptor,
    })
  }

  providers.push({
    provide : CoreDITokens.DataSource,
    useFactory: async () => {
      const dataSource =  PostgresDataSource
      const retVal = await dataSource.initialize()
      // addTransactionalDataSource(PostgresDataSource);

      return retVal
    }
  })
  
  @Global()
  @Module({
    imports: [
      CqrsModule,
    ],
    providers: providers,
    exports: [
      CoreDITokens.CommandBus,
      CoreDITokens.QueryBus,
      CoreDITokens.EventBus,
      CoreDITokens.DataSource,
    ]
  })
  export class InfrastructureModule implements OnApplicationBootstrap {
    onApplicationBootstrap(): void {
      initializeTransactionalContext()
        addTransactionalDataSource({
            name: 'postgres',
            dataSource: PostgresDataSource
        });
    }
  }
