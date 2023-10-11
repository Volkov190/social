import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-github2';
import { RedisClientType } from 'redis';
import { UsersService } from 'src/entities/user/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github2') {
  constructor(
    private userService: UsersService,
    @Inject('REDIS') private redis: RedisClientType,
  ) {
    const strategyOptions: StrategyOptions = {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    };
    super(strategyOptions);
  }

  async validate(_accessToken, _refreshToken, profile: Profile) {
    const profileEmail = profile.emails?.[0].value;
    if (!profileEmail) throw new UnauthorizedException();
    const user = await this.userService.findByEmail(profileEmail);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
