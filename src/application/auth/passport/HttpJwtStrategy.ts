

import { Code } from '@core/common/code/Code'

import { CoreAssert } from '@core/common/util/assert/CoreAssert'
import { User } from '@core/domain/user/entity/User'
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { HttpAuthService } from '../HttpAuthService'
import { Exception } from '@core/exception/Exception'
import { HttpJwtPayload, HttpUserPayload } from '../type/HttpAuthTypes'

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(private authService: HttpAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(ApiServerConfig.ACCESS_TOKEN_HEADER),
      ignoreExpiration: false,
      secretOrKey: ApiServerConfig.ACCESS_TOKEN_SECRET,
    })
  }
  
  public async validate(payload: HttpJwtPayload): Promise<HttpUserPayload> {
    const user: User = CoreAssert.isNotEmpty(
      await this.authService.getUser({id: payload.id}),
      Exception.new({code: Code.UNAUTHORIZED_ERROR})
    )
  
    return {id: user.getId(), email: user.getEmail()}
  }
  
}
