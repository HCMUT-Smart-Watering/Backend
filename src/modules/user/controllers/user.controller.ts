import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from '../providers/user.service';
import {
  UserCreateDto,
  UserUpdateDto,
  UserFindDto,
  UserResponseDto,
} from '../dto';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities';
import { ResponseEntity } from 'src/common/types';
import { PaginationDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: UserCreateDto,
  ): Promise<ResponseEntity<UserResponseDto>> {
    const user = plainToInstance(User, body);
    const createdUser = await this.userService.create(user);
    const data = plainToInstance(UserResponseDto, createdUser, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async find(
    @Query() query: UserFindDto,
    @Query() pagination: PaginationDto,
  ): Promise<ResponseEntity<UserResponseDto[]>> {
    const users = await this.userService.findAll(
      plainToInstance(User, query),
      plainToInstance(PaginationDto, pagination),
    );
    const data = users.map((user) =>
      plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
    return {
      success: true,
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: Request) {
    const user = await this.userService.findOne({
      id: (req?.user as { id: string })?.id,
    });
    const data = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseEntity<UserResponseDto>> {
    const user = await this.userService.findOne({ id });
    const data = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ): Promise<ResponseEntity<UserResponseDto>> {
    const user = plainToInstance(User, body);
    user.id = id;
    const updatedUser = await this.userService.update(user);
    const data = plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
  ): Promise<ResponseEntity<UserResponseDto>> {
    const deletedUser = await this.userService.remove(id);
    const data = plainToInstance(UserResponseDto, deletedUser, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }
}
