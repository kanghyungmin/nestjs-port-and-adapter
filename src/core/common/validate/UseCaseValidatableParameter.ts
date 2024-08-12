import { Optional } from "@core/common/type/CommonType";

import { Exception } from "@core/exception/Exception";

import { ClassValidationDetails, ClassValidator } from "@core/common/util/class-validator/ClassValidator";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Code } from "@core/common/code/Code";


export class UseCaseValidatableParameter {
    public async validate() : Promise<void> {
        const details : Optional<ClassValidationDetails> = await ClassValidator.validate(this);
        if(details) {
            throw Exception.new({
                code : Code.USECASE_PARAMETER_VALIDATION_ERROR, data : details
            })
        }
    }

}