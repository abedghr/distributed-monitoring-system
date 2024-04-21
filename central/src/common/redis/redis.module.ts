import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { RedisHandlers } from './handlers/redis.handler';

@Module({
  providers: [RedisService, RedisHandlers],
  exports: [RedisService],
})
export class RedisModule {}