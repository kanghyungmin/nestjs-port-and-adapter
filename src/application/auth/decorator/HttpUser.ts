
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { HttpRequestWithUser } from '@application/auth/type/HttpAuthTypes'

export const HttpUser: () => any = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: HttpRequestWithUser = ctx.switchToHttp().getRequest()
  return request.user
})

