import { HttpLocalStrategy } from "@application/auth/passport/HttpLocalStrategy";
import { AuthController } from "@application/controller/AuthController";
import { ApiServerConfig } from "@infrastructure/config/ApiServerConfig";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "./UserModule";
import { HttpAuthService } from "@application/auth/HttpAuthService";
import { HttpJwtStrategy } from "@application/auth/passport/HttpJwtStrategy";


@Module({
    controllers : [AuthController],
    imports : [
        PassportModule,
        JwtModule.register({
            secret : ApiServerConfig.ACCESS_TOKEN_SECRET,
            signOptions : {
                expiresIn : `${ApiServerConfig.ACCESS_TOKEN_TTL_IN_MINUTES}m`
            },
        }),
        UserModule,
    ],
    providers : [HttpAuthService,HttpLocalStrategy, HttpJwtStrategy]
})
export class AuthModule {}