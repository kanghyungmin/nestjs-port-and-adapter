import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { time } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/send-message')
  sendMessage() {
    console.log(time());  
    const result =  this.appService.sendMessage();
    console.log(new Date(), result);
    return result 
  }

  @Get('/emit-event')
  emitEvent() {
    this.appService.emitEvent();
    return 'Event emitted';
  }
}