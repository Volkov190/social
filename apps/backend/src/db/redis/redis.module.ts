import { Module } from '@nestjs/common';
import { createClient } from 'redis';

@Module({
  providers: [
    {
      provide: 'REDIS',
      useValue: createClient({
        url: 'redis://redis:6379',
      }).connect(),
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
