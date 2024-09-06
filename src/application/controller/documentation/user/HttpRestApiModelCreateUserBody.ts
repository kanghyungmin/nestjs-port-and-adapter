
import { UserRole } from '@core/common/enum/UserEnums';
import { ApiProperty } from '@nestjs/swagger'

export class HttpRestApiModelCreateUserBody {
  
  @ApiProperty({type: 'string'})
  public firstName: string;
  
  @ApiProperty({type: 'string'})
  public lastName: string;
  
  @ApiProperty({type: 'string'})
  public email: string;
  
  @ApiProperty({type: 'string'})
  public password: string;

  @ApiProperty({type: 'string'})
  public role: UserRole;
  
}
