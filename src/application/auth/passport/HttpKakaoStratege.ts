import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-kakao';
import { HttpKakaoUserPayload } from '../type/HttpAuthTypes';
import { HttpAuthService } from '@application/auth/HttpAuthService'
import { Exception } from '@core/exception/Exception';
import { Code } from '@core/common/code/Code';

@Injectable()
export class HttpKakaoStratege extends PassportStrategy(Strategy, 'kakao') {
    constructor(private authService: HttpAuthService) {
        super({	
          clientID: ApiServerConfig.KAKAO_API_KEY,
          clientSecret: '',
          callbackURL: ApiServerConfig.KAKAO_REDIRECT_URL,
        });
      }
    
      async validate(	// POST /oauth/token 요청(by passport) 후, token 발급
        accessToken: string,
        refreshToken: string,
        profile: Profile,
      ) : Promise<HttpKakaoUserPayload>{

        let user : User = await this.authService.getSocialUserWithSave({socialID: String(profile.id)})
        CoreAssert.isNotEmpty(
          await this.authService.getUser({id: user.getId()}),
          Exception.new({code: Code.UNAUTHORIZED_ERROR, overrideMessage : "User not Found on the Kakao Strategy"})
        )

        return {id: user.getId(), role: user.getRole()}
      }

}
