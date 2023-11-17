import { Module } from '@nestjs/common';
import { RedisModule } from 'src/db/redis/redis.module';
import { GithubStrategy } from 'src/strategies/github.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy],
  imports: [UserModule, RedisModule],
})
export class AuthModule {}
