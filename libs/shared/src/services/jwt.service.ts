import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as Jwt } from '@nestjs/jwt';
import { EToken } from '../enums';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: Jwt,
    private readonly configService: ConfigService,
  ) {}

  public verifyToken(token: string, key: string) {
    return this.jwtService.verify(token, { publicKey: key });
  }

  public async sign<P extends Record<string, unknown> | Buffer>(
    payload: P,
    type: EToken = EToken.AccessToken,
  ): Promise<string> {
    try {
      let token: string;
      switch (type) {
        case EToken.AccessToken:
          token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
            secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          });

          break;
        case EToken.RefreshToken:
          token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
            secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          });
          break;
      }
      return token;
    } catch (err) {
      throw err;
    }
  }
}
