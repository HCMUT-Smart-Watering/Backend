import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/providers/user.service';
import { JwtModule } from '@nestjs/jwt';
import JWTConfig from '../../config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshStrategy, LocalStrategy } from './strategies';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: JWTConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
