import { NestApplication } from "@nestjs/core";

export class ServerApplication {
    private readonly host : string = ApiServerConfig.HOST;
    private readonly port : number = ApiServerConfig.PORT;

    public async run() : Promise<void> {
        const app : NestExpressApplication = await NestFactory.create<NestApplication>(RootModule)
        this.buildAPIDocumentation(app)
        this.logs()
        await app.listen(this.port)
    }
    private log() : void {
        Logger.log(`Server running on host : ${this.host}, port : ${this.port}`, ServerApplication.name)
    }
    
    private buildAPIDocumentation(app: NestExpressApplication) : void{
        const title : string = "Nestjs-DDD-Templates";
        const description : string = "Nestjs-DDD-Templates API Documentation";
        const version : string = "1.0.0";

        const options : Omit<OpenAPIObjec, 'paths'>  = new DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .addBearerAuth({
            type: 'apikey',
            in: 'header',
            name: ApiServerConfig.ACCESS_TOKEN_HEADER
        })

        const document : OpenAPIObject = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('docs', app, document);
    }
    public static new() : ServerApplication {
        return new ServerApplication();
    }
}
