import { UserRole } from "@core/common/enum/UserEnums";
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { HttpJwtAuthGuard } from "../guard/HttpJwtAuthGuard";
import { HttpRoleAuthGuard } from "../guard/HttpRoleAuthGuard";


export const HttpAuth  = (...roles : UserRole[]) : (...args: any) => void => {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(HttpJwtAuthGuard, HttpRoleAuthGuard)
    )
}