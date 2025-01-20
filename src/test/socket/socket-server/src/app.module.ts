import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ChatGateway } from './events/chat.gateway';
import { RedisModule } from './redis.module';
import { NotificationsGateway } from './events/notification.gateway';
import { GlobalListener } from './listeners/global.listener';
import { ChatEventsListener } from './listeners/chat.events.listener';
import { DataService } from './app.service';
import { DataGateway } from './events/data.gateway';

@Module({
  imports: [RedisModule],
  providers: [
    // AppGateway,
    // ChatGateway,
    // NotificationsGateway, 
    GlobalListener, 
    ChatEventsListener,
    DataService,
    DataGateway,
  ],
})
export class AppModule {}
