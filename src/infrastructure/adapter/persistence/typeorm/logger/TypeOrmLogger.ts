import { Logger as NestLogger } from '@nestjs/common';
import { Logger, QueryRunner } from 'typeorm';

export class TypeOrmLogger implements Logger{
    public log(level : 'log' | 'info' | 'warn', message : string) : void {
        NestLogger.log(message, TypeOrmLogger.name)
    }

    public logMigration(message: string):void {
        NestLogger.log(message, TypeOrmLogger.name)
    }

    public logQuery(query: string, parameters? : any[]) : void {
        let message : string = `Query: ${query} `
        if(parameters) {
            message += `Parameters: ${JSON.stringify(parameters)}`
        }
        NestLogger.log(message, TypeOrmLogger.name)
    }

    public logQueryError(error: string , query: string, parameters?: any[]) : void {
        let message : string = `Query: ${query} `
        if(parameters) {
            message += `Parameters: ${JSON.stringify(parameters)}`
        }       
        NestLogger.error(message, error, TypeOrmLogger.name)
    }

    public logQuerySlow(time : number , query: string, parameters?: any[]) : void {
        let message : string = `Query: ${query} Time: ${time}`
        if(parameters) {
            message += `Parameters: ${JSON.stringify(parameters)}`
        }       
        NestLogger.warn(message, TypeOrmLogger.name)

    }
    public logSchemaBuild(message: string) : void {
        NestLogger.log(message, TypeOrmLogger.name)
    }
    public static new() : TypeOrmLogger {
        return new TypeOrmLogger()
    }   

    

}