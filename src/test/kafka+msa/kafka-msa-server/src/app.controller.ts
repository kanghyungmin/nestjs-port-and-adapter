import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { time } from 'console';
import { from, Observable } from 'rxjs';

@Controller()
export class AppController {
  @MessagePattern('sum')
  handleGetData(payload: number[]): Observable<number> {
    console.log('Received message:', payload);
    console.log(new Date());
    const result = (payload || []).reduce((a, b) => a + b);
    console.log('Processed message:', result);
    console.log(new Date());
    return from([1,2,3]);
  }

  @EventPattern('new_event')
  handleNewEvent(payload: any) {
    console.log('Event received:', payload);
  }
}