import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";




export class NestHttpLoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<CoreApiResponse<void>> {
        const request = context.switchToHttp().getRequest();
        const requestStarteDate : number = Date.now();

        return next.handle().pipe(tap((): void => {
            const requestFinishDate: number = Date.now()
            
            const message: string =
              `Method: ${request.method}; ` +
              `Path: ${request.path}; ` +
              `SpentTime: ${requestFinishDate - requestStarteDate}ms`
            
               Logger.log(message, NestHttpLoggingInterceptor.name)
          }))

        
    }
}