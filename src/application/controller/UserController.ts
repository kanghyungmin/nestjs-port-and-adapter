import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { UserDITokens } from "@core/domain/user/di/UserDITokens";
import { CreateUserUseCase } from "@core/domain/user/usecase/CreateUserUseCase";
import { UserUseCaseDto } from "@core/domain/user/usecase/dto/UserUseCaseDto";
import { CreateUserAdapter } from "@infrastructure/adapter/usecase/CreateUserAdapter";
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query } from "@nestjs/common";
import { ApiBody,  ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpRestApiModelCreateUserBody } from "@application/controller/documentation/user/HttpRestApiModelCreateUserBody";
import { HttpRestApiResponseUser } from "@application/controller/documentation/user/HttpRestApiResponseUser";
import { HttpRestApiModelFindUserQuery } from "./documentation/user/HttpRestApiModelFindUserQuery";
import { FindUserAdapter } from "@infrastructure/adapter/usecase/FindUserAdapter";
import { Optional } from "@core/common/type/CommonType";
import { FindUserService } from "@core/service/user/FindUserService";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        @Inject(UserDITokens.CreateUserUseCase)
        private readonly createUserUseCase: CreateUserUseCase,
        @Inject(UserDITokens.FindUserUseCase)
        private readonly findUserUseCase: FindUserService
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
    @Get('account')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser})
    public async findAccound(@Query() query : HttpRestApiModelFindUserQuery) : Promise<CoreApiResponse<Optional<UserUseCaseDto>>>  {
      const adapter : FindUserAdapter = await FindUserAdapter.new({
        id : query.id
      })
      const findedUser : Optional<UserUseCaseDto> = await this.findUserUseCase.execute(adapter)
      return CoreApiResponse.success(findedUser)

    }

}