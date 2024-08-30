
import { ApiProperty } from '@nestjs/swagger'
import { HttpRestApiModelUser } from '@application/controller/documentation/user/HttpRestApiModelUser';
import { HttpRestApiResponse } from '@application/controller/documentation/common/HttpRestApiResponse';
import { Optional } from '@core/common/type/CommonType';

export class HttpRestApiResponseUser extends HttpRestApiResponse {
  @ApiProperty({type: HttpRestApiModelUser})
  public data: Optional<HttpRestApiModelUser>;
}
