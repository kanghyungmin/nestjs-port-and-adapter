import { UserRole } from '@core/common/enum/UserEnums';
import { Request } from 'express'

export type HttpUserPayload = {
  id: string,
  email: string,
  role : UserRole
};

export type HttpKakaoUserPayload = Omit<HttpUserPayload, 'email'>
export type HttpRequestWithUser = Request & {user: HttpUserPayload};
export type HttpRequestWithKaKaoUser = Request & {user: HttpKakaoUserPayload};

export type HttpJwtPayload = {
  id: string,
};

export type HttpLoggedInUser = {
  id: string,
  accessToken: string,
};
