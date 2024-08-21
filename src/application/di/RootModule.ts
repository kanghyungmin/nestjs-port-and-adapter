
import { Module } from '@nestjs/common';
import { InfrastructureModule } from './InfrastructureModule';
import { UserModule } from './UserModule';



@Module({
    imports: [
        InfrastructureModule,
        UserModule,
    ]
})
export class RootModule {}

