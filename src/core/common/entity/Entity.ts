import { Code } from "@core/common/code/Code";
import { Nullable, Optional } from "@core/common/type/CommonType";
import { Exception } from "@core/exception/Exception";
import { ClassValidationDetails, ClassValidator } from "@core/common/util/class-validator/ClassValidator";




export class Entity<T extends string | number> {
    protected id : Optional<T>;

    public getId() : T {
        if(!this.id) {
            throw Exception.new({
                code : Code.ENTITY_VALIDATION_ERROR,
                overrideMessage : `${this.constructor.name} id is not defined`
            })
        }

        return this.id;

    }

    public async validate() : Promise<void> {
        const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
        if(details) {
            throw Exception.new({
                code : Code.ENTITY_VALIDATION_ERROR,
                data : details
            })
        }
    }
}