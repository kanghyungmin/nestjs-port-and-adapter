import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { Code } from "@core/common/code/Code";
import { Exception } from "@core/exception/Exception";
import { ApiServerConfig } from "@infrastructure/config/ApiServerConfig";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";




@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
    public catch(error : Error, host: ArgumentsHost) : void {
        const request : Request = host.switchToHttp().getRequest()
        const response : Response = host.switchToHttp().getResponse()

        let errorResponse : CoreApiResponse<unknown> = CoreApiResponse.error(Code.INTERNAL_ERROR.code, error.message)

        //Nest
        errorResponse = this.handleNestError(error, errorResponse)
        //App
        errorResponse = this.handleCoreException(error, errorResponse)

        if (ApiServerConfig.LOG_ENABLE) {
            const message: string =
              `Method: ${request.method}; ` +
              `Path: ${request.path}; `+
              `Error: ${errorResponse.message}`
        
            Logger.error(message)
          }
          
        response.json(errorResponse)
    }
private handleNestError(error: Error, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(error.getStatus(), error.message, null)
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(Code.UNAUTHORIZED_ERROR.code, Code.UNAUTHORIZED_ERROR.message, null)
    }
    
    return errorResponse
  }
  
  // 내부 Exception 처리용
  private handleCoreException(error: Error, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(error.code, error.message, error.data)
    }
    
    return errorResponse
  }

}
