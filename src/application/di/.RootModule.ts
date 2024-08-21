
import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { UserModule } from '@application/di/UserModule';



@Module({
    imports: [
        InfrastructureModule,
        UserModule,
    ]
})
export class RootModule {}

