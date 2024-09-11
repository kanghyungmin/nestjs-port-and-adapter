import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class HttpKakaoAuthGuard extends AuthGuard('kakao') {}
