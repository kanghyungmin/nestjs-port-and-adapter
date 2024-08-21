import { ApiServerConfig } from "@infrastructure/config/ApiServerConfig";
import { Logger } from "@nestjs/common";
import { NestApplication, NestFactory } from "@nestjs/core";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { RootModule } from './di/RootModule'

export class ServerApplication {
    private readonly host : string = ApiServerConfig.HOST;
    private readonly port : number = ApiServerConfig.PORT;

    public async run() : Promise<void> {
        const app : NestApplication = await NestFactory.create<NestApplication>(RootModule)
        this.buildAPIDocumentation(app)
        this.logs()
        await app.listen(this.port)
    }
    private logs() : void {
        Logger.log(`Server running on host : ${this.host}, port : ${this.port}`, ServerApplication.name)
    }
    
    private buildAPIDocumentation(app: NestApplication) : void{
        const title : string = "Nestjs-DDD-Templates";
        const description : string = "Nestjs-DDD-Templates API Documentation";
        const version : string = "1.0.0";

        const options : Omit<OpenAPIObject, 'paths'>  = new DocumentBuilder()
        .setVersion('3.0.0') // Add the version property
        .setTitle(title) // Set the title
        .setDescription(description) // Set the description
        .setVersion(version) // Set the version
        .addBearerAuth({
            type: 'apiKey',
            in: 'header',
            name: ApiServerConfig.ACCESS_TOKEN_HEADER
        }).build()

        const document : OpenAPIObject = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('docs', app, document);
    }
    public static new() : ServerApplication {
        return new ServerApplication();
    }
}
