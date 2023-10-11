import { Module } from '@nestjs/common';
import { createClient } from 'redis';

@Module({
  providers: [
    {
      provide: 'REDIS',
      useValue: createClient().connect(),
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
