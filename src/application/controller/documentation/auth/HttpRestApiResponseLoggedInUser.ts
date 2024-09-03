
import { ApiProperty } from '@nestjs/swagger'

import { HttpRestApiResponse } from '@application/controller/documentation/common/HttpRestApiResponse'
import { HttpRestApiModelLoggedInUser } from '@application/controller/documentation/auth/HttpRestApiModelLoggedInUser'

export class HttpRestApiResponseLoggedInUser extends HttpRestApiResponse {
  
  @ApiProperty({type: HttpRestApiModelLoggedInUser})
  public data: HttpRestApiResponseLoggedInUser;
  
}
