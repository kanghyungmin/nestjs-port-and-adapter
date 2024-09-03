
import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { UserModule } from '@application/di/UserModule';
import { AuthModule} from '@application/di/AuthModule'



@Module({
    imports: [
        InfrastructureModule,
        UserModule,
        AuthModule
    ]
})
export class RootModule {}

