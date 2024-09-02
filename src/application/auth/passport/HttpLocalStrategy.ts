import { Code } from '@core/common/code/Code'

import { CoreAssert } from '@core/common/util/assert/CoreAssert'
import { Exception } from '@core/exception/Exception'
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { HttpUserPayload } from '@application/auth/type/HttpAuthTypes'
import { HttpAuthService } from '../HttpAuthService'

@Injectable()
export class HttpLocalStrategy extends PassportStrategy(Strategy) {
  
  constructor(private authService: HttpAuthService) {
    super({
      usernameField: ApiServerConfig.LOGIN_USERNAME_FIELD,
      passwordField: ApiServerConfig.LOGIN_PASSWORD_FIELD,
    })
  }
  
  public async validate(username: string, password: string): Promise<HttpUserPayload> {
    const user: HttpUserPayload = CoreAssert.isNotEmpty(
      await this.authService.validateUser(username, password),
      Exception.new({code: Code.WRONG_CREDENTIALS_ERROR})
    )
    
    return user
  }

}
