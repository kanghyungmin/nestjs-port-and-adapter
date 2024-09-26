
// apple.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy,  } from 'passport-apple';
import { HttpAuthService } from '@application/auth/HttpAuthService'
import { User } from '@core/domain/user/entity/User';
import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { Exception } from '@core/exception/Exception';
import { Code } from '@core/common/code/Code';


type AppleProfile = {
    id: string;
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
  }

@Injectable()
export class HttpAppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(private authService: HttpAuthService) {
    super({
      clientID: process.env.APPLE_CLIENTID,        // Apple Developer에서 발급받은 clientID
      teamID: process.env.APPLE_TEAMID,            // Apple Developer에서 발급받은 teamID
      keyID: process.env.APPLE_KEYID,              // Apple Developer에서 발급받은 keyID
      privateKeyString: process.env.APPLE_PRIVATE_KEY, // Apple에서 발급받은 private key
      callbackURL: process.env.APPLE_REDIRECT_URL,  // 로그인 후 리디렉션될 URL
      scope: ['name', 'email'],                     // 요청할 권한
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: AppleProfile): Promise<any> {
    let user : User = await this.authService.getSocialUserWithSave({socialID: String(profile.id)})
    CoreAssert.isNotEmpty(
      await this.authService.getUser({id: user.getId()}),
      Exception.new({code: Code.UNAUTHORIZED_ERROR, overrideMessage : "User not Found on the Apple Strategy"})
    )

    return {id: user.getId(), role: user.getRole()}
  }
}