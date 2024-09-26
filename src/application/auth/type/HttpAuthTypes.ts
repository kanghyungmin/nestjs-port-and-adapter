import { UserRole } from '@core/common/enum/UserEnums';
import { Request } from 'express'

export type HttpUserPayload = {
  id: string,
  email: string,
  role : UserRole
};

export type HttpKakaoUserPayload = Omit<HttpUserPayload, 'email'>
export type HttpAppleUserPayload = Omit<HttpUserPayload, 'email'> //향후, 달라질 수 있음
export type HttpRequestWithUser = Request & {user: HttpUserPayload};
export type HttpRequestWithKaKaoUser = Request & {user: HttpKakaoUserPayload};
export type HttpRequestWithAppleUser = Request & {user: HttpAppleUserPayload};

export type HttpJwtPayload = {
  id: string,
};

export type HttpLoggedInUser = {
  id: string,
  accessToken: string,
};
