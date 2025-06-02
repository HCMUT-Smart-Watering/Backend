import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto';
import { SystemService } from '../providers/system.service';
import { ResponseEntity } from 'src/common/types';
import {
  DeviceInfoDto,
  PresetResponseDto,
  SystemCreateDto,
  SystemDetailedResponseDto,
  SystemResponseDto,
  SystemUpdateDto,
} from '../dto';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { System } from '../entities';
import { DeviceType } from '../types';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('presets')
  @HttpCode(HttpStatus.OK)
  async getPresets(
    @Query() pagination: PaginationDto,
  ): Promise<ResponseEntity<PresetResponseDto[]>> {
    const presets = await this.systemService.getPresets(pagination);
    const data = plainToInstance(PresetResponseDto, presets, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createSystem(
    @Req() req: Request,
    @Body() body: SystemCreateDto,
  ): Promise<ResponseEntity<SystemResponseDto>> {
    const userId = (req?.user as { id: string })?.id;
    const system = plainToInstance(System, body);
    const createdSystem = await this.systemService.createSystem(
      userId,
      body.preset,
      system,
    );
    const data = plainToInstance(SystemResponseDto, createdSystem, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSystem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: SystemUpdateDto,
  ): Promise<ResponseEntity<SystemResponseDto>> {
    const system = plainToInstance(System, body);
    const updatedSystem = await this.systemService.updateSystem(id, system);
    const data = plainToInstance(SystemResponseDto, updatedSystem, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getOwnSystems(
    @Req() req: Request,
  ): Promise<ResponseEntity<SystemResponseDto[]>> {
    const userId = (req?.user as { id: string })?.id;
    const systems = await this.systemService.getSystemsOfUser(userId);
    const data = plainToInstance(SystemResponseDto, systems, {
      excludeExtraneousValues: true,
    });
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSystem(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseEntity<SystemDetailedResponseDto>> {
    const foundSystem = await this.systemService.getSystem(id);
    const inps: DeviceInfoDto[] = [];
    const outs: DeviceInfoDto[] = [];
    foundSystem.devices.forEach((device) =>
      device.type == DeviceType.INP ? inps.push(device) : outs.push(device),
    );
    const data = plainToInstance(
      SystemDetailedResponseDto,
      {
        inps,
        outs,
        ...foundSystem.system,
        ...foundSystem,
      },
      { excludeExtraneousValues: true },
    );
    console.log(foundSystem);
    console.log(data);
    return {
      success: true,
      data,
    };
  }
}
