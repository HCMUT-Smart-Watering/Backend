import { Module } from '@nestjs/common';
import { SystemService } from './providers/system.service';
import { SystemController } from './controllers/system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device, Reading, Setting, System, SystemPreset } from './entities';
import {
  DeviceRepository,
  ReadingRepository,
  SettingRepository,
  SystemPresetRepository,
  SystemRepository,
} from './repos';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device, SystemPreset, Reading, Setting, System]),
  ],
  controllers: [SystemController],
  providers: [
    SystemService,
    DeviceRepository,
    SystemPresetRepository,
    ReadingRepository,
    SettingRepository,
    SystemRepository,
  ],
  exports: [SystemService, TypeOrmModule],
})
export class SystemModule {}
