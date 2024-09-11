import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { Injectable } from '@nestjs/common'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class HttpKakaoStratege extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({	
          clientID: ApiServerConfig.KAKAO_API_KEY,
          clientSecret: '',
          callbackURL: ApiServerConfig.KAKAO_TOKEN_URL,
        });
      }
    
      async validate(	// POST /oauth/token 요청에 대한 응답이 담깁니다.
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void,
      ) {
        console.log('HttpKakaoAuthGuard');
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        try {
          const { _json } = profile;
          const user = {
            id: _json.id,
          };
          done(null, user);
        } catch (error) {
          done(error);
        }
      }

}
