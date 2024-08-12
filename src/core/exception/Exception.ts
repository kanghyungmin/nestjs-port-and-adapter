import { CodeDescription } from "@core/common/code/Code";
import { Nullable, Optional } from "@core/common/type/CommonType";

type CreateExceptionPayload<TData>  = {
    code : CodeDescription,
    overrideMessage? : Nullable<string>,
    data? : Optional<TData>
}


export class Exception<TData> extends Error {
    public readonly code : number;
    public readonly data : Optional<TData>;

    constructor(codeDescription : CodeDescription, overrideMessage? : Optional<string>, data? : Optional<TData>) {
        super();

        
        this.name = this.constructor.name;
        this.code = codeDescription.code;
        this.data = data;
        this.message = overrideMessage || codeDescription.message;
        
        Error.captureStackTrace(this, this.constructor)
    }
    public static new<TData>(payload : CreateExceptionPayload<TData>) : Exception<TData> {
        return new Exception<TData>(payload.code, payload.overrideMessage, payload.data);
    }
}