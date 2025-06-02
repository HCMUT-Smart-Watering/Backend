import { Expose, Type } from 'class-transformer';
import { SystemResponseDto } from './system.response.dto';

export class DeviceInfoDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  feedNames: string[];
}

export class SettingDto {
  @Expose()
  name: string;

  @Expose()
  feedName: string;

  @Expose()
  value: string;
}

export class SystemDetailedResponseDto extends SystemResponseDto {
  @Expose()
  @Type(() => DeviceInfoDto)
  inps: DeviceInfoDto[];

  @Expose()
  @Type(() => DeviceInfoDto)
  outs: DeviceInfoDto[];

  @Expose()
  @Type(() => SettingDto)
  settings: SettingDto[];
}
