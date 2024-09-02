
import { Nullable, Optional } from "@core/common/type/CommonType";

export class CoreAssert {
    public static isDefined<T>(value : T, exception: Error) : void {
        if (value === undefined || value === null) {
            throw exception;
        }
    }
    public static isString(value : any, exception: Error) : void {
        if (typeof value !== 'string') {
            throw exception;
        }
    }
    public static isNumber(value : any, exception: Error) : void {
        if (typeof value !== 'number') {
            throw exception;
        }
    }
    public static isBoolean(value : any, exception: Error) : void {
        if (typeof value !== 'boolean') {
            throw exception;

        }
    }
    public static isArray(value : any, exception: Error) : void {
        if (!Array.isArray(value)) {
            throw exception;

        }
    }
    public static isObject(value : any, exception: Error) : void {
        if (typeof value !== 'object') {
            throw exception;

        }
    }
    public static isFunction(value : any, exception: Error) : void {
        if (typeof value !== 'function') {
            throw exception;

        }
    }
    public static isInstanceOf(value : any, clazz : any, exception: Error) : void {
        if (!(value instanceof clazz)) {
            throw exception;

        }
    }
    public static isTrue(value : boolean, exception: Error) : void {
        if (value !== true) {
            throw exception;

        }
    }
    public static isFalse(value : boolean, exception: Error) : void {
        if (value !== false) {
            throw exception;

        }
    }
    public static isNotEmpty<T>(value : Optional<Nullable<T>>, exception: Error) : T {
        if (value === undefined || value === null || value === '') {
            throw exception;
        }
        return value
    }
}

