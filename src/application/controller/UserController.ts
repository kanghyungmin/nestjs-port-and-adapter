import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { UserDITokens } from "@core/domain/user/di/UserDITokens";
import { CreateUserUseCase } from "@core/domain/user/usecase/CreateUserUseCase";
import { UserUseCaseDto } from "@core/domain/user/usecase/dto/UserUseCaseDto";
import { CreateUserAdapter } from "@infrastructure/adapter/usecase/CreateUserAdapter";
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpRestApiModelCreateUserBody } from "@application/controller/documentation/user/HttpRestApiModelCreateUserBody";
import { HttpRestApiResponseUser } from "@application/controller/documentation/user/HttpRestApiResponseUser";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        @Inject(UserDITokens.CreateUserUseCase)
        private readonly createUserUseCase: CreateUserUseCase
    ) {
        
    }
    @Post('account')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: HttpRestApiModelCreateUserBody })
    @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
    public async createAccount(@Body() body: HttpRestApiModelCreateUserBody): Promise<CoreApiResponse<UserUseCaseDto>> {
      const adapter: CreateUserAdapter = await CreateUserAdapter.new({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
      })
  
      const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(adapter)
  
      return CoreApiResponse.success(createdUser)
    }

}