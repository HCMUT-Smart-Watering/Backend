import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/providers/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Payload, Tokens } from '../types';
import { ConfigService } from '@nestjs/config';
import { IEnvVars } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<IEnvVars>,
  ) {}

  async validateUser(username: string, password: string): Promise<Payload> {
    const user = await this.userService.findOne({ username });
    if (await argon2.verify(user.password, password)) {
      return {
        username: user.username,
        sub: {
          email: user.email,
          id: user.id,
        },
      };
    } else throw new UnauthorizedException('Wrong password');
  }

  async login(username: string, pass: string): Promise<Tokens> {
    const payload: Payload = await this.validateUser(username, pass);
    const jwtConfig = this.configService.get('jwt', { infer: true })!;
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: jwtConfig.refreshSecret,
        expiresIn: jwtConfig.refreshExpiresIn,
      }),
    };
  }

  async refreshToken(payload: Payload): Promise<Tokens> {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
