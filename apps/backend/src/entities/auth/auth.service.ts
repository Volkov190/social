import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  private googleClientId = process.env.GOOGLE_CLIENT_ID;
  private googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  private googleRedirectUrl = process.env.GOOGLE_REDIRECT_URL;
  constructor(private userService: UsersService) {}

  async getAuthUrl() {
    const Oauth2Client = new google.auth.OAuth2(
      this.googleClientId,
      this.googleClientSecret,
      this.googleRedirectUrl,
    );
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    const authorizationUrl = Oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
    });

    return authorizationUrl;
  }

  async authUser(authCode: string) {
    const Oauth2Client = new google.auth.OAuth2(
      this.googleClientId,
      this.googleClientSecret,
      this.googleRedirectUrl,
    );
    const { tokens } = await Oauth2Client.getToken(authCode);

    Oauth2Client.setCredentials({ access_token: tokens.access_token });
    const oauth2 = google.oauth2({
      auth: Oauth2Client,
      version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();
    return this.userService.findByEmail(data.email);
  }
}
