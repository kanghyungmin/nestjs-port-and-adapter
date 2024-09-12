import { HttpLocalAuthGuard } from '@application/auth/guard/HttpLocalAuthGuard'
import { HttpAuthService } from '@application/auth/HttpAuthService'
import { HttpLoggedInUser, HttpRequestWithKaKaoUser, HttpRequestWithUser, HttpUserPayload } from '@application/auth/type/HttpAuthTypes'
import { CoreApiResponse } from '@core/common/api/CoreApiResponse'
import { Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { HttpRestApiModelLogInBody } from '@application/controller/documentation/auth/HttpRestApiModelLogInBody'
import { HttpRestApiResponseLoggedInUser } from '@application/controller/documentation/auth/HttpRestApiResponseLoggedInUser'
import { HttpKakaoAuthGuard } from '@application/auth/guard/HttpKakaoAuthGuard'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  
  constructor(private readonly authService: HttpAuthService) {}
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(HttpLocalAuthGuard)
  @ApiBody({type: HttpRestApiModelLogInBody})
  @ApiResponse({status: HttpStatus.OK, type: HttpRestApiResponseLoggedInUser})
  public async login(@Req() request: HttpRequestWithUser): Promise<CoreApiResponse<HttpLoggedInUser>> {
    return CoreApiResponse.success(this.authService.login(request.user))
  }

  //인증 페이지 요청 후, redirect -> token 발급₩
  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(HttpKakaoAuthGuard) 
  @ApiResponse({status: HttpStatus.OK, type: HttpRestApiResponseLoggedInUser})
  public async kakaoLogin(@Req() request : HttpRequestWithKaKaoUser) : Promise<CoreApiResponse<HttpLoggedInUser>> {
    return CoreApiResponse.success(this.authService.login(request.user))
  }
}