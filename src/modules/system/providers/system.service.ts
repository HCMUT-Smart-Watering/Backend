import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device, Setting, System, SystemPreset } from '../entities';
import {
  SystemRepository,
  SystemPresetRepository,
  DeviceRepository,
  SettingRepository,
  ReadingRepository,
} from '../repos';
import { Pagination } from 'src/common/types';
import { DeviceType } from '../types';
import { DataSource } from 'typeorm';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: SystemRepository,

    @InjectRepository(SystemPreset)
    private readonly presetRepository: SystemPresetRepository,

    @InjectRepository(Device)
    private readonly deviceRepository: DeviceRepository,

    @InjectRepository(Setting)
    private readonly settingRepository: SettingRepository,

    @InjectRepository(ReadingRepository)
    private readonly readingRepository: ReadingRepository,

    private readonly dataSource: DataSource,
  ) {}
  async getPresets(pagination: Pagination): Promise<SystemPreset[]> {
    return await this.presetRepository.find({
      skip: pagination.skip,
      take: pagination.limit,
    });
  }

  async createSystem(
    user: string,
    preset: string,
    systemInfo: Partial<System>,
  ): Promise<System> {
    const presetData = await this.presetRepository.findOneByOrFail({
      name: preset,
    });
    return this.dataSource.transaction(async (manager) => {
      const system = await manager.getRepository(System).save({
        userId: user,
        ...systemInfo,
      });

      const inpRepo = manager.getRepository(Device);
      const settingRepo = manager.getRepository(Setting);

      const inpsPromises = presetData.inps.map((inp) =>
        inpRepo.save({
          ...inp,
          systemId: system.id,
          type: DeviceType.INP,
        }),
      );
      const outsPromises = presetData.outs.map((out) =>
        inpRepo.save({
          ...out,
          systemId: system.id,
          type: DeviceType.OUT,
        }),
      );
      const settingsPromises = presetData.settings.map((setting) =>
        settingRepo.save({
          ...setting,
          systemId: system.id,
          ...(setting.feedNames[0] && { feedName: setting.feedNames[0] }),
        }),
      );

      await Promise.all([
        ...inpsPromises,
        ...outsPromises,
        ...settingsPromises,
      ]);

      return system;
    });
  }

  async updateSystem(id: string, systemInfo: Partial<System>): Promise<System> {
    const systemData = await this.systemRepository.findOneByOrFail({ id });
    const updatedSystem = this.systemRepository.merge(systemData, systemInfo);
    return updatedSystem;
  }

  async getSystemsOfUser(id: string): Promise<System[]> {
    return await this.systemRepository.findBy({ userId: id });
  }

  async getSystem(id: string): Promise<{
    system: System;
    devices: Device[];
    settings: Setting[];
  }> {
    const foundSystem = await this.systemRepository.findOneByOrFail({ id });
    const foundDevices = await this.deviceRepository.findBy({
      systemId: foundSystem.id,
    });
    const foundSettings = await this.settingRepository.findBy({
      systemId: foundSystem.id,
    });
    return {
      system: foundSystem,
      devices: foundDevices,
      settings: foundSettings,
    };
  }

  // updateSetting(name: string, value: string) {}

  // getReading(device: string, from: Date, to: Date) {}
}
