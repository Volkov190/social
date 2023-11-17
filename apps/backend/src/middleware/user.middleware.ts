import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RedisClientType } from 'redis';
import { UsersService } from 'src/entities/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService,
    @Inject('REDIS') private redis: RedisClientType,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.secret === process.env.secret) {
      await next();
      return;
    }
    const uuid = req.cookies['session'] as string | undefined;
    if (!uuid) throw new UnauthorizedException();
    const userString = await this.redis.get(uuid);

    const user = JSON.parse(userString);
    if (!user) throw new UnauthorizedException();
    req['user'] = user;

    await next();
  }
}
