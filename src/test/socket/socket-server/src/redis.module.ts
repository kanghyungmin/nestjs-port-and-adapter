import { IoAdapter } from '@nestjs/platform-socket.io';
import {  createAdapter } from 'socket.io-redis';
import { Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';

@Module({})
export class RedisModule {
  static registerIoAdapter(httpServer: any): IoAdapter {
    const redisOptions: RedisClientOptions = {
      url: 'redis://localhost:6379',
    };

    const ioAdapter = new IoAdapter(httpServer);
    ioAdapter.createIOServer = (port, options) => {
      const server = require('socket.io')(port, options);
      const redisAdapter = createAdapter(redisOptions.url);
      server.adapter(redisAdapter);
      return server;
    };

    return ioAdapter;
  }
}
