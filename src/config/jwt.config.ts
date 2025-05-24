import { ConfigService } from '@nestjs/config';
import { IEnvVars } from './config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default (configService: ConfigService<IEnvVars>): JwtModuleOptions => {
  const jwt = configService.get('jwt', { infer: true });

  if (!jwt) {
    throw new Error('JWT configuration is not defined');
  }

  return {
    secret: jwt.secret,
    signOptions: {
      expiresIn: jwt.expiresIn,
    },
  };
};
