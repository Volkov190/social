import {
  Controller,
  Get,
  Inject,
  Post,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { RedisClientType } from 'redis';
import { v4 } from 'uuid';
import { UsersService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    @Inject('REDIS') private redis: RedisClientType,
  ) {}

  @Post()
  async auth() {
    return this.authService.getAuthUrl();
  }

  @Get('/github')
  @UseGuards(AuthGuard('github2'))
  async githubAuth() {}

  @Get('/github-callback')
  @Redirect(`${process.env.FRONTEND_URL}/login`, 302)
  @UseGuards(AuthGuard('github2'))
  async githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    const uuid = v4();
    this.redis.set(uuid, JSON.stringify(user));
    res.cookie('session', uuid, { httpOnly: true });
    return {
      url: `${process.env.FRONTEND_URL}/login`,
    };
  }

  @Get('/google-callback')
  @Redirect(`${process.env.FRONTEND_URL}/login`, 302)
  async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.authUser(req.query.code as string);
    const uuid = v4();

    this.redis.set(uuid, JSON.stringify(user));
    res.cookie('session', uuid, { httpOnly: true });

    return {
      url: `${process.env.FRONTEND_URL}/login`,
    };
  }

  @Get('/remember-me')
  async rememberMe(@Req() req: Request) {
    const uuid = req.cookies['session'] as string | undefined;
    if (!uuid) throw new UnauthorizedException();

    const userString = await this.redis.get(uuid);

    const user = JSON.parse(userString);
    if (!user) {
      throw new UnauthorizedException('Информация о сессии не найдена');
    }
    return user;
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('session');
  }

  @Post('/test-auth')
  async testAuth(@Res({ passthrough: true }) res: Response) {
    const uuid = v4();
    const user = await this.userService.find(3);
    this.redis.set(uuid, JSON.stringify(user));
    res.cookie('session', uuid, { httpOnly: true });

    return { user };
  }
}
