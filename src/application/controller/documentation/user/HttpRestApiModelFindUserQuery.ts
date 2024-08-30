import { ApiProperty } from '@nestjs/swagger'

export class HttpRestApiModelFindUserQuery {
  
  @ApiProperty({type: 'string'})
  public id: string;
  
  
}
