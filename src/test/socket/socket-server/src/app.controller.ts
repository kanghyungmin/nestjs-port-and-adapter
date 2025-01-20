import { Controller, Get } from '@nestjs/common';
import { DataService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: DataService,
  ) {}

  @Get()
  getHello(): string {
    this.appService.updateData();
    return 'Hello World!';
  }
}
