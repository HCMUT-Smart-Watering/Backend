import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard';
import { LoginDto } from '../dto/login.dto';
import { ResponseEntity } from 'src/common/types';
import { AuthResponseDto } from '../dto';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth/jwt-refresh-auth.guard';
import { Request } from 'express';
import { Payload } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Body() user: LoginDto,
  ): Promise<ResponseEntity<AuthResponseDto>> {
    const tokens = await this.authService.login(user.username, user.password);
    return { success: true, data: tokens };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Req() req: Request) {
    const tokens = await this.authService.refreshToken({
      sub: req.user as { id: string; email: string },
    });
    return { success: true, data: tokens };
  }
}
